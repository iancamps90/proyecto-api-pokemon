import { useState } from "react"; 

/**
 * Higher-Order Component (HOC) para envolver detalles con funcionalidad adicional.
 * @param {React.ComponentType} DetailsComponent - Componente a envolver.
 * @returns {React.FC} Componente mejorado con likes.
 */


function DetailsWrapper(DetailsComponent) {

    function NewComponent(props) {

        const [likes, setLikes] = useState(0);

        const increaseLikes = () => {
            setLikes(likes + 1);
        }
        
        return (
            <DetailsComponent
                pokemon={props.pokemon}
                likes={likes}
                increaseLikes={increaseLikes}
            ></DetailsComponent>
        );
    }

    return NewComponent;
}

export default DetailsWrapper;