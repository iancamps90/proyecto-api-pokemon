import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";
import GetForm from "./GetForm";



function PokemonList(props) {

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons(1, 30);
    },[])

    const fetchPokemon = async (index) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
    const data = await response.json();
        return data;
    }

    const getPokemons = async (from, to) => {
        const pkmArr = [];

        for (let i = from; i <= to; i++) {
            const pokemon = await fetchPokemon(i);
            pkmArr.push(pokemon);
        }

        setPokemons(pkmArr);
    }

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
