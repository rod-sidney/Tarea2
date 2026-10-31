//ListaLibros.jsx

import TarjetaLibro from './TarjetaLibro.jsx';

function ListaLibros({ libros, onCambiarEstado, onQuitar }) {
    // Si no hay libros que mostrar, enseña mensaje
    if (libros.length === 0) {
        return (
            <div className="alert alert-info mb-0" role="status">
                Ningún libro coincide con los filtros.
            </div>
        );
    }

    return (
        <div className="book-results-grid">

            {libros.map((libro) => (
                <TarjetaLibro
                    key={libro.id}
                    libro={libro}
                    onCambiarEstado={onCambiarEstado}
                    onQuitar={onQuitar}
                />
            ))}

        </div>
    );
}

export default ListaLibros;