// Imagen cuando el libro no tiene imagen
const PORTADA_ALTERNATIVA = "img/portada-no-disponible.svg";

// Muestra un mensaje en la sección de búsqueda
export function mostrarEstadoBusqueda(contenedor, mensaje, tipo = "info") {
    const alerta = document.createElement("div");

    alerta.classList.add("alert", `alert-${tipo}`, "mb-0");
    alerta.textContent = mensaje;

    if (tipo === "danger") {
        alerta.setAttribute("role", "alert");
    } else {
        alerta.setAttribute("role", "status");
    }

    contenedor.replaceChildren(alerta);
}

// Limpia los resultados anteriores
export function limpiarResultados(contenedor) {
    contenedor.replaceChildren();
}

// Devuelve los autores como un texto
function obtenerAutores(libro) {
    if (
        Array.isArray(libro.author_name) &&
        libro.author_name.length > 0
    ) {
        return libro.author_name.join(", ");
    }

    return "Autor no disponible";
}

// Crea la imagen de portada de un libro
function crearImagenPortada(libro, clases) {
    const imagen = document.createElement("img");
    const idPortada = Number(libro.cover_i);

    const tienePortada =
        Number.isInteger(idPortada) && idPortada > 0;

    imagen.className = clases;
    imagen.loading = "lazy";

    // Si no tiene portada, usa la alternativa
    if (!tienePortada) {
        imagen.src = PORTADA_ALTERNATIVA;
        imagen.alt = "Portada no disponible";

        return imagen;
    }

    const urlPortada =
        `https://covers.openlibrary.org/b/id/${idPortada}-M.jpg`;

    imagen.alt = `Portada de ${libro.title || "libro sin título"}`;

    let reintentos = 0;

    imagen.onerror = function () {
        // reintenta una vez
        if (reintentos < 1) {
            reintentos++;

            setTimeout(function () {
                imagen.src = `${urlPortada}?retry=${reintentos}`;
            }, 800);

            return;
        }

        // si vuelve a fallar, usa alternativa
        imagen.onerror = null;
        imagen.src = PORTADA_ALTERNATIVA;
        imagen.alt = "Portada no disponible";
    };

    // solicitud de la portada
    imagen.src = urlPortada;

    return imagen;
}

// Crea un dato de texto para una tarjeta
function crearDatoTarjeta(etiqueta, valor) {
    const parrafo = document.createElement("p");
    const etiquetaFuerte = document.createElement("strong");

    parrafo.className = "card-text small mb-2";
    etiquetaFuerte.textContent = `${etiqueta}: `;

    parrafo.append(
        etiquetaFuerte,
        document.createTextNode(String(valor))
    );

    return parrafo;
}

// Crea la tarjeta de un libro
function crearTarjetaLibro(libro, onVerDetalle, onAgregarLectura) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card", "h-100", "book-result-card");

    const portada = crearImagenPortada(
        libro,
        "book-card__cover"
    );

    const cuerpo = document.createElement("div");
    cuerpo.classList.add("card-body", "d-flex", "flex-column");

    const titulo = document.createElement("h3");
    titulo.classList.add("card-title", "h5");
    titulo.textContent = libro.title || "Título no disponible";

    const autores = crearDatoTarjeta(
        "Autor(es)",
        obtenerAutores(libro)
    );

    const anio = crearDatoTarjeta(
        "Primera publicación",
        libro.first_publish_year ?? "Año no disponible"
    );

    // Botón mostrar detalle del libro
    const botonDetalle = document.createElement("button");
    botonDetalle.type = "button";
    botonDetalle.classList.add("btn", "btn-outline-primary");
    botonDetalle.textContent = "Ver detalles";

    botonDetalle.addEventListener("click", function () {
        onVerDetalle(libro);
    });

    // Botón agregar libro a la lista de lecturas
    const botonAgregar = document.createElement("button");
    botonAgregar.type = "button";
    botonAgregar.classList.add("btn", "btn-primary");
    botonAgregar.textContent = "Agregar a mi lista";

    botonAgregar.addEventListener("click", function () {
        onAgregarLectura(libro);
    });

    // agrupar botones
    const grupoBotones = document.createElement("div");
    grupoBotones.classList.add("d-grid", "gap-2", "mt-auto");
    grupoBotones.append(botonDetalle, botonAgregar);

    cuerpo.append(titulo, autores, anio, grupoBotones);
    tarjeta.append(portada, cuerpo);

    return tarjeta;
}

