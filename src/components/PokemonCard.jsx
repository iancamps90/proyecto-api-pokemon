// SRC/COMPONENTS/POKEMONCARD.JSX
import { motion } from "framer-motion";
import "./PokemonCard.css";
import React from "react";

function PokemonCard({ pokemon, onClick }) {
    if (!pokemon || !pokemon.id) {
        return <p className="loading">Cargando...</p>;
    }

    // Obtener el tipo principal para el color dinámico
    const primaryType = pokemon.types[0]?.type.name || 'normal';
    const typeString = pokemon.types.map(t => t.type.name).join(' ');

    return (
        <motion.li
            className="pokemon-card"
            data-type={typeString}
            onClick={onClick}
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.05,
                transition: { duration: 0.3 }
            }}
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



