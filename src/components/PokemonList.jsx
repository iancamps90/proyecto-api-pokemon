// SRC/COMPONENTS/POKEMONLIST.JSX
import { useContext, useEffect, useMemo, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";
import GetForm from "./GetForm";
import { PokemonContext } from "../context/pokemon.context";



function PokemonList(props) {

    const {pokemons, setPokemons, fetchPokemon} = useContext(PokemonContext);

    useEffect(() => {
        getPokemons(1, 9);
    },[])

    

    const getPokemons = async (from, to) => {
        try {
            const pkmArr = [];

            for (let i = from; i <= to; i++) {
                const pokemon = await fetchPokemon(i);
                pkmArr.push(pokemon);
            }

            setPokemons(pkmArr); // Actualiza el estado después de cargar todos los datos
        } catch (error) {
            console.error("Error fetching Pokémon:", error); // Manejo de errores
        }
    };

    // funcion indicar la seleccion de pokemon
    const pokemonCards = useMemo(
        () =>
            pokemons.map((pokemon) => { //obtenemos todas las tarjetas a traves del array de pokemon
        return (
            <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                selectPokemon={props.selectPokemon}
                selectPokemon2={props.selectPokemon2}
            ></PokemonCard>
        );
            }),
        [pokemons] // segundo argumento
    );  


    return (

        <div>
            <GetForm getPokemons = {getPokemons}></GetForm>
            <ul className="pokemon-list">
                {pokemonCards}
            </ul>
        </div>
    


)}

export default PokemonList
