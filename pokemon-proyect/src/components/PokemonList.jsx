import { useContext, useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";
import GetForm from "./GetForm";
import { PokemonContext } from "../context/pokemon.context";



function PokemonList(props) {

    const {pokemons, setPokemons} = useContext(PokemonContext);

    useEffect(() => {
        getPokemons(1, 30);
    },[])

    const fetchPokemon = async (index) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
        const data = await response.json();
        console.log(data); // Verifica la estructura del objeto pokemon
        return data;
    }

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


    const pokemonCards = pokemons.map((pokemon) => {
        return <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            selectPokemon={props.selectPokemon}
        ></PokemonCard>
    })


    return (

        <div>
            <GetForm getPokemons= {getPokemons}></GetForm>
            <ul className="pokemon-list">
                {pokemonCards}
            </ul>
        </div>
    


)}

export default PokemonList
