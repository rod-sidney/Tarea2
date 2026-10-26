// Dirección del servicio de pruebas
const URL_PROPUESTAS =
    "https://jsonplaceholder.typicode.com/posts";

// Elementos del formulario
const formulario = document.getElementById("formPropuesta");
const autoresContainer = document.getElementById("autoresContainer");
const botonAgregarAutor = document.getElementById("agregarAutor");
const alertasPropuesta = document.getElementById("alertasPropuesta");
const botonEnviar = document.getElementById("btnEnviarPropuesta");

// Límites para la cantidad de autores
const MIN_AUTORES = 1;
const MAX_AUTORES = 5;

// Obtiene fecha local en formato AAAA-MM-DD
function obtenerFechaLocal() {
    const hoy = new Date();

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
}

// Valores actuales para validaciones
const ANIO_ACTUAL = new Date().getFullYear();
const FECHA_ACTUAL = obtenerFechaLocal();

// El año no puede ser futuro
document.getElementById("anioPublicacion").max = String(ANIO_ACTUAL);

// La fecha de la sesión no puede estar en el pasado
document.getElementById("fechaSesion").min = FECHA_ACTUAL;


// Obtiene los campos para validar
function obtenerCamposFormulario() {
    return formulario.querySelectorAll("input, textarea");
}

// Obtiene el nombre descriptivo de los campos
function obtenerNombreCampo(campo) {
    const nombre = campo.dataset.etiqueta || "este campo";

    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
}

// Decide qué mensaje mostrar según el error
function obtenerMensajeError(campo) {
    const validez = campo.validity;
    const nombre = obtenerNombreCampo(campo);

    // Mensajes para las reglas personalizadas
    if (validez.customError) {
        return campo.validationMessage;
    }

    if (validez.valueMissing) {
        return `Completa ${campo.dataset.etiqueta || "este campo"}.`;
    }

    if (validez.typeMismatch && campo.type === "email") {
        return "Ingresa un correo electrónico con un formato válido.";
    }

    if (validez.tooShort) {
        return `${nombre} debe tener al menos ${campo.minLength} caracteres.`;
    }

    if (validez.tooLong) {
        return `${nombre} no puede superar ${campo.maxLength} caracteres.`;
    }

    if (validez.patternMismatch) {
        return `${nombre} contiene un formato no válido.`;
    }

    if (validez.rangeUnderflow && campo.type === "date") {
        return "La fecha de la sesión no puede ser anterior a hoy.";
    }

    if (validez.rangeUnderflow && campo.type === "number") {
        return `${nombre} debe ser al menos ${campo.min}.`;
    }

    if (validez.rangeOverflow && campo.id === "anioPublicacion") {
        return `El año de publicación no puede superar ${ANIO_ACTUAL}.`;
    }

    if (validez.rangeOverflow) {
        return `${nombre} supera el límite permitido.`;
    }

    if (validez.stepMismatch) {
        return `${nombre} debe ser un número entero.`;
    }

    return `Revisa el valor de ${campo.dataset.etiqueta || "este campo"}.`;
}

// Comprueba campo y actualiza su mensaje
function actualizarValidacionCampo(campo) {
    campo.setCustomValidity("");

    // Año de publicación
    if (
        campo.id === "anioPublicacion" &&
        campo.value !== "" &&
        Number(campo.value) > ANIO_ACTUAL
    ) {
        campo.setCustomValidity(
            `El año de publicación no puede superar ${ANIO_ACTUAL}.`
        );
    }

    // Fecha de la sesión
    if (
        campo.id === "fechaSesion" &&
        campo.value !== "" &&
        campo.value < FECHA_ACTUAL
    ) {
        campo.setCustomValidity(
            "La fecha de la sesión no puede ser anterior a hoy."
        );
    }

    const mensaje = campo.validity.valid
        ? ""
        : obtenerMensajeError(campo);

    const feedback =
        campo.parentElement.querySelector(".invalid-feedback");

    if (mensaje) {
        campo.classList.add("is-invalid");
        campo.setAttribute("aria-invalid", "true");
    } else {
        campo.classList.remove("is-invalid");
        campo.removeAttribute("aria-invalid");
    }

    if (feedback) {
        feedback.textContent = mensaje;
    }
}

