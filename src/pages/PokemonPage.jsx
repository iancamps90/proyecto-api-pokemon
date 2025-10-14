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
            {/* Botón de volver */}
            <div className="back-navigation">
                <button 
                    onClick={() => navigate('/pokemons')} 
                    className="back-button"
                    title="Volver a la lista de Pokémon"
                >
                    ← Volver a la lista
                </button>
            </div>

            {error ? (
                // Si ocurre un error, mostramos el mensaje de error
                <div className="error-container">
                    <h2>❌ No se ha encontrado ningún Pokémon</h2>
                    <p>El Pokémon con ID {id} no existe.</p>
                    <Link to="/pokemons" className="back-link">
                        🏠 Volver a la lista de Pokémon
                    </Link>
                </div>
            ) : pokemon ? (
                // Si hay datos del Pokémon, los mostramos
                <div className="pokemon-details">
                    <div className="pokemon-header">
                        <h2>{pokemon.name.toUpperCase()}</h2>
                        <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
                    </div>
                    
                    <div className="pokemon-image-container">
                        <img
                            src={pokemon.sprites.front_default}
                            alt={`${pokemon.name} imagen`}
                            className="pokemon-img"
                        />
                        {pokemon.sprites.back_default && (
                            <img
                                src={pokemon.sprites.back_default}
                                alt={`${pokemon.name} espalda`}
                                className="pokemon-img back"
                            />
                        )}
                    </div>

                    <div className="pokemon-info">
                        <div className="types">
                            <h3>Tipos:</h3>
                            {pokemon.types.map((type, index) => (
                                <span key={index} className={`type-badge ${type.type.name}`}>
                                    {type.type.name.toUpperCase()}
                                </span>
                            ))}
                        </div>

                        <div className="stats">
                            <h3>Estadísticas:</h3>
                            {pokemon.stats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <span className="stat-name">{stat.stat.name.replace('-', ' ').toUpperCase()}:</span>
                                    <div className="stat-bar">
                                        <div 
                                            className="stat-fill" 
                                            style={{ width: `${Math.min(100, (stat.base_stat / 150) * 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="stat-value">{stat.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // Si no hay datos de Pokémon y no hay error, mostramos "Cargando..."
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h2>Cargando Pokémon...</h2>
                </div>
            )}

            {/* Botones de navegación */}
            {pokemon && (
                <div className="link-buttons">
                    <button onClick={goToPrevious} className="nav-button">
                        ⬅️ Anterior
                    </button>
                    <Link to="/pokemons" className="nav-button home-button">
                        🏠 Lista
                    </Link>
                    <button onClick={goToNext} className="nav-button">
                        Siguiente ➡️
                    </button>
                </div>
            )}
        </section>
    );
}

export default PokemonPage;

