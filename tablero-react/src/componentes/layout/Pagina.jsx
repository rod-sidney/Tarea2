// Página.jsx

import Encabezado from './Encabezado.jsx';
import Hero from './Hero.jsx';
import PiePagina from './PiePagina.jsx';

function Pagina({ children }) {
    return (
        <>
            <Encabezado />

            <main id="inicio" className="container py-4 py-lg-5">
                <Hero />

                {children}
            </main>

            <PiePagina />
        </>
    );
}

export default Pagina;