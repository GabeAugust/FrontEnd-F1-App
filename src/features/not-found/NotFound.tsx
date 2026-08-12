import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className="temporary-page">
      <span className="temporary-page-label">Erro 404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço informado não corresponde a uma página do projeto.</p>
      <Link className="temporary-page-link" to="/">
        Voltar para a Home
      </Link>
    </section>
  );
};

export default NotFound;
