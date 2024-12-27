import { useState } from 'react'
import './App.css'
import './index.css'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails';
import PokemonDetails2 from './components/PokemonDetails2';



function App() {
  // variable pokemon 1 selecionado
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  // variable pokemon 2 selecionado
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);

  return (
    
      <main className='main'>
        <h2>Pokemons Seleccionados</h2>
          
        {/* Mostrar detalles del Pokémon 1 si está seleccionado */}
        {selectedPokemon && (
          <PokemonDetails pokemon={selectedPokemon} />
        )}
          
        {/* Mostrar detalles del Pokémon 2 si está seleccionado */}
        {selectedPokemon2 && (
          <PokemonDetails2 pokemon={selectedPokemon2} />
        )}

        <h2>Lista de Pokemons</h2>

      {/* Pasar funciones de selección como props a la lista */}
      <PokemonList
        selectPokemon={setSelectedPokemon}
        selectPokemon2={setSelectedPokemon2}
      />
    </main>
  );
}

export default App;
