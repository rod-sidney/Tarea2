// Hero.jsx

function Hero() {
    return (
        <section
            className="app-hero text-center mb-4 mb-lg-5"
            aria-labelledby="titulo-principal"
        >
            <p className="app-hero__eyebrow mb-2">
                Club comunitario de lectura
            </p>

            <h1 id="titulo-principal" className="app-hero__title mb-3">
                Cada libro abre una conversación
            </h1>

            <p className="app-hero__description mb-0">
                Organiza las lecturas del club, descubre quién propuso cada libro
                y acompaña su progreso desde que comienza hasta que se termina.
            </p>
        </section>
    );
}

export default Hero;