// Dibuja todas las tarjetas usando los datos recibidos
export function renderizarResultados(
    libros,
    contenedor,
    onVerDetalle,
    onAgregarLectura
) {
    const fragmento = document.createDocumentFragment();

    libros.forEach(function (libro) {
        const tarjeta = crearTarjetaLibro(
            libro,
            onVerDetalle,
            onAgregarLectura
        );

        fragmento.append(tarjeta);
    });

    contenedor.replaceChildren(fragmento);
}

// Crea un dato para la ventana de detalles
function crearDatoDetalle(etiqueta, valor) {
    const parrafo = document.createElement("p");
    const etiquetaFuerte = document.createElement("strong");

    parrafo.className = "mb-2";
    etiquetaFuerte.textContent = `${etiqueta}: `;

    parrafo.append(
        etiquetaFuerte,
        document.createTextNode(String(valor))
    );

    return parrafo;
}

// Muestra los detalles del libro seleccionado en el modal
export function mostrarDetalleLibro(libro) {
    const modalElemento = document.getElementById("modalLibro");
    const tituloModal = document.getElementById("tituloModalLibro");
    const contenidoModal = document.getElementById("detalleLibro");

    tituloModal.textContent = libro.title || "Detalle del libro";
    contenidoModal.replaceChildren();

    const distribucion = document.createElement("div");
    distribucion.classList.add("row", "g-3", "align-items-start");

    const columnaPortada = document.createElement("div");
    columnaPortada.classList.add("col-12", "col-md-4");

    const portada = crearImagenPortada(
        libro,
        "book-detail-cover img-fluid rounded"
    );

    columnaPortada.append(portada);

    const columnaDatos = document.createElement("div");
    columnaDatos.classList.add("col-12", "col-md-8");

    const editorial =
        Array.isArray(libro.publisher) && libro.publisher.length > 0
            ? libro.publisher[0]
            : "No disponible";

    columnaDatos.append(
        crearDatoDetalle("Autor(es)", obtenerAutores(libro)),
        crearDatoDetalle(
            "Primera publicación",
            libro.first_publish_year ?? "Año no disponible"
        ),
        crearDatoDetalle("Editorial", editorial),
        crearDatoDetalle(
            "Cantidad de ediciones",
            libro.edition_count ?? "No disponible"
        )
    );

    distribucion.append(columnaPortada, columnaDatos);
    contenidoModal.append(distribucion);

    // Bootstrap abre la ventana modal
    if (window.bootstrap && window.bootstrap.Modal) {
        window.bootstrap.Modal
            .getOrCreateInstance(modalElemento)
            .show();
    }
}

// Devuelve el color correspondiente al estado.
function obtenerClaseEstadoLectura(estado) {
    if (estado === "Leyendo") {
        return "lectura-estado--leyendo";
    }

    if (estado === "Leído") {
        return "lectura-estado--leido";
    }

    return "lectura-estado--pendiente";
}

