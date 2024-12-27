# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

1. Se instala vite y react 
2. se crea la estructura y se crea los ficheros pokemon- card y pokemon list
3. se llama a la api de pokemon.
4. se crea el set de pokemon card
5. se añade el nombre, imagen y texto.
6. se crea un identificador para se muestre si el pokemon existe o no con un terciario.
7. se añaden una hoja de estilos para los pokemon card y estilos generales.
8. se crea archivo para solicitar un array de 10 pokemon  y mostrarlos.
9. se crea un fichero de detalles para cuando clikes una cards te de informacion de ese pokemon
10. se le da diseño al pokemon details.
11. se añade un hover a la card
12. vamos a crear un formulario para recoger la informacion del usuario que 30 pokemons quiere recoger por ejemplo del 30-60..
13. se crea getform con setFrom y setTo.
14. se crea un submit para enviar el formulario de eleccion de pokemons
15. se crea un estilo para el formulario getform
16. se crea estilos generales en app.css
17. se comenta alguna partes del proyecto
18. vamos a crear una carperta contexto dentro de components para el contexto de la API.
19. ahora utilizamos el contexto tras la llamada a la api.
20. se crean componentes de alto nivel, vamos a modificar los detalles del pokemon seleccionado para añadir un contador de likes.
21. se implenta un contador de likes al pokemon selecionado
22. se crea un componente parecido al pokemon details con otros detalles, crean un componente de mayor nivel llevando la copia de pokemondetails a pokemondetails 2
23. se implenta los eventos en app.jsx para selecionar detalles de dos pokemons 
24. se añaden nuevos estilos a los detalles de pokemon selecionado tanto para el pokemon 1 y 2 
25. creamos carpeta hoc para la logica de los pokemons selecionados y le creamos un fichero para los detalles de la logica de selecion de pokemons.
26. se elemina de las paginas de details las varibles de likes y contador para añadirlo como props que lo recibe de los componentes de alto nivel.
27. se corijen algunos errores = El editor no reconoce el HOC como un componente válido
Algunos editores o linters necesitan indicaciones explícitas para entender que el HOC es un componente React válido.
Corrección:
Añade anotaciones de tipos con JSDoc para ayudar al editor.
Manejo de props.pokemon en PokemonDetails y PokemonDetails2
Si pokemon no se define correctamente (por ejemplo, está undefined o tiene valores faltantes), el editor puede marcar errores.
Corrección:
Asegúrate de manejar correctamente los valores por defecto o estados iniciales
28. se cambia a render el componente hoc.
29. se añade npm i react-router-dom dependencias para crear rutas
30. vamos a crear paginas
31. creamos la home page y se crea y añade el estilo
32. se crea pokemosn page y se copia todo lo que estaba en app.jsx el componente raiz
33. en el componente raiz se crean las rutas (<Routes></Routes>) de las paginas creadas
34. en path se le añade la ruta q qeremos acceder y en element marcamos la pagina creada.
35. se añade en el main que queremos utilizar las rutas <BrowserRouter></BrowserRouter>.
36. se da estilos se añade logo y enlace a la pagina de lista de pokemon desde el boton entrar del home