// Muestra errores cuando un campo cumple validación
formulario.addEventListener("invalid", function (evento) {
    const campo = evento.target;

    if (
        campo instanceof HTMLInputElement ||
        campo instanceof HTMLTextAreaElement
    ) {
        actualizarValidacionCampo(campo);

        evento.preventDefault();
    }
}, true);

// Revisa el campo mientras el usuario modifica su valor
formulario.addEventListener("input", function (evento) {
    const campo = evento.target;

    if (
        campo instanceof HTMLInputElement ||
        campo instanceof HTMLTextAreaElement
    ) {
        actualizarValidacionCampo(campo);
    }
});

// Comprueba los campos cuando cambia su valor
formulario.addEventListener("change", function (evento) {
    const campo = evento.target;

    if (
        campo instanceof HTMLInputElement ||
        campo instanceof HTMLTextAreaElement
    ) {
        actualizarValidacionCampo(campo);
    }
});

// Campo autor
function crearCampoAutor(numero) {
    const columna = document.createElement("div");
    columna.classList.add("col-12", "col-md-6", "campo-autor");

    const etiqueta = document.createElement("label");
    etiqueta.classList.add("form-label");
    etiqueta.textContent = `Autor ${numero}`;

    const entrada = document.createElement("input");
    entrada.id = `autor-${numero}`;
    entrada.name = "autores[]";
    entrada.type = "text";
    entrada.classList.add("form-control");
    entrada.minLength = 2;
    entrada.maxLength = 100;
    entrada.required = true;
    entrada.setAttribute("pattern", ".*\\S.*");
    entrada.placeholder = "Nombre del autor";
    entrada.dataset.etiqueta = `el autor ${numero}`;

    const idError = `errorAutor${numero}`;
    entrada.setAttribute("aria-describedby", idError);
    etiqueta.htmlFor = entrada.id;

    const error = document.createElement("div");
    error.id = idError;
    error.classList.add("invalid-feedback");

    const botonQuitar = document.createElement("button");
    botonQuitar.type = "button";
    botonQuitar.classList.add(
        "btn",
        "btn-outline-danger",
        "btn-sm",
        "mt-2"
    );
    botonQuitar.textContent = "Quitar autor";
    botonQuitar.dataset.accion = "quitar-autor";
    botonQuitar.setAttribute(
        "aria-label",
        `Quitar autor ${numero}`
    );

    columna.append(etiqueta, entrada, error, botonQuitar);

    return columna;
}

// Renumerar autores cuando se quita o se agrega uno
function renumerarAutores() {
    const camposAutor =
        autoresContainer.querySelectorAll(".campo-autor");

    camposAutor.forEach(function (contenedor, indice) {
        const numero = indice + 1;
        const etiqueta = contenedor.querySelector("label");
        const entrada = contenedor.querySelector("input");
        const error = contenedor.querySelector(".invalid-feedback");
        const botonQuitar = contenedor.querySelector(
            'button[data-accion="quitar-autor"]'
        );

        entrada.id = `autor-${numero}`;
        entrada.dataset.etiqueta = `el autor ${numero}`;

        error.id = `errorAutor${numero}`;
        entrada.setAttribute("aria-describedby", error.id);

        etiqueta.htmlFor = entrada.id;
        etiqueta.textContent = `Autor ${numero}`;

        botonQuitar.setAttribute(
            "aria-label",
            `Quitar autor ${numero}`
        );
    });
}

// activar o desactivar botones según cantidad de autores
function actualizarBotonesAutores() {
    const camposAutor =
        autoresContainer.querySelectorAll(".campo-autor");

    const cantidad = camposAutor.length;

    botonAgregarAutor.disabled = cantidad >= MAX_AUTORES;

    camposAutor.forEach(function (contenedor) {
        const botonQuitar = contenedor.querySelector(
            'button[data-accion="quitar-autor"]'
        );

        botonQuitar.disabled = cantidad <= MIN_AUTORES;
    });
}

// agregar autor si son < 5
botonAgregarAutor.addEventListener("click", function () {
    const cantidad =
        autoresContainer.querySelectorAll(".campo-autor").length;

    if (cantidad >= MAX_AUTORES) {
        return;
    }

    const nuevoCampo = crearCampoAutor(cantidad + 1);

    autoresContainer.append(nuevoCampo);

    renumerarAutores();
    actualizarBotonesAutores();

    nuevoCampo.querySelector("input").focus();
});

