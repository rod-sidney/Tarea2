// Panel.jsx

function Panel({ id, titulo, children }) {
    const tituloId = `${id}-titulo`;

    return (
        <section
            id={id}
            className="section-block"
            aria-labelledby={tituloId}
        >
            <div className="section-heading">
                <div>
                    <h2 id={tituloId} className="h3 mb-1">
                        {titulo}
                    </h2>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-3 p-md-4">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default Panel;