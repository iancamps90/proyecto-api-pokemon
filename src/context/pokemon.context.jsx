// SRC/CONTEXT/POKEMON.CONTEXT.JSX
import React, { createContext, useState, useContext } from "react";

const PokemonContext = createContext();

function PokemonProviderWrapper(props) {
    const [pokemons, setPokemons] = useState([]);

    const fetchPokemon = async (index) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
            const data = await response.json();
            setPokemons((prev) => [...prev, data]); // 👈 Ahora sí almacena los pokemons
            return data;
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };

    return (
        <PokemonContext.Provider value={{ pokemons, setPokemons, fetchPokemon }}>
            {props.children}
        </PokemonContext.Provider>
    );
}

export { PokemonContext, PokemonProviderWrapper, useContext };

