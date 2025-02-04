// SRC/COMPONENTS/GETFORM.JSX
import { useState } from "react";
import "./GetForm.css";

function GetForm(props) {
    const [from, setFrom] = useState(1);
    const [to, setTo] = useState(30);

    const handleFromInput = (e) => setFrom(e.target.value);
    const handleToInput = (e) => setTo(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (from > to) {
            alert("El número 'Desde' no puede ser mayor que 'Hasta'.");
            return;
        }
        props.getPokemons(from, to);
    };

    return (
        <form onSubmit={handleSubmit} className="get-form">
            <fieldset>
                <label htmlFor="from-pokemon">Desde: </label>
                <input type="number" id="from-pokemon" min={1} value={from} onChange={handleFromInput} />
            </fieldset>

            <fieldset>
                <label htmlFor="to-pokemon">Hasta: </label>
                <input type="number" id="to-pokemon" value={to} onChange={handleToInput} />
            </fieldset>

            <button type="submit" className="btn btn-primary">Cargar Pokémon</button>
        </form>
    );
}

export default GetForm;


