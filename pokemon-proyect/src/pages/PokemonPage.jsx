import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import "./PokemonPage.css";

function PokemonPage() {
    const { id } = useParams(); // Extrae el id actual de la URL
    const navigate = useNavigate(); // Hook para cambiar de ruta
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        fetchPokemon(id);
    }, [id]); // Se ejecuta cada vez que el id cambia

    const fetchPokemon = async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
    };

    const goToPrevious = () => {
        const prevId = Math.max(1, parseInt(id) - 1); // Evita IDs menores a 1
        navigate(`/pokemon/${prevId}`); // Navega al Pokémon anterior
    };

    const goToNext = () => {
        const nextId = parseInt(id) + 1; // Incrementa el ID
        navigate(`/pokemon/${nextId}`); // Navega al Pokémon siguiente
    };

    return (
        <section id="pokemon-page">
            {pokemon ? (
                <div>
                    <h2>{pokemon.name.toUpperCase()}</h2>
                    <img
                        src={pokemon.sprites.front_default}
                        alt="pokemon img"
                        className="pokemon-img"
                    />
                    <h3>Vida: {pokemon.stats[0].base_stat}</h3>
                    <h3>Ataque: {pokemon.stats[1].base_stat}</h3>
                    <h3>Defensa: {pokemon.stats[2].base_stat}</h3>
                </div>
            ) : (
                <div>
                    <h2>Cargando...</h2>
                </div>
            )}

            {/* Botones de navegación */}
            <div className="link-buttons">
                <button onClick={goToPrevious} className="nav-button">
                    ⬅️ Anterior
                </button>
                <button onClick={goToNext} className="nav-button">
                    Siguiente ➡️
                </button>
            </div>
        </section>
    );
}

export default PokemonPage;
