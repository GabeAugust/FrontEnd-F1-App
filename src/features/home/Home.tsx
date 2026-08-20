import Button from '../../components/Button';

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-bottom-fade" />
        <div className="home-page-content">
          <div className="max-w-2xl">
            <h1 className="home-hero-title text-7xl font-bold mb-3">Fórmula 1 <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-f1-red to-red-500 tracking-[0.2rem]">Universe</span></h1>
            <p className="home-subscribe  max-w-lg leading-relaxed mb-5">A enciclopédia definitiva da Fórmula 1. Pilotos, equipes, circuitos e temporadas desde 1950.</p>
            <div className="flex gap-6">
              <Button text="Ver Temporadas" variant="primary" />
              <Button text="Próxima Corrida" variant="secondary" />
            </div>
          </div>


        </div>
          <div className="scroll-indicator" aria-hidden="true">
            <div className="scroll-mouse">
              <div className="scroll-mouse-wheel" />
            </div>
          </div>

      </section>

      <section className="page-section" />
    </>
  );
};

export default Home;
