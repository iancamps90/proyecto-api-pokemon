
import { useState } from 'react'
import PokemonList from '../components/PokemonList'
import PokemonDetails from '../components/PokemonDetails';
import PokemonDetails2 from '../components/PokemonDetails2';
import DetailsWrapper from '../hoc/DetailsWrapper';

function PokemonsPage() {

    // variable pokemon 1 selecionado
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    // variable pokemon 2 selecionado
    const [selectedPokemon2, setSelectedPokemon2] = useState(null);

    // funciona que devuelve la logica 
    const getDetails1 = (likes, increaseLikes) => {
        return (
            <PokemonDetails
                pokemon={selectedPokemon}
                likes={likes}
                increaseLikes={increaseLikes}
            ></PokemonDetails>
        );
    };

    const getDetails2 = (likes, increaseLikes) => {
        return (
            <PokemonDetails2
                pokemon={selectedPokemon2}
                likes={likes}
                increaseLikes={increaseLikes}
            ></PokemonDetails2>
        );
    };

    return (

        <main className='main'>
            <h2>Pokemons Seleccionados</h2>

            {/* Mostrar detalles del Pokémon 1 si está seleccionado */}
            {selectedPokemon && (
                <DetailsWrapper render={getDetails1}></DetailsWrapper>
            )}

            {/* Mostrar detalles del Pokémon 2 si está seleccionado */}
            {selectedPokemon2 && (
                <DetailsWrapper render={getDetails2}></DetailsWrapper>
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

export default PokemonsPage