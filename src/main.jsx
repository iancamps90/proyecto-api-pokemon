// SRC/MAIN.JSX
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PokemonProviderWrapper } from "./context/pokemon.context.jsx";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <PokemonProviderWrapper>
        <App />
      </PokemonProviderWrapper>
    </HashRouter>
  </StrictMode>
);
