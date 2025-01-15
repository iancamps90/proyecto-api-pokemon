import { lazy, Suspense, useState } from 'react'  // Importamos 'lazy' para cargar los componentes de forma perezosa y 'Suspense' para manejar el estado de carga
import './App.css'
import { Route, Routes } from 'react-router-dom'; // Importamos los componentes necesarios para manejar las rutas en React Router
import HomePage from './pages/HomePage';
//import PokemonsPage from './pages/PokemonsPage';
//import PokemonPage from './pages/PokemonPage';
//import ErrorPage from './pages/ErrorPage';

// Importamos las páginas de forma perezosa (lazy loading)
// Esto solo cargará las páginas cuando realmente se necesiten, optimizando el rendimiento
const PokemonsPage = lazy(() => import("./pages/PokemonsPage"));
const PokemonPage = lazy(() => import("./pages/PokemonPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));



function App() {
  return (
    // Suspense permite mostrar un componente mientras esperamos que se cargue el componente perezoso (lazy-loaded)
    <Suspense fallback= {<h1>Cargando...</h1>}> 
      <Routes> {/* Rutas de la aplicación */}
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemons" element={<PokemonsPage />} />
        <Route path="/pokemons/:id" element={<PokemonPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
    
  );
  
}

export default App;