// Crea la fila de un libro en la tabla de lecturas.
export function crearFilaLectura(lectura) {
    const fila = document.createElement("tr");

    fila.dataset.libroId = lectura.id;
    fila.classList.add("lectura-row", "lectura-row--entrando");

    // título
    const celdaTitulo = document.createElement("td");
    celdaTitulo.textContent = lectura.titulo;

    // autor
    const celdaAutor = document.createElement("td");
    celdaAutor.textContent = lectura.autor;

    // estado
    const celdaEstado = document.createElement("td");

    const etiquetaEstado = document.createElement("span");
    etiquetaEstado.classList.add(
        "badge",
        "lectura-estado",
        obtenerClaseEstadoLectura(lectura.estado)
    );

    etiquetaEstado.textContent = lectura.estado;
    celdaEstado.append(etiquetaEstado);

    // Botón cambiar estado
    const botonCambiar = document.createElement("button");
    botonCambiar.type = "button";
    botonCambiar.classList.add(
        "btn",
        "btn-outline-primary",
        "btn-sm"
    );
    botonCambiar.textContent = "Cambiar estado";
    botonCambiar.dataset.accion = "cambiar-estado";
    botonCambiar.dataset.libroId = lectura.id;

    // Botón quitar libro
    const botonQuitar = document.createElement("button");
    botonQuitar.type = "button";
    botonQuitar.classList.add(
        "btn",
        "btn-outline-danger",
        "btn-sm"
    );
    botonQuitar.textContent = "Quitar";
    botonQuitar.dataset.accion = "quitar-libro";
    botonQuitar.dataset.libroId = lectura.id;

    // Agrupar botones dentro de celda de acciones
    const grupoBotones = document.createElement("div");
    grupoBotones.classList.add("d-flex", "flex-wrap", "gap-2");
    grupoBotones.append(botonCambiar, botonQuitar);

    const celdaAcciones = document.createElement("td");
    celdaAcciones.append(grupoBotones);

    fila.append(
        celdaTitulo,
        celdaAutor,
        celdaEstado,
        celdaAcciones
    );

    return fila;
}

// Muestra el mensaje de lista vacía
export function mostrarListaVacia(contenedor) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");

    celda.colSpan = 4;
    celda.classList.add(
        "text-center",
        "text-secondary",
        "py-4"
    );
    celda.textContent = "Todavía no hay libros en la lista.";

    fila.append(celda);
    contenedor.replaceChildren(fila);
}

// Actualizar el estado de una fila
export function actualizarEstadoFila(fila, estado) {
    const etiqueta = fila.querySelector(".lectura-estado");

    if (!etiqueta) {
        return;
    }

    etiqueta.classList.remove(
        "lectura-estado--pendiente",
        "lectura-estado--leyendo",
        "lectura-estado--leido"
    );

    etiqueta.classList.add(obtenerClaseEstadoLectura(estado));
    etiqueta.textContent = estado;
}

// Mostrar mensaje de resultado acción
export function mostrarMensajeListaLecturas(
    contenedor,
    mensaje,
    tipo = "success"
) {
    const alerta = document.createElement("div");

    alerta.classList.add("alert", `alert-${tipo}`, "mb-0");
    alerta.textContent = mensaje;
    alerta.setAttribute(
        "role",
        tipo === "warning" || tipo === "danger" ? "alert" : "status"
    );

    contenedor.replaceChildren(alerta);
}

// Activar transición de entrada fila
export function animarEntradaFila(fila) {
    requestAnimationFrame(function () {
        fila.classList.remove("lectura-row--entrando");
    });
}

// Activar animación de cambio de estado
export function animarCambioEstado(fila) {
    const etiqueta = fila.querySelector(".lectura-estado");

    if (!etiqueta) {
        return;
    }

    // Reiniciar si se da click varias veces
    etiqueta.classList.remove("lectura-estado--animando");

    // reconocer reinicio animación
    void etiqueta.offsetWidth;

    // Iniciar animación
    etiqueta.classList.add("lectura-estado--animando");

    // Quitar clase cuando termina la animación
    etiqueta.addEventListener(
        "animationend",
        function () {
            etiqueta.classList.remove("lectura-estado--animando");
        },
        { once: true }
    );
}

// Animar la salida y ejecuta una acción al terminar
export function animarSalidaFila(fila, alTerminar) {
    let finalizada = false;

    function finalizar(evento) {
        if (
            evento &&
            (evento.target !== fila || evento.propertyName !== "opacity")
        ) {
            return;
        }

        if (finalizada) {
            return;
        }

        finalizada = true;
        fila.removeEventListener("transitionend", finalizar);
        alTerminar();
    }

    fila.addEventListener("transitionend", finalizar);

    // clase CSS inicia la transición.
    fila.classList.add("lectura-row--saliendo");

    // por si transitionend no funciona
    window.setTimeout(function () {
        finalizar();
    }, 350);
}