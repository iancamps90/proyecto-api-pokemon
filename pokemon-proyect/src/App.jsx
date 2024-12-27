import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonsPage from './pages/PokemonsPage';
import PokemonPage from './pages/PokemonPage';




function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/pokemons' element={<PokemonsPage />} />
      <Route path='/pokemon/:id' element={<PokemonPage />} />
    </Routes>
  )
  
}

export default App;
