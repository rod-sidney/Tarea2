//TarjetaLibro.jsx

const clasesEstado = {
    Pendiente: 'lectura-estado--pendiente',
    Leyendo: 'lectura-estado--leyendo',
    Leído: 'lectura-estado--leido',
};

function TarjetaLibro({ libro, onCambiarEstado, onQuitar }) {
    return (
        <article className="card book-result-card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">

                {/* Información principal del libro */}
                <div className="mb-3">
                    <h3 className="h5 mb-2">
                        {libro.titulo}
                    </h3>

                    <p className="text-secondary mb-0">
                        {libro.autores.join(', ')}
                    </p>
                </div>

                {/* Información bibliográfica */}
                <dl className="row small mb-3">
                    <dt className="col-6">Año de publicación</dt>
                    <dd className="col-6 text-end">
                        {libro.anioPublicacion}
                    </dd>

                    <dt className="col-6">Páginas</dt>
                    <dd className="col-6 text-end">
                        {libro.paginas}
                    </dd>

                    <dt className="col-6">Género</dt>
                    <dd className="col-6 text-end">
                        {libro.genero}
                    </dd>

                    <dt className="col-6">Propuesto por</dt>
                    <dd className="col-6 text-end">
                        {libro.miembro}
                    </dd>
                </dl>

                {/* Estado actual */}
                <div className="mb-3">
                    <span
                        className={`lectura-estado ${clasesEstado[libro.estado]}`}
                    >
                        {libro.estado}
                    </span>
                </div>

                {/* Botones de acciones */}
                <div className="d-flex flex-wrap gap-2 mt-auto">
                    <button
                        type="button"
                        className="btn btn-primary flex-grow-1"
                        onClick={() => onCambiarEstado(libro.id)}
                        aria-label={`Cambiar estado de ${libro.titulo}`}
                    >
                        Cambiar estado
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => onQuitar(libro.id)}
                        aria-label={`Quitar ${libro.titulo}`}
                    >
                        Quitar
                    </button>
                </div>

            </div>
        </article>
    );
}

export default TarjetaLibro;