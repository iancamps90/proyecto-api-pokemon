React + Vite

Este proyecto utiliza Vite como bundler y React para crear una aplicación web interactiva. Ofrece un setup mínimo para trabajar con React en Vite con Hot Module Replacement (HMR) y algunas reglas de ESLint.

Actualmente, se utilizan dos plugins oficiales:

    @vitejs/plugin-react: Usa Babel para Fast Refresh.
    @vitejs/plugin-react-swc: Usa SWC para Fast Refresh.

Esta es una aplicación interactiva de Pokémon construida con React y Vite. Permite a los usuarios ver una lista de Pokémon, acceder a detalles específicos de cada uno y realizar selecciones basadas en un rango de IDs."

Inicios del proyecto

Para comenzar con el proyecto, sigue estos pasos:
# Clona el repositorio
git clone https://github.com/tu-usuario/tu-proyecto.git

# Entra en el directorio
cd tu-proyecto

# Instala las dependencias
npm install

# Inicia el proyecto
npm run dev


Pasos seguidos en el desarrollo del proyecto:

1.  Instalación de Vite y React: Se instala el entorno de desarrollo con Vite y se configura React.

2. Creación de la estructura inicial: Se crea la estructura de carpetas y los archivos para los componentes principales: PokemonCard y PokemonList.

3. Llamada a la API de Pokémon: Se realiza una solicitud a la API pública de Pokémon para obtener los datos de los Pokémon.

4. Creación del componente PokemonCard: Se crea un componente que muestra información básica de un Pokémon (nombre, imagen y estadísticas).

5. Manejo de datos de existencia: Se implementa un ternario para mostrar un mensaje en caso de que el Pokémon no exista.

6. Hoja de estilos: Se añaden estilos específicos para las tarjetas de los Pokémon y estilos generales.

7. Solicitar múltiples Pokémon: Se crea una función para solicitar un array de 10 Pokémon y mostrarlos en la lista.

8. Componente de detalles: Se crea un componente PokemonDetails para mostrar más información al hacer clic en una tarjeta de Pokémon.

9. Estilos de PokemonDetails: Se le da estilo al componente PokemonDetails para mejorar la presentación.

10. Hover en las tarjetas: Se añade un efecto hover a las tarjetas de Pokémon para mejorar la interacción.

11. Formulario de selección de Pokémon: Se crea un formulario para que el usuario pueda seleccionar un rango de Pokémon (por ejemplo, del 30 al 60).

12. Gestión del formulario: Se crea un estado para manejar los valores del formulario de selección de Pokémon (setFrom y setTo).

13. Envío del formulario: Se implementa la funcionalidad de envío para que el formulario filtre los Pokémon seleccionados según el rango proporcionado.

14. Estilos para el formulario: Se le da estilo al formulario getForm para que sea visualmente agradable.

15. Estilos generales en app.css: Se añaden estilos globales para la aplicación.

16. Comentarios en el código: Se añaden comentarios en varias partes del código para explicar su funcionamiento y facilitar el mantenimiento.

17. Creación de la carpeta context: Se crea una carpeta dentro de components para manejar el contexto de la API, centralizando la lógica de la solicitud de Pokémon.

18. Uso del contexto: Se usa el contexto después de la llamada a la API para que los componentes puedan acceder a los datos de Pokémon.

19. Componentes de alto nivel: Se crean componentes de alto nivel para modificar el estado global y añadir funcionalidades adicionales (como un contador de "likes").

20. Contador de "likes": Se implementa un contador de "likes" para cada Pokémon en la vista de detalles.

21. Nuevo componente de detalles: Se crea un nuevo componente PokemonDetails2 con más detalles sobre el Pokémon seleccionado.

22. Eventos en App.jsx: Se añaden los eventos necesarios para manejar la selección de detalles de dos Pokémon diferentes.

23. Estilos para el Pokémon seleccionado: Se mejoran los estilos de los detalles del Pokémon seleccionado, aplicándolos tanto para el primer Pokémon como para el segundo.

24. Creación de la carpeta HOC: Se crea una carpeta hoc para manejar la lógica relacionada con los Pokémon seleccionados, creando un archivo que centralice esta funcionalidad.

