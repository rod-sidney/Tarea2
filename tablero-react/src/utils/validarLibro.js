// Validación del formulario de libros
// Recibe los datos del formulario y devuelve un objeto con los mensajes de error de los campos que no sean válidos

export function validarLibro(datos) {
    const errores = {};

    // Validar título
    if (datos.titulo.trim().length < 2) {
        errores.titulo = 'Escriba un título de al menos 2 caracteres.';
    }

    // Validar cantidad de autores
    if (datos.autores.length < 1 || datos.autores.length > 5) {
        errores.cantidadAutores = 'El libro debe tener entre 1 y 5 autores.';
    }

    // Validar cada autor
    const erroresAutores = datos.autores.map((autor) => {
        if (autor.nombre.trim().length < 2) {
            return 'Escriba el nombre del autor (mínimo 2 caracteres).';
        }

        return '';
    });

    if (erroresAutores.some((mensaje) => mensaje !== '')) {
        errores.autores = erroresAutores;
    }

    // Validar año de publicación
    const anio = Number(datos.anioPublicacion);
    const anioActual = new Date().getFullYear();

    if (!Number.isInteger(anio) || anio < 1) {
        errores.anioPublicacion = 'Indique un año de publicación válido.';
    } else if (anio > anioActual) {
        errores.anioPublicacion = 'El año de publicación no puede ser futuro.';
    }

    // Validar cantidad de páginas
    const paginas = Number(datos.paginas);

    if (!Number.isInteger(paginas) || paginas < 1) {
        errores.paginas = 'Indique una cantidad de páginas válida.';
    }

    // Validar género
    if (datos.genero === '') {
        errores.genero = 'Seleccione un género.';
    }

    // Validar miembro que propone el libro
    if (datos.miembro === '') {
        errores.miembro = 'Seleccione quién propone el libro.';
    }

    return errores;
}