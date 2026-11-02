
# Estantería Común

**Tarea 2**

**Curso:** SOFT-12-C1 -- Programación Web Avanzada

**Estudiante:** Sidney Rodríguez

**Sección:** SCV2   **Periodo:** III Cuatrimestre 2026

**Docente:** Álvaro Cordero Peña

**Fecha de entrega:** 1 de noviembre de 2026

## Descripción del proyecto

Estantería Común es una aplicación para un club de lectura comunitario. El proyecto cuenta con dos partes:

- **Parte A — Buscador de libros:** buscador público que consulta el catálogo de Open Library, permite armar una lista de lecturas y proponer un libro para la próxima sesión del club. Se desarrolla con JavaScript sin framework, Bootstrap y Sass.
- **Parte B — Tablero de lecturas:** aplicación desarrollada con React para visualizar y administrar los libros del club.

Ambas partes resuelven la misma interacción central: agregar un libro a la lista de lecturas, cambiar su estado (Pendiente, Leyendo o Leído) y quitarlo. La comparación entre las dos implementaciones se encuentra en la sección [Del DOM manual a React](#del-dom-manual-a-react).

## Tecnologías

- HTML5 y CSS3
- JavaScript
- Bootstrap
- Sass
- React
- Vite
- Git y GitHub

## Estructura del repositorio

- `buscador-js/`: buscador de libros desarrollado con JavaScript, Bootstrap y Sass.
- `tablero-react/`: tablero de lecturas desarrollado con React y Vite.
- `docs/`: documentación del proyecto y capturas de depuración.

## Instalación y ejecución

### Requisitos

- Node.js 20.19 o 22.12 en adelante, con npm.
- Un navegador actualizado, por ejemplo, Google Chrome.
- Un servidor local para la Parte A, por ejemplo, la extensión Live Server de Visual Studio Code.

Para obtener el proyecto, clonar el repositorio:

`git clone https://github.com/rod-sidney/Tarea2.git`

Cada parte es un proyecto independiente con su propio `package.json`, por lo que las dependencias se instalan por separado dentro de cada carpeta. La carpeta `node_modules/` no se incluye en el repositorio (está excluida en `.gitignore`) y se genera al ejecutar `npm install`.

## Parte A — Buscador de libros

Esta parte del proyecto corresponde al buscador de libros de Estantería Común.
Se desarrolla con HTML semántico, JavaScript sin framework, Bootstrap 5.3.3 y Sass.

### Tecnologías utilizadas

- HTML5 para la estructura de la página.
- JavaScript mediante módulos ES.
- Bootstrap 5.3.3 instalado localmente con npm.
- Sass para personalizar Bootstrap y organizar los estilos.
- CSS generado a partir de los archivos Sass.

### Estructura de archivos

Dentro de `buscador-js/` se encuentran los siguientes archivos y carpetas:

- `index.html`: estructura de la página.
- `package.json`: dependencias y comandos del proyecto.
- `package-lock.json`: registro de las versiones instaladas.
- `scss/`: archivos Sass del proyecto.
  - `main.scss`: punto de entrada que reúne los parciales.
  - `_variables.scss`: colores, tipografía y radios que personalizan Bootstrap.
  - `_bootstrap.scss`: asigna las variables de origen de Bootstrap e importa solo los parciales que usa la página.
  - `_functions.scss`, `_mixins.scss` y `_components.scss`: función, mixins y estilos de los componentes propios.
- `css/estilos.css`: hoja de estilos generada mediante Sass.
- `img/`: imagen alternativa para los libros sin portada.
- `js/`: archivos JavaScript de la aplicación.
  - `main.js`: punto de entrada que carga los demás módulos.
  - `api.js`: consulta a la API de Open Library.
  - `busqueda.js`: envío del formulario de búsqueda y estados de carga, error, resultado vacío y resultados.
  - `renderizado.js`: creación de tarjetas, modal, filas de la lista y animaciones mediante métodos del DOM.
  - `lecturas.js`: estado de la lista de lecturas y delegación de eventos.
  - `formulario-propuesta.js`: validaciones, campos de autor dinámicos y envío del formulario de propuesta.

### Instalación de dependencias

Desde una terminal, ingresar a la carpeta `buscador-js` y ejecutar:

`npm install`

Este comando instala las dependencias declaradas en `package.json`.

### Compilación de Sass

Para compilar los estilos y generar `css/estilos.css`, ejecutar:

`npm run sass:build`

Para recompilar automáticamente los estilos cuando se modifican los archivos Sass, ejecutar:

`npm run sass:watch`

### Ejecución

Abrir `buscador-js/index.html` mediante un servidor local, por ejemplo, utilizando la extensión Live Server de Visual Studio Code.

Los archivos Sass son los archivos fuente que se modifican durante el desarrollo. El navegador utiliza el archivo CSS generado por el compilador.

La página no funciona si se abre directamente con doble clic (`file://`), porque el navegador no carga módulos ES sin un servidor. Además, `index.html` carga el JavaScript de Bootstrap desde `node_modules/`, por lo que se debe ejecutar `npm install` antes de abrirla.

## Parte B — Tablero de lecturas

Esta parte del proyecto corresponde al tablero interno donde los miembros del club llevan el registro de las lecturas.
Se desarrolla con React y Vite. Los datos iniciales de miembros y libros se cargan desde `src/data/libros.js`; en esta parte no se consume ninguna API.

### Tecnologías utilizadas

- React 19 con componentes funcionales y el hook `useState`.
- Vite como herramienta de desarrollo y compilación.
- Bootstrap 5.3.3 instalado localmente con npm.
- Sass, con los mismos parciales y la misma personalización de Bootstrap de la Parte A.
- Oxlint para revisar el código.

### Estructura de archivos

Dentro de `tablero-react/` se encuentran los siguientes archivos y carpetas:

- `index.html`: página base donde se monta la aplicación.
- `package.json`: dependencias y comandos del proyecto.
- `vite.config.js`: configuración de Vite y de la compilación de Sass.
- `src/main.jsx`: punto de entrada que importa los estilos y monta `App`.
- `src/App.jsx`: componente raíz que guarda el estado de los libros y de los filtros.
- `src/componentes/`: componentes organizados por carpetas.
  - `layout/`: `Pagina` (recibe `children`), `Encabezado`, `Hero` y `PiePagina`.
  - `comunes/`: `Panel`, contenedor reutilizable que recibe `children`.
  - `filtros/`: `Filtros`, filtros por estado y por miembro.
  - `resumen/`: `Resumen`, cantidad de libros por estado.
  - `libros/`: `ListaLibros` y `TarjetaLibro`.
  - `formulario/`: `FormularioLibro`, formulario controlado para agregar libros.
- `src/data/libros.js`: estados de lectura, miembros, géneros y libros iniciales.
- `src/utils/`: `libros.js` (siguiente estado de lectura) y `validarLibro.js` (validación del formulario).
- `src/styles/`: archivos Sass de la aplicación.

### Instalación de dependencias

Desde una terminal, ingresar a la carpeta `tablero-react` y ejecutar:

`npm install`

Este comando instala React, Vite, Bootstrap, Sass y las demás dependencias declaradas en `package.json`.

### Compilación de Sass

En esta parte no se necesita un comando aparte para Sass. `src/main.jsx` importa `src/styles/main.scss` y Vite lo compila automáticamente con el paquete `sass` al ejecutar la aplicación o al generar la versión de producción. La configuración se encuentra en `vite.config.js`, donde `loadPaths: ['node_modules']` permite importar Bootstrap desde `node_modules`.

### Ejecución

Para iniciar el servidor de desarrollo, ejecutar:

`npm run dev`

Luego, abrir en el navegador la dirección que muestra la terminal (por defecto, `http://localhost:5173`).

Para generar la versión de producción en la carpeta `dist/` y revisarla localmente, ejecutar:

`npm run build`

`npm run preview`

Para revisar el código con Oxlint, ejecutar:

`npm run lint`

## Del DOM manual a React

Para comparar ambas partes se toma la misma interacción: cambiar el estado de un libro de la lista (Pendiente - Leyendo - Leído - Pendiente).

### Parte A: actualizar los datos y el DOM a mano

1. **Evento:** `iniciarListaLecturas()` en [`buscador-js/js/lecturas.js`](buscador-js/js/lecturas.js#L185-L222) registra una sola escucha `click` en el `<tbody id="listaLecturas">`. Con `closest("button[data-accion]")` identifica el botón pulsado y con su atributo `data-libro-id` sabe a qué libro corresponde.
2. **Datos:** [`cambiarEstadoLibro(id, fila)`](buscador-js/js/lecturas.js#L113-L138) busca el libro en el arreglo `listaLecturas` y le asigna el siguiente valor de `ESTADOS_LECTURA`.
3. **Interfaz:** el DOM no se entera de ese cambio, así que hay que actualizarlo explícitamente. [`actualizarEstadoFila()`](buscador-js/js/renderizado.js#L354-L369) busca la etiqueta `.lectura-estado` de la fila, quita las tres clases de estado, agrega la nueva y cambia el texto; [`animarCambioEstado()`](buscador-js/js/renderizado.js#L400-L424) reinicia la animación CSS y `mostrarMensajeListaLecturas()` actualiza la alerta.

Para mantener la interfaz sincronizada con los datos fue necesario relacionar cada fila con su objeto mediante `data-libro-id`, construir cada fila con [`crearFilaLectura()`](buscador-js/js/renderizado.js#L267-L334) y repetir la actualización del DOM en cada operación: agregar inserta la fila y retira el mensaje de lista vacía; quitar filtra el arreglo, retira la fila al terminar la transición y llama a `mostrarListaVacia()` si no quedan libros. La información existe en dos lugares, el arreglo y la tabla, y cada función debe mantenerlos coherentes.

### Parte B: describir la interfaz a partir del estado

1. **Evento:** en [`TarjetaLibro.jsx`](tablero-react/src/componentes/libros/TarjetaLibro.jsx#L59-L66) el botón ejecuta `onCambiarEstado(libro.id)`, una prop de tipo función que [`App.jsx`](tablero-react/src/App.jsx) entrega a través de [`ListaLibros.jsx`](tablero-react/src/componentes/libros/ListaLibros.jsx).
2. **Estado:** [`cambiarEstado()`](tablero-react/src/App.jsx#L58-L71) crea un arreglo nuevo con `map` y, para el libro indicado, un objeto nuevo `{ ...libro, estado: siguienteEstado(libro.estado) }` (función de [`src/utils/libros.js`](tablero-react/src/utils/libros.js)). Luego lo guarda con `setLibros`, sin modificar el arreglo anterior.
3. **Interfaz:** React vuelve a renderizar. `TarjetaLibro` muestra el nuevo estado con la clase que le corresponde en `clasesEstado`, y como [`librosFiltrados` y `conteos`](tablero-react/src/App.jsx#L27-L42) se calculan durante el renderizado, la lista filtrada y el [`Resumen`](tablero-react/src/componentes/resumen/Resumen.jsx) se actualizan sin código adicional.

### Qué deja de ser necesario y por qué

| Parte A (DOM manual) | Parte B (React) |
|---|---|
| Buscar la fila con `closest()` y `data-libro-id`. | Cada `TarjetaLibro` recibe su `libro` por props, y `key={libro.id}` le permite a React identificar qué elemento cambió. |
| Cambiar las clases con `classList` y el texto con `textContent`. | El JSX declara la clase y el texto a partir de `libro.estado`. |
| Insertar y retirar filas, y el mensaje de lista vacía (`mostrarListaVacia()`). | [`ListaLibros.jsx`](tablero-react/src/componentes/libros/ListaLibros.jsx#L7-L13) usa renderizado condicional cuando no hay libros que mostrar. |
| Registrar la escucha y delegar el evento en el contenedor. | El manejador se declara en el JSX con `onClick` y React se encarga de los eventos. |
| Mantener sincronizados el arreglo y la tabla. | Hay una sola fuente de verdad, el estado `libros`, y la interfaz se deriva de él. |

Esto deja de ser necesario porque en React la interfaz se describe como una función del estado. Al llamar a `setLibros` con un arreglo nuevo (sin `push`, `splice` ni asignaciones directas), React detecta el cambio, vuelve a ejecutar los componentes y aplica en el DOM solo las diferencias. En la Parte A el código decide qué nodos modificar en cada caso; en la Parte B solo se actualiza el estado.

## Documentación

La documentación del proceso de depuración y las capturas se encuentran en la carpeta `docs/`.

El archivo `docs/depuracion.md` incluye el análisis del panel de red (cantidad de solicitudes y peso de la página), la optimización aplicada a la compilación de Sass con la medición antes y después, la incidencia detectada al cargar portadas externas y la depuración con puntos de interrupción. Las capturas de las herramientas del desarrollador se encuentran en `docs/capturas/`.

## Resumen de commits

| # | Fecha | Hash | Mensaje | Zona | Cambio |
|---|---|---|---|---|---|
| 1 | 2026-10-24 | 93230ec | Crear estructura inicial del repositorio | Carpetas | Global |
| 2 | 2026-10-24 | fc7f875 | Parte A - Creación de html y estilos con sass | buscador-js | Estructura HTML y archivos scss |
| 3 | 2026-10-24 | 6cef7fa | Cambios para scss y crear archivo main.js | buscador-js | Cambios en cuadrícula de resultados de búsqueda |
| 4 | 2026-10-25 | 3d1d9eb | Creación de la consulta al API y del proceso para mostrar los resultados obtenidos | buscador-js/js | api.js, renderizado.js |
| 5 | 2026-10-25 | 408e3fc | Envío de form de buscar libros, estados de interfaz y errores | buscador-js | busqueda.js, main.js |
| 6 | 2026-10-25 | d00c031 | Corrección del método de cargar las portadas de los libros | buscador-js/js/renderizado.js | Corrección del método crearImagenPortada |
| 7 | 2026-10-25 | 5b655b8 | Implementación de lista de lecturas con estados, delegación y animaciones | buscador-js | Agregar libros, evitar duplicados, cambiar estados, eliminar con transiciones |
| 8 | 2026-10-25 | 3a0efb8 | Creación del formulario de propuesta con validaciones y envío | buscador-js | Form, validaciones, envío a JsonPlaceholder |
| 9 | 2026-10-27 | 38f487a | Últimos cambios antes de iniciar depuración | buscador-js | buscador-js/js |
| 10 | 2026-10-27 | 9b32a89 | Optimización aplicada a Sass medida desde navegador | buscador-js/package.json, buscador-js/docs/depuracion.md, buscador-js/docs/capturas | Se modifica package.jason para la compilacion de Sass, en depuración.md se explica lo realizado, se suben las evidencias en la carpeta capturas. |
| 11 | 2026-10-27 | 971e983 | Documentación final de depuración y evidencias con breakpoint | buscador-js/docs | Documentación de investigación del error mediante un breakpoint |
| 12 | 2026-10-28 | c9f1789 | Update README.md | Global | README.md |
| 13 | 2026-10-28 | 459b15e | Parte B - Crear tablero-react con Vite | tablero-react | Creación de proyecto React |
| 14 | 2026-10-28 | 3993259 | Creación de archivos necesarios para la creación de componentes | tablero-react | Se modifica la estructura de la plantilla, se crean las carpetas /components y /data con los respectivos archivos, así como la carpeta/styles para ponerle los mismos estilos base que buscador-js, los cuales serán modificados según la necesidad. Se modificó también vite.config.js para que compile sass.|
| 15 | 2026-10-29 | 559c974 | Corrección de organización de archivos en el proyecto React | tablero-react | Se cambió la organización de los componentes, se ordenador por carpetas y se añadieron nuevos archivos para luego desarrollar los componentes necesarios |
| 16 | 2026-10-29 | 3afc8a6 | Desarrollo de primeros componentes de tablero-react | tablero-react/componentes | Carpetas /comunes y /layout, se desarrolla el código de los componentes respectivos. Aún no se conecta a App.jsx, por lo que es preliminar, falta probarlo. |
| 17 | 2026-10-30 | 1254f29 | Desarrollo de componentes restantes | tablero-react/componentes | Carpetas /filtros, /formulario, /libros, /resumen, se desarrolla el código de los componentes respectivos. Al igual que en el commit anterior, aún no se conecta a App.jsx, por lo que es preliminar, falta probarlo. |
| 18 | 2026-11-01 | be61510 | Desarrollo de App.jsx, corrección de errores en /componentes, cambios en /data y /utils | tablero-react | Conexión con App.jsx,  | Conexión de componentes en App.jsx, gestión del estado, filtros, resumen dinámico y formulario con mensaje de éxito temporal. |