25. Eliminación de variables redundantes: Se eliminan las variables de "likes" y contador de las páginas de detalles, moviéndolas como propiedades (props) que se reciben de los componentes de alto nivel.

26. Corrección de errores:

    Se corrige un error en el que el editor no reconoce el HOC como un componente válido.
    Se añaden anotaciones de tipos con JSDoc para mejorar el soporte del editor y linters.
    Se manejan los valores por defecto en PokemonDetails y PokemonDetails2 para evitar errores si el Pokémon no está definido correctamente.

27. Cambio a render en el componente HOC: Se realiza un cambio en la forma de renderizar el componente HOC para mejorar su funcionamiento.

28. Dependencia de react-router-dom: Se instala react-router-dom para crear rutas en la aplicación.

29. Creación de páginas: Se crean las páginas principales de la aplicación: HomePage y PokemonPage.

30. Configuración de rutas: En el componente principal (App.jsx), se configuran las rutas usando <Routes> y se asocian con las páginas creadas.

31. Estilos del HomePage: Se aplican estilos a la página de inicio, se añade un logo y un enlace al botón "Entrar" para acceder a la lista de Pokémon.

32. Página de detalles del Pokémon: Se crea una nueva página para acceder a la información detallada de un Pokémon cuando se selecciona de la lista.

33. Implementación de rutas en App.jsx: Se utilizan rutas dinámicas (<BrowserRouter></BrowserRouter>) para manejar la navegación entre las diferentes páginas de la aplicación.

34. Página de Pokémon: En la página de detalles del Pokémon, se obtiene el id de la URL utilizando useParams de react-router-dom para cargar la información específica del Pokémon seleccionado.

35. Comentarios finales: Se añaden comentarios adicionales a la página de detalles del Pokémon para explicar el flujo de datos y el uso de rutas.
    
36. 36. Actualización del README
    
    Se incluye una descripción detallada de los pasos realizados para mantener el repositorio actualizado con las últimas mejoras y funcionalidades implementadas en el proyecto.

37. Estilos, Animaciones y Transiciones en la Página del Pokémon Seleccionado

    Se realizaron las siguientes mejoras en la página PokemonPage para un diseño más atractivo y dinámico:

    Estilos: Se añadió un diseño moderno con colores vibrantes, espaciado consistente y un fondo degradado para resaltar la presentación.
    Animaciones: Se implementaron transiciones suaves para elementos clave, como la imagen del Pokémon, que ahora tiene una animación de escala al cargarse.
    Cargando...: Durante la carga de los datos, se incluyó una animación sutil de puntos que van apareciendo progresivamente.
    Interactividad: Se mejoró la interacción visual de los elementos, como cambios de color y escala en los botones al pasar el cursor por encima.

38. Navegación entre Pokémon con el Hook useNavigate

    Se añadió la funcionalidad para navegar entre los Pokémon utilizando los botones "⬅️ Anterior" y "➡️ Siguiente". Esto se logró con el hook useNavigate de React Router, que permite cambiar de ruta dinámicamente según el ID del Pokémon actual:

    Botón Anterior: Navega al ID inmediatamente anterior, asegurándose de no ir por debajo del ID 1.
    Botón Siguiente: Navega al siguiente ID disponible.

39. Navegación con Ruta Paramétrica

    Se utiliza una ruta paramétrica para identificar el Pokémon seleccionado, extrayendo el parámetro id directamente de la URL gracias al hook useParams de React Router. Esto permite que cada Pokémon tenga una página dinámica basada en su ID único.

40. se crea la pagina de error para que si introduces cualquier direccion no valida te lleve hay y un link para volver al home

41. se va a crear una autentificacion para que no entren usuarios no permitidos

42. creamos las variables const [hasAcces, setAcces] = useState(true); 

43. creamos en la carpeta context archivo para los usuarios verificar si estan logeados o no

44. Vamos añadir navegabilidad para acceder a la pagina pokemon al selecionar un pokemon podemos ver los detalles de cada uno.

45. se añade un try-catch a la funcion del fecth pokemon.

46. vamos a profesionalizar un poco el codigo que tenemos hasta ahora separando la logica que tenemos al contexto.

47. hemos limpiado el componente funcion de fecht de pokemon list al contexto separando la logica del codigo y en pokemon page eliminamos la funcion fetch y añadimos el contexto.
    



    