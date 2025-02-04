// SRC/PAGES/POKEMONSPAGE.JSX
import { useContext, useState } from "react";
import { UserContext } from "../context/user.context"; // Importa el contexto correcto
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import PokemonDetails2 from "../components/PokemonDetails2";
import DetailsWrapper from "../hoc/DetailsWrapper";
import { Navigate } from "react-router-dom";

function PokemonsPage() {

    const {user} = useContext(UserContext);

    // Validación de usuario logueado
    if (!user.isLoggedIn) return < Navigate to={"/error"} />;

    // Variables de estado para los Pokémon seleccionados
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedPokemon2, setSelectedPokemon2] = useState(null);

    // Función que devuelve la lógica de detalles del primer Pokémon
    const getDetails1 = (likes, increaseLikes) => {
        return (
            <PokemonDetails
                pokemon={selectedPokemon}
                likes={likes}
                increaseLikes={increaseLikes}
            ></PokemonDetails>
        );
    };

    // Función que devuelve la lógica de detalles del segundo Pokémon
    const getDetails2 = (likes, increaseLikes) => {
        return (
            <PokemonDetails2
                pokemon={selectedPokemon2}
                likes={likes}
                increaseLikes={increaseLikes}
            ></PokemonDetails2>
        );
    };

    return (

        <main className='main'>
            <h2>Pokemons Seleccionados</h2>

            {/* Mostrar detalles del Pokémon 1 si está seleccionado */}
            {selectedPokemon && (
                <DetailsWrapper render={getDetails1}></DetailsWrapper>
            )}

            {/* Mostrar detalles del Pokémon 2 si está seleccionado */}
            {selectedPokemon2 && (
                <DetailsWrapper render={getDetails2}></DetailsWrapper>
            )}

            <h2>Lista de Pokemons</h2>

            {/* Pasar funciones de selección como props a la lista */}
            <PokemonList
                selectPokemon={setSelectedPokemon}
                selectPokemon2={setSelectedPokemon2}
            />
        </main>
    );
    
    



}

export default PokemonsPage
