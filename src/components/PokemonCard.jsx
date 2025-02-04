// SRC/COMPONENTS/POKEMONCARD.JSX
//import { useEffect, useState } from "react"; // Importamos los hooks necesarios de React
import "./PokemonCard.css"; // Importamos los estilos para la tarjeta de Pokémon
import React from "react";


// Componente funcional que recibe las propiedades (props)
function PokemonCard(props) {
    
    const { pokemon, selectPokemon, selectPokemon2 } = props;

    // Aseguramos que el objeto pokemon y sus propiedades existen antes de intentar renderizarlas
    if (!pokemon || !pokemon.id) {
        return <p className="loading">Loading...</p>; // Si no hay un pokemon o su id, mostramos un mensaje de carga
    }



    return pokemon.id ? (
        <li className="pokemon-card"
            onClick={() => selectPokemon(pokemon)} 
            onAuxClick = {() => selectPokemon2(pokemon)}
        >
            <h2 className="pokemon-name">{pokemon.name} </h2>
            <img src={pokemon.sprites.front_default}
                alt="pokemon img" className="pokemon-img-list" />
            
        </li>
    ) : (
        <p className="loading">Loading...</p>
    );
    
}

export default React.memo(PokemonCard);
