// SRC/APP.JSX
import { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy Loading para optimizar la carga
const PokemonsPage = lazy(() => import("./pages/PokemonsPage"));
const PokemonPage = lazy(() => import("./pages/PokemonPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Recuperar modo oscuro
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode); // Guardar preferencia
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* Botón para cambiar el modo oscuro */}
      <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-btn">
        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
      </button>

      <Suspense fallback={<h1>Cargando...</h1>}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/pokemons" element={<PokemonsPage />} />
          <Route path="/pokemons/:id" element={<PokemonPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

