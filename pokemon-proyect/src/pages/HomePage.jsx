
import "./HomePage.css";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";



function HomePage() {

    

    return (
        <section id="home-page">
            <h1 className="title">Bienvenido</h1>
            <img src={logo} alt="logo" className="logo" />
            <Link to = "/pokemons" className="link">Entrar</Link>
        </section>

    );
}

export default HomePage