// Escucha los clicks en los botones de quitar autor
autoresContainer.addEventListener("click", function (evento) {
    if (!(evento.target instanceof Element)) {
        return;
    }

    const botonQuitar = evento.target.closest(
        'button[data-accion="quitar-autor"]'
    );

    if (!botonQuitar || !autoresContainer.contains(botonQuitar)) {
        return;
    }

    const camposAutor =
        autoresContainer.querySelectorAll(".campo-autor");

    if (camposAutor.length <= MIN_AUTORES) {
        return;
    }

    botonQuitar.closest(".campo-autor").remove();

    renumerarAutores();
    actualizarBotonesAutores();
});

// Configurar estado inicial de los botones
actualizarBotonesAutores();

// mostrar alerta de Bootstrap con el resultado
function mostrarAlertaPropuesta(tipo, mensaje) {
    const alerta = document.createElement("div");

    alerta.classList.add("alert", `alert-${tipo}`, "mb-0");
    alerta.textContent = mensaje;

    if (tipo === "danger") {
        alerta.setAttribute("role", "alert");
    } else {
        alerta.setAttribute("role", "status");
    }

    alertasPropuesta.replaceChildren(alerta);
}

// prepara objeto con los datos
function obtenerDatosPropuesta() {
    const autores = Array.from(
        formulario.querySelectorAll('input[name="autores[]"]')
    ).map(function (campo) {
        return campo.value.trim();
    });

    return {
        titulo: formulario.elements.titulo.value.trim(),
        autores: autores,
        anio: Number(formulario.elements.anio.value),
        paginas: Number(formulario.elements.paginas.value),
        genero: formulario.elements.genero.value.trim(),
        correo: formulario.elements.correo.value.trim(),
        fecha: formulario.elements.fecha.value,
        motivo: formulario.elements.motivo.value.trim()
    };
}

// Envía los datos al servicio de pruebas
async function enviarPropuesta(propuesta) {
    const respuesta = await fetch(URL_PROPUESTAS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(propuesta)
    });

    if (!respuesta.ok) {
        throw new Error(
            `El servicio respondió con el código ${respuesta.status}.`
        );
    }

    return await respuesta.json();
}

// Elimina los mensajes de validación anteriores
function limpiarErroresCampos() {
    obtenerCamposFormulario().forEach(function (campo) {
        campo.setCustomValidity("");
        campo.classList.remove("is-invalid");
        campo.removeAttribute("aria-invalid");

        const feedback =
            campo.parentElement.querySelector(".invalid-feedback");

        if (feedback) {
            feedback.textContent = "";
        }
    });
}

// Restablecer formulario después de envío
function reiniciarFormulario() {
    formulario.reset();

    const camposAutor =
        autoresContainer.querySelectorAll(".campo-autor");

    camposAutor.forEach(function (campo, indice) {
        if (indice >= MIN_AUTORES) {
            campo.remove();
        }
    });

    renumerarAutores();
    actualizarBotonesAutores();
    limpiarErroresCampos();
}

// Procesar el envío del formulario sin refresh
formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    // comprobar campos antes de preparar la propuesta
    obtenerCamposFormulario().forEach(actualizarValidacionCampo);

    if (!formulario.checkValidity()) {
        const primerCampoInvalido =
            formulario.querySelector("input:invalid, textarea:invalid");

        if (primerCampoInvalido) {
            primerCampoInvalido.focus();
        }

        return;
    }

    const propuesta = obtenerDatosPropuesta();

    botonEnviar.disabled = true;

    mostrarAlertaPropuesta(
        "info",
        "Enviando la propuesta..."
    );

    try {
        await enviarPropuesta(propuesta);

        mostrarAlertaPropuesta(
            "success",
            "La propuesta se envió correctamente al servicio de pruebas."
        );

        reiniciarFormulario();

    } catch (error) {
        mostrarAlertaPropuesta(
            "danger",
            "No fue posible enviar la propuesta. Comprueba tu conexión e inténtalo nuevamente."
        );

        console.error("Error al enviar la propuesta:", error);

    } finally {
        botonEnviar.disabled = false;
    }
});