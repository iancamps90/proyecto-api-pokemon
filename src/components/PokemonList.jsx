// SRC/COMPONENTS/POKEMONLIST.JSX
import { useContext, useEffect, useState, useMemo } from "react";
import PokemonCard from "./PokemonCard";
import GetForm from "./GetForm";  // Mantener esta línea
import { PokemonContext } from "../context/pokemon.context";
import Modal from "react-modal";
import PokemonDetails from "./PokemonDetails";
import "./PokemonList.css";


// Configuración para react-modal
Modal.setAppElement("#root");

function PokemonList({ 
    pokemons = [], 
    selectPokemon, 
    selectPokemon2, 
    onToggleFavorite, 
    isFavorite 
}) {
    const { fetchPokemon } = useContext(PokemonContext);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        // Cargar algunos Pokémon iniciales si no hay ninguno
        if (pokemons.length === 0) {
            getPokemons(1, 20);
        }
    }, []);

    const getPokemons = async (from, to) => {
        try {
            for (let i = from; i <= to; i++) {
                await fetchPokemon(i);
            }
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };


    // Abre el modal con los detalles del Pokémon seleccionado
    const openModal = (pokemon) => {
        setSelectedPokemon(pokemon);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedPokemon(null);
    };




    return (
        <div className="pokemon-list-container">
            {/* 📌 Formulario para cargar más Pokémon */}
            <GetForm getPokemons={getPokemons} />

            {/* 🎨 Grid de Pokémon */}
            <div className="pokemon-grid">
                {pokemons.map((pokemon) => (
                    <div key={pokemon.id} className="pokemon-item">
                        <PokemonCard
                            pokemon={pokemon}
                            onClick={() => {
                                // Seleccionar para slot 1 si no hay ninguno, sino para slot 2
                                if (selectPokemon) {
                                    selectPokemon(pokemon);
                                }
                                openModal(pokemon);
                            }}
                        />
                        <div className="pokemon-actions">
                            <button 
                                onClick={() => selectPokemon2 && selectPokemon2(pokemon)}
                                className="action-btn slot2-btn"
                                title="Seleccionar para slot 2"
                            >
                                🎯 Slot 2
                            </button>
                            {onToggleFavorite && (
                                <button 
                                    onClick={() => onToggleFavorite(pokemon)}
                                    className={`action-btn favorite-btn ${isFavorite && isFavorite(pokemon.id) ? 'active' : ''}`}
                                    title="Añadir a favoritos"
                                >
                                    {isFavorite && isFavorite(pokemon.id) ? '❤️' : '🤍'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {pokemons.length === 0 && (
                <div className="no-pokemon">
                    <p>No hay Pokémon cargados. Usa el formulario para cargar algunos.</p>
                </div>
            )}

            {/* 📌 Modal de Detalles */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Detalles del Pokémon"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
                <button onClick={closeModal} className="modal-close-btn">Cerrar</button>
            </Modal>
        </div>
    );
}

export default PokemonList;


