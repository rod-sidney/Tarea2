function App() {
  return (
    <div className="container py-4 py-lg-5">
      <header className="mb-4 mb-lg-5">
        <p className="text-primary text-uppercase fw-semibold small mb-2">
          Club de lectura
        </p>

        <h1 className="display-5 fw-bold mb-3">
          Estantería Común
        </h1>

        <p className="lead text-secondary mb-0">
          Organiza los libros del club y consulta su progreso de lectura.
        </p>
      </header>

      <main>
        <section
          className="card shadow-sm mb-4"
          aria-labelledby="tituloResumen"
        >
          <div className="card-body p-4">
            <h2 id="tituloResumen" className="h5 mb-3">
              Resumen de lecturas
            </h2>

            <p className="text-secondary mb-0">
              Aquí se mostrará la cantidad de libros en cada estado.
            </p>
          </div>
        </section>

        <div className="row g-4">
          <aside className="col-12 col-lg-4">
            <section
              className="card h-100"
              aria-labelledby="tituloFiltros"
            >
              <div className="card-body p-4">
                <h2 id="tituloFiltros" className="h5 mb-3">
                  Filtros
                </h2>

                <p className="text-secondary mb-0">
                  Aquí se podrá filtrar por estado de lectura y por miembro.
                </p>
              </div>
            </section>
          </aside>

          <div className="col-12 col-lg-8">
            <section
              className="card h-100"
              aria-labelledby="tituloLibros"
            >
              <div className="card-body p-4">
                <h2 id="tituloLibros" className="h5 mb-3">
                  Libros del club
                </h2>

                <p className="text-secondary mb-0">
                  Aquí aparecerá la lista de libros propuestos por los miembros.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-5 pt-3 border-top">
        <p className="small text-secondary mb-0">
          Estantería Común · Tablero de lecturas del club
        </p>
      </footer>
    </div>
  );
}

export default App;