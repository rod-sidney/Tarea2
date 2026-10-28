# Depuración y optimización

## 1. Objetivo

En esta fase se revisó el funcionamiento de Estantería Común mediante las herramientas de desarrollo de Google Chrome. Se analizaron las solicitudes de red, el tamaño de los recursos cargados, un problema al obtener portadas de libros desde un servicio externo y el manejo de errores del formulario de propuestas mediante puntos de interrupción (*breakpoints*).

El objetivo es identificar posibles problemas, recopilar evidencia de las pruebas y aplicar una optimización cuyo resultado pueda comprobarse mediante mediciones.

## 2. Análisis inicial de Network

Se utilizó la pestaña **Network** de Chrome DevTools para observar los recursos que carga la aplicación. Se activó la opción `Disable cache` y se realizó una búsqueda de *Crónica de una muerte anunciada*, que devolvió 12 resultados.

En la primera inspección, sin aplicar un filtro para excluir las extensiones del navegador, se observaron estos datos:

| Métrica | Resultado |
|---|---:|
| Solicitudes | 37 |
| Datos transferidos | 1,5 MB |
| Tamaño de recursos | 1,4 MB |
| Finish | 13,24 s |
| DOMContentLoaded | 208 ms |
| Load | 225 ms |

En esa inspección aparecieron recursos como `AdobeClean-Bold.otf`, `AdobeClean-Regular.otf`, `otherVendors.js` y `vendor.js`, provenientes de una extensión de Chrome. Por ese motivo, no debían atribuirse directamente a la aplicación.

**Evidencia:** `docs/capturas/Evidencia1.png`.

Para distinguir los recursos de la aplicación de los generados por extensiones, se utilizó el filtro `-scheme:chrome-extension` en Network. De esta forma se pudo comparar el tamaño de los recursos propios de la aplicación antes y después de la optimización.

## 3. Medición antes de la optimización

Con el filtro de extensiones aplicado y la caché desactivada, se registraron los siguientes datos antes de modificar la compilación de Sass:

| Métrica | Resultado inicial |
|---|---:|
| Solicitudes visibles / totales | 23 / 37 |
| Datos transferidos visibles / totales | 435 kB / 1.454 kB |
| Tamaño de recursos visibles / totales | 431 kB / 1.450 kB |
| Finish | 13,62 s |
| DOMContentLoaded | 239 ms |
| Load | 302 ms |
| Tamaño de `estilos.css` | 219 kB |

Los valores visibles corresponden a las solicitudes que coinciden con el filtro aplicado; los valores totales incluyen también las solicitudes excluidas por ese filtro.

Al ordenar los recursos por tamaño, se identificó `estilos.css` como el principal candidato para la optimización entre los archivos propios de la aplicación.

**Evidencia:** `docs/capturas/Evidencia2.png`.

## 4. Optimización aplicada a Sass

La optimización consistió en cambiar el formato de salida de Sass para generar el CSS comprimido.

En `package.json` se modificó la opción de compilación de `--style=expanded` a `--style=compressed`, conservando las demás opciones del comando.

Después se ejecutó el siguiente comando desde la raíz del proyecto:

```bash
npm run sass:build
```

La compilación generó nuevamente el archivo `css/estilos.css`, esta vez en formato comprimido. No se eliminaron deliberadamente componentes de Bootstrap ni funcionalidades de la aplicación.

### Comparación del tamaño del CSS

| Medición | Antes | Después |
|---|---:|---:|
| Archivo | `estilos.css` | `estilos.css` |
| Formato de salida | `expanded` | `compressed` |
| Tamaño observado | 219 kB | 182 kB |

La reducción observada fue de aproximadamente 37 kB, equivalente a un **16,9 %** del tamaño inicial del archivo.

Cálculo:

\[
\frac{219-182}{219}\times100\approx16,9\%
\]

Esta medición demuestra que la compresión redujo el tamaño del CSS generado por Sass.

## 5. Medición después de la optimización

Después de recompilar Sass, se repitió la prueba con la caché desactivada, el mismo filtro de extensiones y la misma búsqueda de libros.

Los resultados fueron los siguientes:

| Métrica | Antes | Después |
|---|---:|---:|
| Tamaño de `estilos.css` | 219 kB | 182 kB |
| Solicitudes visibles / totales | 23 / 37 | 23 / 37 |
| Datos transferidos visibles / totales | 435 kB / 1.454 kB | 398 kB / 1.417 kB |
| Tamaño de recursos visibles / totales | 431 kB / 1.450 kB | 394 kB / 1.413 kB |
| Finish | 13,62 s | 17,10 s |
| DOMContentLoaded | 239 ms | 213 ms |
| Load | 302 ms | 231 ms |

**Evidencia:** `docs/capturas/Evidencia3.png`.

