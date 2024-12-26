import { useEffect, useState } from "react"



function PokemonCard() {

    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/1")
            .then((response) => response.json())
        .then((data) => console.log(data));
        
        
    }, [])



  return (
      <li className="pokemon-card">
        <h2 className="pokemon-name">{} </h2>

          
    </li>
  )
}

export default PokemonCard
