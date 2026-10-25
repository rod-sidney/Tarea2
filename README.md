
# Estantería Común

**Tarea 2**

**Curso:** SOFT-12-C1 -- Programación Web Avanzada

**Estudiante:** Sidney Rodríguez

**Sección:** SCV2   **Periodo:** III Cuatrimestre 2026

**Docente:** Álvaro Cordero Peña

**Fecha de entrega:** 1 de noviembre de 2026

## Descripción del proyecto

Estantería Común es una aplicación para un club de lectura comunitario. El proyecto cuenta con dos partes:

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
- `css/estilos.css`: hoja de estilos generada mediante Sass.
- `js/`: archivos JavaScript de la aplicación.

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





- **Parte B — Tablero de lecturas:** aplicación desarrollada con React para visualizar y administrar los libros del club.

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

Las instrucciones de instalación, compilación de Sass y ejecución de ambas partes se completarán cuando se configure cada aplicación.

## Del DOM manual a React

Esta sección comparará cómo se implementa el cambio de estado de un libro en ambas partes.

En la Parte A se documentará cómo JavaScript actualiza los datos y el DOM para reflejar los cambios. En la Parte B se explicará cómo React actualiza la interfaz a partir del estado de los componentes.

Se agregarán referencias a los archivos correspondientes una vez implementadas ambas versiones.

## Documentación

La documentación del proceso de depuración y las capturas se encuentran en la carpeta `docs/`.

## Resumen de commits

| # | Fecha | Hash | Mensaje | Zona | Cambio |
|---|---|---|---|---|---|
| 1 | 2026-10-24 | 93230ec | Crear estructura inicial del repositorio | Carpetas | Global |
| 2 | 2026-10-24 | fc7f875 | Parte A - Creación de html y estilos con sass | buscador-js | Estructura HTML y archivos scss |
| 3 | 2026-10-24 | 6cef7fa | Cambios para scss y crear archivo main.js | buscador-js | Cambios en cuadrícula de resultados de búsqueda |
| 4 | 2026-10-25 | 3d1d9eb | Creación de la consulta al API y del proceso para mostrar los resultados obtenidos | buscador-js/js | api.js, renderizado.js
| 5 | 2026-10-25 | 408e3fc | Envío de form de buscar libros, estados de interfaz y errores | buscador-js | busqueda.js, main.js |
