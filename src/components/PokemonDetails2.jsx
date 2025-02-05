// SRC/COMPONENTS/POKEMONDETAILS2.JSX
import React from "react";
import "./PokemonDetails.css";
import { Link } from "react-router-dom";



function PokemonDetails2(props) {

    const { pokemon, likes, increaseLikes } = props;

    if (!pokemon || !pokemon.sprites) {
        return <p>Cargando...</p>;
    }

    return (
        <section className="selected-pokemon">
            <div>
                <h3>Pokemon 2</h3>
                <h3>
                    Likes: {likes}{" "}
                    <button onClick={increaseLikes} className="like-btn">❤️</button>
                </h3>
                <Link to={`/pokemons/${pokemon.id}`} className="details-btn">
                    🔍 Ver Detalles
                </Link>
            </div>

            <div className="pokemon-container">
                <h2 className="text">{pokemon.name}</h2>
                <img
                    src={pokemon.sprites.front_default}
                    alt="pokemon img"
                    className="pokemon-img-details"
                />
                <h3 className="text">HP: {pokemon.stats[0].base_stat} </h3>
            </div>

        </section>
    );
}

export default PokemonDetails2;
