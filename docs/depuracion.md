# Depuración y optimización

## 1. Objetivo

En esta fase se revisó el funcionamiento de Estantería Común mediante las herramientas de desarrollo de Google Chrome. Se analizaron las solicitudes de red, el tamaño de los recursos cargados, un problema al obtener portadas de libros desde un servicio externo y el efecto de una optimización en la compilación de Sass.

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

En esa inspección aparecieron recursos como `AdobeClean-Bold.otf`, `AdobeClean-Regular.otf`, `otherVendors.js` y `vendor.js`. Estos recursos provenían de una extensión de Chrome, por lo que no debían atribuirse directamente a la aplicación.

**Evidencia:** `docs/capturas/Evidencia1.png`.

Para distinguir los recursos de la aplicación de los generados por extensiones, se utilizó el filtro `-scheme:chrome-extension` en Network. Lo cual permite medir de una mejor forma para comparar el tamaño de los recursos antes y después de la optimización.


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

Al ordenar los recursos por tamaño, se ve que `estilos.css` es el principal candidato para la optimización entre los archivos propios de la aplicación.

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

Los datos muestran una reducción de 37 kB tanto en el tamaño observado de `estilos.css` como en los totales de transferencia y recursos de las mediciones filtradas. Sin embargo, los tiempos de carga variaron: `Finish` aumentó de 13,62 a 17,10 segundos. Por lo tanto, no se concluye que todos los aspectos del rendimiento hayan mejorado. El resultado que se puede comprobar directamente es la reducción del tamaño del CSS.

Las diferencias de tiempo pueden depender de las solicitudes externas y de las condiciones de cada prueba, por lo que no deben atribuirse automáticamente al cambio de Sass.

## 6. Evidencias guardadas

Las capturas previstas para `docs/capturas/` son:

| Archivo | Evidencia que aporta |
|---|---|
| `Evidencia1.png` | Medición general de Network con recursos de extensiones visibles. |
| `Evidencia2.png` | Medición inicial con el filtro de extensiones aplicado y CSS de 219 kB. |
| `Evidencia3.png` | Medición posterior a la compresión de Sass, con CSS de 182 kB. |

Estas capturas respaldan la inspección inicial y la comparación del tamaño del archivo CSS.