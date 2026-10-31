//Resumen.jsx

function Resumen({ conteos }) {
    return (
        <div className="row text-center">

            {conteos.map((conteo) => (
                /*Contenido de cada columna*/
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
    );
}

export default Resumen;