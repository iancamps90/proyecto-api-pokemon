// SRC/PAGES/ERRORPAGE.JSX

import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div id="error-page">
      <h1>⚠️ ERROR 404 ⚠️</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <img src="https://media.tenor.com/QEjkS5n2aCgAAAAC/pokemon-pikachu.gif" alt="Pikachu confundido" width="250px" />
      <br />
      <Link to="/" className="error-btn">🏠 Volver al Inicio</Link>
    </div>
  );
}

export default ErrorPage;

