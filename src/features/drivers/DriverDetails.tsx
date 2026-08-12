import { Link, useParams } from "react-router";

const DriverDetails = () => {
  const { driverId } = useParams();

  return (
    <section className="temporary-page">
      <span className="temporary-page-label">Perfil do piloto</span>
      <h1>{driverId}</h1>
      <p>Esta rota dinâmica exibirá os dados do piloto selecionado.</p>
      <Link className="temporary-page-link" to="/pilotos">
        Voltar para pilotos
      </Link>
    </section>
  );
};

export default DriverDetails;