Los datos muestran una reducción de 37 kB tanto en el tamaño observado de `estilos.css` como en los totales de transferencia y recursos de las mediciones filtradas. Sin embargo, los tiempos de carga variaron: `Finish` aumentó de 13,62 a 17,10 segundos.

Por lo tanto, no se concluye que todos los aspectos del rendimiento hayan mejorado. El resultado que se puede comprobar directamente es la reducción del tamaño del CSS. Las diferencias de tiempo pueden depender de las solicitudes externas y de las condiciones de cada prueba.

## 6. Incidencia al cargar portadas externas

Durante las pruebas se detectó que algunas portadas no se podían cargar desde el servicio de imágenes de Open Library.

Al inspeccionar una solicitud fallida en Network se observaron los siguientes datos:

- **Recurso solicitado:** `https://covers.openlibrary.org/b/id/5454124-M.jpg`
- **Estado HTTP:** `502 Bad Gateway`
- **Content-Type recibido:** `text/html`
- **Error de Chrome:** `net::ERR_BLOCKED_BY_ORB`

La respuesta recibida era contenido HTML de error, en lugar de una imagen. Chrome bloqueó su uso como recurso gráfico.

La evidencia apunta a un problema en la respuesta del servicio externo para esa solicitud concreta; no hay evidencia de que lo haya provocado la compresión de Sass.

Se comprobó que, cuando falla la carga de una portada y termina el intento de reintento, la aplicación muestra `portada-no-disponible.svg` como alternativa. De este modo, el usuario sigue viendo una imagen en la tarjeta aunque el servicio externo no pueda proporcionar la portada original.

## 7. Depuración mediante puntos de interrupción (breakpoints)

Para investigar el manejo de errores del formulario de propuestas, se utilizó un punto de interrupción en `js/formulario-propuesta.js`, dentro del bloque `catch` que maneja los fallos al enviar una propuesta a JSONPlaceholder.

### Procedimiento

Se activó el modo sin conexión (*Offline*) en Chrome DevTools y se intentó enviar una propuesta con los campos válidos. Como el navegador no tenía conexión, la solicitud no pudo completarse.

Se colocó un *breakpoint* en la línea 460 de `formulario-propuesta.js`, dentro del bloque `catch`. Al reproducir el fallo, Chrome pausó la ejecución en esa línea y permitió inspeccionar la variable `error` en el panel `Scope`.

### Resultado de la inspección

Durante la pausa se observó el error `TypeError: Failed to fetch`, relacionado con la función `enviarPropuesta`. Esto permitió identificar que la ejecución había llegado al bloque encargado de manejar los fallos de la solicitud.

En el código se observó que el bloque `catch`:

- Muestra el mensaje: «No fue posible enviar la propuesta. Comprueba tu conexión e inténtalo nuevamente».
- Registra el detalle del error mediante `console.error()`.
- Permite continuar la ejecución hacia el bloque `finally`, que vuelve a habilitar el botón de envío.

El panel `Call Stack` permitió localizar el punto donde se había detenido el programa. Después de continuar la ejecución, Chrome dejó de mostrar el estado de pausa, como se observa en la segunda captura de esta prueba.

**Conclusión:** la prueba permitió investigar el manejo de un fallo de conexión provocado de forma controlada y comprobar que el código dispone de un bloque para informar del problema. El error de conexión no constituye, por sí solo, evidencia de un defecto en la lógica de validación del formulario.

**Evidencia del breakpoint:** `docs/capturas/Evidencia4.png`.

**Evidencia posterior a la reanudación:** `docs/capturas/Evidencia5.png`.

## 8. Evidencias guardadas

Las capturas previstas para `docs/capturas/` son:

| Archivo | Evidencia que aporta |
|---|---|
| `Evidencia1.png` | Medición general de Network con recursos de extensiones visibles. |
| `Evidencia2.png` | Medición inicial con el filtro de extensiones aplicado y CSS de 219 kB. |
| `Evidencia3.png` | Medición posterior a la compresión de Sass, con CSS de 182 kB. |
| `Evidencia4.png` | Breakpoint activo en el bloque `catch`, con el error visible en `Scope`. |
| `Evidencia5.png` | Estado posterior a continuar la ejecución, cuando Chrome ya no estaba pausado. |

Estas capturas respaldan el análisis de las solicitudes de red, la comparación del tamaño del CSS y la investigación del fallo de conexión del formulario.

## 9. Comprobación final

Después de los cambios, se probaron las funcionalidades principales de la aplicación: el buscador de libros, el modal de detalles, la lista de lecturas y el formulario de propuestas. Las pruebas realizadas confirmaron que estas funcionalidades seguían operativas.

La fase permitió documentar una optimización medible del CSS, identificar el fallo de una solicitud de portada externa y observar mediante un *breakpoint* cómo se maneja un error de conexión en el formulario de propuestas.