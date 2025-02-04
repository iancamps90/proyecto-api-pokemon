// SRC/COMPONENTS/POKEMONCARD.JSX
import { motion } from "framer-motion";
import "./PokemonCard.css";
import React from "react";

function PokemonCard({ pokemon, onClick }) {
    if (!pokemon || !pokemon.id) {
        return <p className="loading">Cargando...</p>;
    }

    return (
        <motion.li
            className="pokemon-card"
            onClick={onClick}  // ← Asegurando que el click se pase correctamente
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="pokemon-header">
                <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>
            </div>

            <img
                src={pokemon.sprites.front_default}
                alt="pokemon img"
                className="pokemon-img-list"
            />

            <div className="pokemon-info">
                <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
                <p><strong>HP:</strong> {pokemon.stats[0].base_stat}</p>
            </div>
        </motion.li>
    );
}

export default React.memo(PokemonCard);



