import { useState } from "react"
import "./GetForm.css";



function GetForm(props) {

    const [from, setFrom] = useState(1);
    const [to, setTo] = useState(30);

    const handleFromInput = (e) => {
        setFrom(e.target.value); // Convierte el valor a número
    }

    const handleToInput = (e) => {
        setTo(e.target.value);  // Convierte el valor a número
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación simple para asegurarse de que "from" no sea mayor que "to"
        if (from > to) {
            alert("El número 'From' no puede ser mayor que 'To'.");
            return;
        }

        props.getPokemons(from, to);
    };

return (
    <form onSubmit={handleSubmit} className="get-form">
        <fieldset>
            <label htmlFor="from-pokemon">Form: </label>
            <input
                type="number"
                id="from-pokemon"
                min={1}
                value={from}
                onChange={handleFromInput}
            />
        </fieldset>

        <fieldset>
            <label htmlFor="to-pokemon">To: </label>
            <input
                type="number"
                id="to-pokemon"
                value={to}
                onChange={handleToInput}
            />
        </fieldset>

        <button type="submit" className="submit-btn">Get Pokemon</button>
    </form>

    
)}

export default GetForm
