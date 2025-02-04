// SRC/HOC/DETAILSWRAPPER.JSX
import { useState } from "react"; 

/**
 * Higher-Order Component (HOC) para envolver detalles con funcionalidad adicional.
 * @param {React.ComponentType} DetailsComponent - Componente a envolver.
 * @returns {React.FC} Componente mejorado con likes.
 */


function DetailsWrapper(props) {

    const [likes, setLikes] = useState(0);

    const increaseLikes = () => {
        setLikes(likes + 1);
    };

    return <> {props.render(likes, increaseLikes)} </>
    }


export default DetailsWrapper;