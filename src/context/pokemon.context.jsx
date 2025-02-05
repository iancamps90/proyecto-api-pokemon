// SRC/CONTEXT/POKEMON.CONTEXT.JSX
import React, { createContext, useState, useContext } from "react";

const PokemonContext = createContext();

function PokemonProviderWrapper(props) {
    const [pokemons, setPokemons] = useState([]);

    const fetchPokemon = async (index) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
            const data = await response.json();

            // ⏳ Evitar Pokémon duplicados en la lista
            setPokemons((prev) => {
                const existingIds = prev.map(p => p.id);
                if (!existingIds.includes(data.id)) {
                    return [...prev, data].sort((a, b) => a.id - b.id); // Ordena por ID
                }
                return prev;
            });

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

export { PokemonContext, PokemonProviderWrapper };

