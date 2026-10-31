// FormularioLibro.jsx
// Datos iniciales del formulario
// comienza con un solo campo de autor

import { useState } from 'react';
import {
    GENEROS,
    MIEMBROS
} from '../../data/libros.js';

import { validarLibro } from '../../utils/validarLibro.js';

const ANIO_ACTUAL = new Date().getFullYear();

function crearDatosVacios() {
    return {
        titulo: '',
        autores: [
            {
                id: 1,
                nombre: ''
            }
        ],
        anioPublicacion: '',
        paginas: '',
        genero: '',
        miembro: ''
    };
}

function FormularioLibro({ onAgregar }) {
    const [datos, setDatos] = useState(crearDatosVacios);
    const [errores, setErrores] = useState({});

    // cambiar campos del form
    function cambiar(event) {
        const { name, value } = event.target;

        setDatos({
            ...datos,
            [name]: value
        });
    }

    // cambiar nombre de un autor
    function cambiarAutor(id, nombre) {
        const nuevosAutores = datos.autores.map((autor) =>
            autor.id === id
                ? { ...autor, nombre: nombre }
                : autor
        );

        setDatos({
            ...datos,
            autores: nuevosAutores
        });
    }

    // agregar campo de autor
    function agregarAutor() {
        if (datos.autores.length >= 5) {
            return;
        }

        const nuevoId = Math.max(
            0,
            ...datos.autores.map((autor) => autor.id)
        ) + 1;

        setDatos({
            ...datos,
            autores: [
                ...datos.autores,
                {
                    id: nuevoId,
                    nombre: ''
                }
            ]
        });
    }

    // quitar campo de autor
    function quitarAutor(id) {
        if (datos.autores.length <= 1) {
            return;
        }

        const nuevosAutores = datos.autores.filter(
            (autor) => autor.id !== id
        );

        setDatos({
            ...datos,
            autores: nuevosAutores
        });
    }

    // enviar form
    function enviar(event) {
        event.preventDefault();

        const nuevosErrores = validarLibro(datos);

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            return;
        }

        const libroNuevo = {
            ...datos,
            titulo: datos.titulo.trim(),
            autores: datos.autores.map((autor) => autor.nombre.trim()),
            anioPublicacion: Number(datos.anioPublicacion),
            paginas: Number(datos.paginas)
        };

        onAgregar(libroNuevo);

        setDatos(crearDatosVacios());
        setErrores({});
    }

    // interfaz form
    return (
        <form onSubmit={enviar} noValidate>

            {/* título */}
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                    Título del libro
                </label>

                <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    className={errores.titulo ? 'form-control is-invalid' : 'form-control'}
                    value={datos.titulo}
                    onChange={cambiar}
                    minLength={2}
                    required
                    aria-invalid={Boolean(errores.titulo)}
                    aria-describedby={errores.titulo ? 'error-titulo' : undefined}
                />

                {errores.titulo && (
                    <div id="error-titulo" className="invalid-feedback">
                        {errores.titulo}
                    </div>
                )}
            </div>

            {/* autores */}
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label mb-0">
                        Autor o autores
                    </label>

                    <small className="text-secondary">
                        {datos.autores.length} de 5
                    </small>
                </div>

                {datos.autores.map((autor, indice) => (
                    <div className="mb-3" key={autor.id}>
                        <label
                            htmlFor={`autor-${autor.id}`}
                            className="form-label"
                        >
                            Autor {indice + 1}
                        </label>

                        <div className="input-group">
                            <input
                                id={`autor-${autor.id}`}
                                type="text"
                                className={
                                    errores.autores?.[indice]
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                value={autor.nombre}
                                onChange={(event) =>
                                    cambiarAutor(autor.id, event.target.value)
                                }
                                minLength={2}
                                required
                                aria-invalid={Boolean(errores.autores?.[indice])}
                                aria-describedby={
                                    errores.autores?.[indice]
                                        ? `error-autor-${autor.id}`
                                        : undefined
                                }
                            />

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => quitarAutor(autor.id)}
                                disabled={datos.autores.length === 1}
                                aria-label={`Quitar autor ${indice + 1}`}
                            >
                                Quitar
                            </button>
                        </div>

                        {errores.autores?.[indice] && (
                            <div
                                id={`error-autor-${autor.id}`}
                                className="text-danger small mt-1"
                            >
                                {errores.autores[indice]}
                            </div>
                        )}
                    </div>
                ))}

                {errores.cantidadAutores && (
                    <div className="text-danger small mb-2">
                        {errores.cantidadAutores}
                    </div>
                )}

                <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={agregarAutor}
                    disabled={datos.autores.length === 5}
                >
                    + Agregar otro autor
                </button>

                <div className="form-text">
                    Debe indicar entre 1 y 5 autores.
                </div>
            </div>

            {/* año de públicacion */}
            <div className="mb-3">
                <label htmlFor="anioPublicacion" className="form-label">
                    Año de publicación
                </label>

                <input
                    id="anioPublicacion"
                    name="anioPublicacion"
                    type="number"
                    className={
                        errores.anioPublicacion
                            ? 'form-control is-invalid'
                            : 'form-control'
                    }
                    value={datos.anioPublicacion}
                    onChange={cambiar}
                    min="1"
                    max={ANIO_ACTUAL}
                    step="1"
                    required
                />

                {errores.anioPublicacion && (
                    <div className="invalid-feedback">
                        {errores.anioPublicacion}
                    </div>
                )}
            </div>

            {/* cantidad de páginas */}
            <div className="mb-3">
                <label htmlFor="paginas" className="form-label">
                    Cantidad de páginas
                </label>

                <input
                    id="paginas"
                    name="paginas"
                    type="number"
                    className={
                        errores.paginas
                            ? 'form-control is-invalid'
                            : 'form-control'
                    }
                    value={datos.paginas}
                    onChange={cambiar}
                    min="1"
                    step="1"
                    required
                />

                {errores.paginas && (
                    <div className="invalid-feedback">
                        {errores.paginas}
                    </div>
                )}
            </div>

            {/* género */}
            <div className="mb-3">
                <label htmlFor="genero" className="form-label">
                    Género
                </label>

                <select
                    id="genero"
                    name="genero"
                    className={
                        errores.genero
                            ? 'form-select is-invalid'
                            : 'form-select'
                    }
                    value={datos.genero}
                    onChange={cambiar}
                    required
                >
                    <option value="">Seleccione un género...</option>

                    {GENEROS.map((opcion) => (
                        <option key={opcion} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>

                {errores.genero && (
                    <div className="invalid-feedback">
                        {errores.genero}
                    </div>
                )}
            </div>

            {/* miembro que propone */}
            <div className="mb-3">
                <label htmlFor="miembro" className="form-label">
                    Miembro que propone el libro
                </label>

                <select
                    id="miembro"
                    name="miembro"
                    className={
                        errores.miembro
                            ? 'form-select is-invalid'
                            : 'form-select'
                    }
                    value={datos.miembro}
                    onChange={cambiar}
                    required
                >
                    <option value="">Seleccione un miembro...</option>

                    {MIEMBROS.map((opcion) => (
                        <option key={opcion} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>

                {errores.miembro && (
                    <div className="invalid-feedback">
                        {errores.miembro}
                    </div>
                )}
            </div>

            {/* botón envío */}
            <button type="submit" className="btn btn-primary w-100">
                Agregar libro
            </button>

        </form>
    );
}

export default FormularioLibro;