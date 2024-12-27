// import { useEffect, useState } from "react"; // Importamos los hooks necesarios de React
import "./PokemonCard.css"; // Importamos los estilos para la tarjeta de Pokémon


// Componente funcional que recibe las propiedades (props)
function PokemonCard(props) {

    const { pokemon, selectPokemon } = props;

    // Aseguramos que el objeto pokemon y sus propiedades existen antes de intentar renderizarlas
    if (!pokemon || !pokemon.id) {
        return <p className="loading">Loading...</p>; // Si no hay un pokemon o su id, mostramos un mensaje de carga
    }



    return pokemon.id ? (
        <li className="pokemon-card"
        onClick={() => selectPokemon(pokemon)}>
            <h2 className="pokemon-name">{pokemon.name} </h2>
            <img src={pokemon.sprites.front_default}
                alt="pokemon img" className="pokemon-img" />
            <h3 className="text">HP: {pokemon.stats[0].base_stat} </h3>
        </li>
    ) : (
        <p className="loading">Loading...</p>
    );
    
}

export default PokemonCard
