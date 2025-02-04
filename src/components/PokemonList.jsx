// SRC/COMPONENTS/POKEMONLIST.JSX
import { useContext, useEffect, useState, useMemo } from "react";
import PokemonCard from "./PokemonCard";
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import GetForm from "./GetForm";
import { PokemonContext } from "../context/pokemon.context";
import Modal from "react-modal";
import PokemonDetails from "./PokemonDetails";
import "./PokemonList.css";

// Configuración para react-modal
Modal.setAppElement("#root");

function PokemonList() {
    const { pokemons, setPokemons, fetchPokemon } = useContext(PokemonContext);
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("Todos");
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        getPokemons(1, 9);
    }, []);

    const getPokemons = async (from, to) => {
        try {
            const pkmArr = [];
            for (let i = from; i <= to; i++) {
                const pokemon = await fetchPokemon(i);
                pkmArr.push(pokemon);
            }
            setPokemons(pkmArr);
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

    // 🔍 Filtrar Pokémon según la búsqueda y el tipo
    const filteredPokemons = useMemo(() => {
        return pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedType === "Todos" ||
                (pokemon.types && pokemon.types.some(t => t.type.name === selectedType))) // ← Asegura que la propiedad existe
        );
    }, [pokemons, search, selectedType]);


    return (
        <div className="container mt-4">
            {/* 🔍 Barra de Búsqueda */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="🔍 Buscar Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* 🎯 Filtro por Tipo */}
            <select
                className="form-select mb-3"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="Todos">Todos</option>
                <option value="fire">🔥 Fuego</option>
                <option value="water">💧 Agua</option>
                <option value="grass">🌿 Planta</option>
                <option value="electric">⚡ Eléctrico</option>
                <option value="psychic">🔮 Psíquico</option>
            </select>

            {/* 📌 Formulario para elegir Pokémon */}
            <GetForm getPokemons={getPokemons} />

            {/* 🎨 Grid de Pokémon */}
            <div className="row">
                {filteredPokemons.map((pokemon) => (
                    <div key={pokemon.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <PokemonCard
                            pokemon={pokemon}
                            onClick={() => openModal(pokemon)}  // ← Ahora sí funciona
                        />
                    </div>
                ))}
            </div>

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


