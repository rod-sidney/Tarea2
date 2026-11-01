//Resumen.jsx


function Resumen({ conteos }) {
    return (
        <div
            id="resumen"
            className="col-12 col-lg-5"
            aria-labelledby="titulo-resumen"
        >
            <h3 id="titulo-resumen" className="h5 mb-3">
                Resumen de lecturas
            </h3>

            <div className="row text-center">
                {conteos.map((conteo) => (
                    <div className="col-4" key={conteo.estado}>
                        <div className="resumen-numero">
                            {conteo.cantidad}
                        </div>

                        <div className="small text-secondary">
                            {conteo.estado}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Resumen;
