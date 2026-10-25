// URL de búsqueda de Open Library.
const URL_API = "https://openlibrary.org/search.json";

// Busca libros por título o autor
export async function buscarLibros(consulta) {
    const termino = consulta.trim();

    // Evita enviar una búsqueda vacía
    if (!termino) {
        throw new Error("Escribe un título o autor para buscar.");
    }

    // Prepara los parámetros de la petición.
    const parametros = new URLSearchParams({
        q: termino,
        limit: "24"
    });

    const url = `${URL_API}?${parametros.toString()}`;

    // Realiza la petición a Open Library
    const respuesta = await fetch(url);

    // Comprueba si el servidor respondió correctamente
    if (!respuesta.ok) {
        throw new Error(
            `Open Library respondió con el código ${respuesta.status}.`
        );
    }

    // Convierte la respuesta a un objeto de JS
    const datos = await respuesta.json();

    // Devuelve el arreglo de libros
    return Array.isArray(datos.docs) ? datos.docs : [];
}