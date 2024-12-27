import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonsPages from './pages/PokemonsPage';




function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/pokemons' element={<PokemonsPages />} />
    </Routes>
  )
  
}

export default App;
