import {
    crearFilaLectura,
    mostrarListaVacia,
    actualizarEstadoFila,
    mostrarMensajeListaLecturas,
    animarEntradaFila,
    animarCambioEstado,
    animarSalidaFila
} from "./renderizado.js";

// Estados de lectura
const ESTADOS_LECTURA = ["Pendiente", "Leyendo", "Leído"];

// Arreglo de libros durante la sesión
let listaLecturas = [];

// Elementos de la página
const cuerpoLista = document.getElementById("listaLecturas");
const mensajesLista = document.getElementById("mensajeListaLecturas");

let listaInicializada = false;


// Obtiene un id para reconocer cada libro
function obtenerIdLibro(libro) {
    if (libro.key) {
        return libro.key;
    }

    // Alternativa por si un registro no trae la propiedad key
    const titulo = (libro.title || "").trim().toLowerCase();

    const autores = Array.isArray(libro.author_name)
        ? libro.author_name.join("|").toLowerCase()
        : "";

    return `${titulo}::${autores}`;
}


// Convierte autores en texto
function obtenerAutoresLibro(libro) {
    if (
        Array.isArray(libro.author_name) &&
        libro.author_name.length > 0
    ) {
        return libro.author_name.join(", ");
    }

    return "Autor no disponible";
}


// Agrega un libro desde tarjeta de resultados
export function agregarLibro(libro) {
    if (!cuerpoLista || !mensajesLista) {
        return;
    }

    const id = obtenerIdLibro(libro);

    // Comprueba si el libro ya estaba
    const yaExiste = listaLecturas.some(function (lectura) {
        return lectura.id === id;
    });

    if (yaExiste) {
        mostrarMensajeListaLecturas(
            mensajesLista,
            "Este libro ya está en tu lista de lecturas.",
            "warning"
        );

        return;
    }

    // Crear el objeto que se guarda en el arreglo
    const lectura = {
        id: id,
        titulo: libro.title || "Título no disponible",
        autor: obtenerAutoresLibro(libro),
        estado: "Pendiente"
    };

    // Guardar libro en memoria
    listaLecturas.push(lectura);

    // Crear fila en tabla
    const fila = crearFilaLectura(lectura);

    // Quitar mensaje de lista vacía
    const filaVacia = cuerpoLista.querySelector(
        "tr:not([data-libro-id])"
    );

    if (filaVacia) {
        filaVacia.remove();
    }

    // Insertar fila y animar entrada
    cuerpoLista.append(fila);
    animarEntradaFila(fila);

    mostrarMensajeListaLecturas(
        mensajesLista,
        "Libro agregado a tu lista de lecturas.",
        "success"
    );
}


// Cambia al siguiente estado
function cambiarEstadoLibro(id, fila) {
    const lectura = listaLecturas.find(function (libro) {
        return libro.id === id;
    });

    if (!lectura) {
        return;
    }

    const indiceActual = ESTADOS_LECTURA.indexOf(lectura.estado);

    const indiceSiguiente =
        (indiceActual + 1) % ESTADOS_LECTURA.length;

    lectura.estado = ESTADOS_LECTURA[indiceSiguiente];

    // Actualizar la fila
    actualizarEstadoFila(fila, lectura.estado);
    animarCambioEstado(fila);

    mostrarMensajeListaLecturas(
        mensajesLista,
        `El estado de "${lectura.titulo}" cambió a ${lectura.estado}.`,
        "success"
    );
}


// Quitar libro del arreglo y de la tabla
function quitarLibro(id, fila) {
    const existe = listaLecturas.some(function (lectura) {
        return lectura.id === id;
    });

    if (!existe) {
        return;
    }

    const lecturaEliminada = listaLecturas.find(function (lectura) {
        return lectura.id === id;
    });

    // Crear nuevo arreglo
    listaLecturas = listaLecturas.filter(function (lectura) {
        return lectura.id !== id;
    });

    // Quitar la fila
    animarSalidaFila(fila, function () {
        fila.remove();

        const filasRestantes = cuerpoLista.querySelectorAll(
            "tr[data-libro-id]"
        );

        // Si ya no quedan libros/filas, se muestra mensaje
        if (
            listaLecturas.length === 0 &&
            filasRestantes.length === 0
        ) {
            mostrarListaVacia(cuerpoLista);
        }
    });

    mostrarMensajeListaLecturas(
        mensajesLista,
        `"${lecturaEliminada.titulo}" se quitó de la lista.`,
        "info"
    );
}

// escuchar click
export function iniciarListaLecturas() {
    if (listaInicializada || !cuerpoLista) {
        return;
    }

    cuerpoLista.addEventListener("click", function (evento) {
        const elementoClicado = evento.target;

        if (!(elementoClicado instanceof Element)) {
            return;
        }

        // Buscar botón
        const boton = elementoClicado.closest("button[data-accion]");

        if (!boton || !cuerpoLista.contains(boton)) {
            return;
        }

        //
        evento.stopPropagation();

        const id = boton.dataset.libroId;
        const fila = boton.closest("tr");

        if (!id || !fila) {
            return;
        }

        if (boton.dataset.accion === "cambiar-estado") {
            cambiarEstadoLibro(id, fila);
        } else if (boton.dataset.accion === "quitar-libro") {
            quitarLibro(id, fila);
        }
    });

    listaInicializada = true;
}