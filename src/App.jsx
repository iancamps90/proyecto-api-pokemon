// SRC/APP.JSX
import { Suspense, useState, useEffect } from "react";
import "./App.css";
import "./styles/MobileOptimizations.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from 'react-hot-toast';

import PokemonsPage from "./pages/PokemonsPage";
import PokemonPage from "./pages/PokemonPage";
import ErrorPage from "./pages/ErrorPage";
import { PokemonProviderWrapper } from "./context/pokemon.context";
import { FavoritesProvider } from "./context/FavoritesContext";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";
import { useSound } from "./hooks/useSound";


function App() {
  const { currentTheme } = useTheme();
  const { isEnabled: soundEnabled, toggleSound } = useSound();
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Recuperar modo oscuro
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode); // Guardar preferencia
  }, [darkMode]);


  return (
    <FavoritesProvider>
      <PokemonProviderWrapper>
                <div className="app-container">
                  <div className="app-controls">
                    <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-btn">
                      {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
                    </button>
                    
                    <ThemeSelector />
                    
                    <button onClick={toggleSound} className="sound-btn">
                      {soundEnabled ? "🔊" : "🔇"}
                    </button>
                  </div>

          <Suspense fallback={
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h2>Cargando Pokédex...</h2>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pokemons" element={<PokemonsPage />} />
              <Route path="/pokemons/:id" element={<PokemonPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: darkMode ? '#2c3e50' : '#ffffff',
                color: darkMode ? '#ffffff' : '#2c3e50',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          />
        </div>
      </PokemonProviderWrapper>
    </FavoritesProvider>
  );
}

export default App;

