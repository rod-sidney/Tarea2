import { buscarLibros } from "./api.js";

import {
    mostrarEstadoBusqueda,
    limpiarResultados,
    renderizarResultados,
    mostrarDetalleLibro
} from "./renderizado.js";

import { agregarLibro } from "./lecturas.js";

// Obtener elementos de index.html
const formulario = document.getElementById("formBusqueda");
const campoBusqueda = document.getElementById("textoBusqueda");
const estadoBusqueda = document.getElementById("estadoBusqueda");
const resultadosLibros = document.getElementById("resultadosLibros");

// Escuchar envío del formulario
formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const consulta = campoBusqueda.value.trim();

    if (!consulta) {
        mostrarEstadoBusqueda(
            estadoBusqueda,
            "Escribe un título o autor para comenzar.",
            "warning"
        );

        campoBusqueda.focus();
        return;
    }

    // Mostrar estado de carga
    mostrarEstadoBusqueda(
        estadoBusqueda,
        "Buscando libros en Open Library...",
        "info"
    );

    // limpiar resultados anteriores
    limpiarResultados(resultadosLibros);

    try {
        // Esperar api
        const libros = await buscarLibros(consulta);

        // Si no hay libros, mostrar vac[io]
        if (libros.length === 0) {
            mostrarEstadoBusqueda(
                estadoBusqueda,
                "No se encontraron libros. Prueba con otro título o autor.",
                "warning"
            );

            return;
        }

        // dibujar tarjetas
        renderizarResultados(
            libros,
            resultadosLibros,
            mostrarDetalleLibro,
            agregarLibro
        );

        // busqueda exitosa
        mostrarEstadoBusqueda(
            estadoBusqueda,
            `Se encontraron ${libros.length} resultados para "${consulta}".`,
            "success"
        );

    } catch (error) {
        // error de red o de respuesta
        mostrarEstadoBusqueda(
            estadoBusqueda,
            "No fue posible completar la búsqueda. Comprueba tu conexión e inténtalo de nuevo.",
            "danger"
        );

        console.error("Error durante la búsqueda:", error);
    }
});