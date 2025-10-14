// SRC/PAGES/POKEMONSPAGE.JSX
import { useState, useEffect } from "react";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import PokemonDetails2 from "../components/PokemonDetails2";
import DetailsWrapper from "../hoc/DetailsWrapper";
import CompactFilters from "../components/CompactFilters";
import TeamGenerator from "../components/TeamGenerator";
import ShinyDetector from "../components/ShinyDetector";
import BattleSimulator from "../components/BattleSimulator";
import SpecialAbilities from "../components/SpecialAbilities";
import EvolutionChain from "../components/EvolutionChain";
import { useFavorites } from "../context/FavoritesContext";
import { PokemonContext } from "../context/pokemon.context";
import { useContext } from "react";
import toast from 'react-hot-toast';

function PokemonsPage() {
    // Variables de estado para los Pokémon seleccionados
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedPokemon2, setSelectedPokemon2] = useState(null);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [activeTab, setActiveTab] = useState('list'); // 'list', 'team', 'shiny', 'battle', 'abilities', 'evolution'
    const [searchTerm, setSearchTerm] = useState('');

    // Contextos
    const { pokemons } = useContext(PokemonContext);
    const { toggleFavorite, isFavorite, incrementViews } = useFavorites();

    // Función que devuelve la lógica de detalles del primer Pokémon
    const getDetails1 = (likes, increaseLikes) => {
        return (
            <PokemonDetails
                pokemon={selectedPokemon}
                likes={likes}
                increaseLikes={increaseLikes}
            />
        );
    };

    // Función que devuelve la lógica de detalles del segundo Pokémon
    const getDetails2 = (likes, increaseLikes) => {
        return (
            <PokemonDetails2
                pokemon={selectedPokemon2}
                likes={likes}
                increaseLikes={increaseLikes}
            />
        );
    };

    // Inicializar lista filtrada
    useEffect(() => {
        setFilteredPokemons(pokemons);
    }, [pokemons]);

    // Manejar selección de Pokémon con notificaciones
    const handlePokemonSelect = (pokemon, slot = 1) => {
        if (slot === 1) {
            setSelectedPokemon(pokemon);
            incrementViews();
            toast.success(`¡Has seleccionado a ${pokemon.name}!`);
        } else {
            setSelectedPokemon2(pokemon);
            incrementViews();
            toast.success(`¡Has seleccionado a ${pokemon.name} para el slot 2!`);
        }
    };

    // Manejar Shiny encontrado
    const handleShinyFound = (pokemon) => {
        toast.success(`🎉 ¡INCREÍBLE! ¡Has encontrado un ${pokemon.name} SHINY! 🎉`, {
            duration: 6000,
            style: {
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                color: '#2c3e50',
                fontSize: '1.1rem',
                fontWeight: 'bold'
            }
        });
    };

    return (
        <main className='main'>
            {/* Navegación por pestañas */}
            <div className="tabs-navigation">
                <button 
                    className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                >
                    📋 Lista
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
                    onClick={() => setActiveTab('team')}
                >
                    🎮 Equipos
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'shiny' ? 'active' : ''}`}
                    onClick={() => setActiveTab('shiny')}
                >
                    ✨ Shiny
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'battle' ? 'active' : ''}`}
                    onClick={() => setActiveTab('battle')}
                >
                    ⚔️ Batalla
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'abilities' ? 'active' : ''}`}
                    onClick={() => setActiveTab('abilities')}
                >
                    🌟 Habilidades
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'evolution' ? 'active' : ''}`}
                    onClick={() => setActiveTab('evolution')}
                >
                    🔄 Evolución
                </button>
            </div>

            {/* Contenido según pestaña activa */}
            {activeTab === 'list' && (
                <>
                    <h2>Pokémons Seleccionados</h2>

                    {/* Mostrar detalles del Pokémon 1 si está seleccionado */}
                    {selectedPokemon && <DetailsWrapper render={getDetails1} />}

                    {/* Mostrar detalles del Pokémon 2 si está seleccionado */}
                    {selectedPokemon2 && <DetailsWrapper render={getDetails2} />}

                    <CompactFilters 
                        pokemons={pokemons}
                        onFilteredPokemons={setFilteredPokemons}
                        onSearch={setSearchTerm}
                    />

                    <h2>Lista de Pokémons</h2>

                    {/* Pasar funciones de selección como props a la lista */}
                    <PokemonList
                        pokemons={filteredPokemons}
                        selectPokemon={(pokemon) => handlePokemonSelect(pokemon, 1)}
                        selectPokemon2={(pokemon) => handlePokemonSelect(pokemon, 2)}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={isFavorite}
                    />
                </>
            )}

            {activeTab === 'team' && (
                <TeamGenerator pokemons={pokemons} />
            )}

            {activeTab === 'shiny' && (
                <ShinyDetector 
                    pokemon={selectedPokemon} 
                    onShinyFound={handleShinyFound}
                />
            )}

            {activeTab === 'battle' && (
                <BattleSimulator 
                    pokemon1={selectedPokemon}
                    pokemon2={selectedPokemon2}
                    onBattleEnd={(winner) => {
                        toast.success(`🏆 ¡${winner} ha ganado la batalla! 🏆`, {
                            duration: 5000,
                            style: {
                                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                color: '#2c3e50',
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }
                        });
                    }}
                />
            )}

            {activeTab === 'abilities' && (
                <SpecialAbilities pokemon={selectedPokemon} />
            )}

            {activeTab === 'evolution' && (
                <EvolutionChain pokemon={selectedPokemon} />
            )}
        </main>
    );
}

export default PokemonsPage;

