//Filtros.jsx
// Muestra los filtros disponibles
// No guarda su propio estado: recibe los valores y las funciones del componente padre

import { ESTADOS_LECTURA, MIEMBROS } from '../../data/libros.js';

function Filtros({
    estado,
    miembro,
    onCambiarEstado,
    onCambiarMiembro
}) {
    return (
        <div
            id="filtros"
            className="col-12 col-lg-7"
            aria-labelledby="titulo-filtros"
        >
            <h3 id="titulo-filtros" className="h5 mb-3">
                Filtrar libros
            </h3>

            <div className="row g-3">

                {/* filtro por estado */}
                <div className="col-12 col-md-6">
                    <label htmlFor="filtro-estado" className="form-label">
                        Estado de lectura
                    </label>

                    <select
                        id="filtro-estado"
                        className="form-select"
                        value={estado}
                        onChange={(event) =>
                            onCambiarEstado(event.target.value)
                        }
                    >
                        <option value="Todos">Todos los estados</option>

                        {ESTADOS_LECTURA.map((opcion) => (
                            <option key={opcion} value={opcion}>
                                {opcion}
                            </option>
                        ))}
                    </select>
                </div>

                {/* filtro por miembro */}
                <div className="col-12 col-md-6">
                    <label htmlFor="filtro-miembro" className="form-label">
                        Propuesto por
                    </label>

                    <select
                        id="filtro-miembro"
                        className="form-select"
                        value={miembro}
                        onChange={(event) =>
                            onCambiarMiembro(event.target.value)
                        }
                    >
                        <option value="Todos">Todos los miembros</option>

                        {MIEMBROS.map((opcion) => (
                            <option key={opcion} value={opcion}>
                                {opcion}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
}

export default Filtros;