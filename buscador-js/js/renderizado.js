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
    const tienePortada = Number.isInteger(idPortada) && idPortada > 0;

    if (tienePortada) {
        imagen.src = `https://covers.openlibrary.org/b/id/${idPortada}-M.jpg`;
        imagen.alt = `Portada de ${libro.title || "libro sin título"}`;
    } else {
        imagen.src = PORTADA_ALTERNATIVA;
        imagen.alt = "Portada no disponible";
    }

    imagen.className = clases;
    imagen.loading = "lazy";

    //usar alternativa si hay error
    imagen.onerror = function () {
        imagen.onerror = null;
        imagen.src = PORTADA_ALTERNATIVA;
        imagen.alt = "Portada no disponible";
    };

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
function crearTarjetaLibro(libro, onVerDetalle) {
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

    const botonDetalle = document.createElement("button");
    botonDetalle.type = "button";
    botonDetalle.classList.add(
        "btn",
        "btn-outline-primary",
        "mt-auto"
    );
    botonDetalle.textContent = "Ver detalles";

    // Mostrar el modal
    botonDetalle.addEventListener("click", function () {
        onVerDetalle(libro);
    });

    cuerpo.append(titulo, autores, anio, botonDetalle);
    tarjeta.append(portada, cuerpo);

    return tarjeta;
}

// Dibuja todas las tarjetas usando los datos recibidos
export function renderizarResultados(libros, contenedor, onVerDetalle) {
    const fragmento = document.createDocumentFragment();

    libros.forEach(function (libro) {
        const tarjeta = crearTarjetaLibro(libro, onVerDetalle);
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