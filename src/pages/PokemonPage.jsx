// SRC/PAGES/POKEMONPAGE.JSX
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Importa useNavigate
import "./PokemonPage.css"; // Estilos específicos del componente
import { PokemonContext } from "../context/pokemon.context";

function PokemonPage() {
    const { fetchPokemon } = useContext(PokemonContext);
    const { id } = useParams(); // Extrae el id actual de la URL
    const navigate = useNavigate(); // Hook para cambiar de ruta
    const [pokemon, setPokemon] = useState(null); // Estado para almacenar la información del Pokémon.
    const [error, setError] = useState(null); // variable reactiva por si hay algun error en el fetch

    // useEffect se ejecuta cada vez que cambia el valor de 'id'
    useEffect(() => {
        getPokemon(id);
    }, [id]); // Se ejecuta cada vez que el id cambia

    // Función para obtener los datos de un Pokémon desde la API de PokeAPI
    const getPokemon = async (id) => {
        try {
            const pokemon = await fetchPokemon(id);
            setPokemon(pokemon);
        } catch (e) {
            setError(e); // Si ocurre un error, lo guardamos en el estado 'error'
        }
    };

    // Función para navegar al Pokémon anterior
    const goToPrevious = () => {
        const prevId = Math.max(1, parseInt(id) - 1); // Evita IDs menores a 1
        navigate(`/pokemons/${prevId}`); // Navega al Pokémon anterior
    };

    // Función para navegar al siguiente Pokémon
    const goToNext = () => {
        const nextId = parseInt(id) + 1; // Incrementa el ID
        navigate(`/pokemons/${nextId}`); // Navega al Pokémon siguiente
    };

    return (
        <section id="pokemon-page">
            {error ? (
                // Si ocurre un error, mostramos el mensaje de error
                <div>
                    <h2>No se ha encontrado ningún Pokémon</h2>
                    <Link to="/pokemons">Volver a la lista de pokémons</Link>
                </div>
            ) : pokemon ? (
                // Si hay datos del Pokémon, los mostramos
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
                // Si no hay datos de Pokémon y no hay error, mostramos "Cargando..."
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

