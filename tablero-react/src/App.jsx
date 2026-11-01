// App.jsx

import { useState } from 'react';

// Datos iniciales
import { ESTADOS_LECTURA, librosIniciales } from './data/libros.js';

// Componentes de la aplicación
import Pagina from './componentes/layout/Pagina.jsx';
import Panel from './componentes/comunes/Panel.jsx';
import Filtros from './componentes/filtros/Filtros.jsx';
import Resumen from './componentes/resumen/Resumen.jsx';
import ListaLibros from './componentes/libros/ListaLibros.jsx';
import FormularioLibro from './componentes/formulario/FormularioLibro.jsx';

// Función para cambiar el estado de lectura
import { siguienteEstado } from './utils/libros.js';

function App() {
  const [libros, setLibros] = useState(librosIniciales);

  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const [filtroMiembro, setFiltroMiembro] = useState('Todos');


  // libros que coinciden con los filtros
  const librosFiltrados = libros.filter((libro) => {
    const coincideEstado =
      filtroEstado === 'Todos' || libro.estado === filtroEstado;

    const coincideMiembro =
      filtroMiembro === 'Todos' || libro.miembro === filtroMiembro;

    return coincideEstado && coincideMiembro;
  });

  // resumen de libros por estado
  const conteos = ESTADOS_LECTURA.map((estado) => ({
    estado,
    cantidad: libros.filter((libro) => libro.estado === estado).length,
  }));

  // agregar un libro
  function agregarLibro(datosLibro) {
    const nuevoId = Math.max(0, ...libros.map((libro) => libro.id)) + 1;

    const libroNuevo = {
      ...datosLibro,
      id: nuevoId,
      estado: ESTADOS_LECTURA[0],
    };

    setLibros([...libros, libroNuevo]);
  }

  // cambiar estado de un libro
  function cambiarEstado(idLibro) {
    const librosActualizados = libros.map((libro) => {
      if (libro.id === idLibro) {
        return {
          ...libro,
          estado: siguienteEstado(libro.estado),
        };
      }

      return libro;
    });

    setLibros(librosActualizados);
  }

  // quitar un libro
  function quitarLibro(idLibro) {
    const librosActualizados = libros.filter(
      (libro) => libro.id !== idLibro
    );

    setLibros(librosActualizados);
  }

  return (
    <Pagina>
      <div className="row g-4">

        {/* Resumen y filtros: componentes hermanos */}
        <div className="col-12">
          <Panel id="panel-resumen-filtros" titulo="Explora las lecturas">
            <div className="row g-4 align-items-start">

              <Resumen conteos={conteos} />

              <Filtros
                estado={filtroEstado}
                miembro={filtroMiembro}
                onCambiarEstado={setFiltroEstado}
                onCambiarMiembro={setFiltroMiembro}
              />

            </div>
          </Panel>
        </div>

        {/* Lista de libros */}
        <div className="col-12">
          <Panel id="libros" titulo={`Libros del club (${libros.length})`}>
            <ListaLibros
              libros={librosFiltrados}
              onCambiarEstado={cambiarEstado}
              onQuitar={quitarLibro}
            />
          </Panel>
        </div>

        {/* Formulario para agregar libros */}
        <div className="col-12">
          <Panel id="agregar-libro" titulo="Proponer un libro">
            <FormularioLibro onAgregar={agregarLibro} />
          </Panel>
        </div>

      </div>
    </Pagina>
  );
}

export default App;