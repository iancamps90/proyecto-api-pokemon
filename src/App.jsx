// SRC/APP.JSX
import {  Suspense, useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";

import PokemonsPage from "./pages/PokemonsPage";
import PokemonPage from "./pages/PokemonPage";
import ErrorPage from "./pages/ErrorPage";


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Recuperar modo oscuro
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode); // Guardar preferencia
  }, [darkMode]);


  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-btn">
        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
      </button>

      <Suspense fallback={<h1>Cargando...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemons" element={<PokemonsPage />} />
          <Route path="/pokemons/:id" element={<PokemonPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

