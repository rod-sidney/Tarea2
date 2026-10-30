// Encabezado.jsx

function Encabezado() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark bg-primary py-3"
            aria-label="Navegación principal"
        >
            <div className="container">
                <a className="navbar-brand fw-bold" href="#inicio">
                    Estantería Común
                </a>

                <div className="navbar-nav flex-row flex-wrap gap-2 ms-lg-auto">
                    <a className="nav-link" href="#resumen">
                        Resumen
                    </a>

                    <a className="nav-link" href="#filtros">
                        Filtros
                    </a>

                    <a className="nav-link" href="#libros">
                        Libros
                    </a>

                    <a className="nav-link" href="#agregar-libro">
                        Agregar libro
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Encabezado;