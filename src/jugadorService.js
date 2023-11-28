const jugadores = new Map();
let nextId = 0;
//Plantilla inicial
let jugador1 = new Map()
    jugador1.set('caracteristicas', ['Nombre', 'Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador1.set('valores', [ "Cristiano Ronaldo", "Delantero", "7", "5 de Febrero de 1985", "Portugués", "94.000.000", "Cristiano Ronaldo, nacido el 5 de febrero de 1985 en Portugal, es uno de los mejores futbolistas de la historia. Destacado por su habilidad técnica, velocidad y capacidad goleadora, ha tenido exitosas etapas en clubes como el Manchester United y el Real Madrid, ganando múltiples títulos, incluidas varias Ligas de Campeones. Su carrera internacional con Portugal también ha sido destacada, culminando en la victoria en la Eurocopa 2016. Más allá del fútbol, Ronaldo es una figura globalmente reconocida y admirada."]);
    jugador1.set('imagen', "imagenes/players/CristianoRonaldo.png");

addCar(jugador1);

let jugador2 = new Map()
    jugador2.set('caracteristicas', ['Nombre','Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador2.set('valores', [ "Vinicius Junior", "Delantero", "7", "12 de Julio de 2000", "Brasileño", "166.400.000", "Vinícius Júnior es uno de los extremos más emocionantes del mundo. Juega para el Real Madrid y la selección nacional de Brasil, y es conocido por sus deslumbrantes habilidades de regate, alto ritmo y creación de juego."]);
    jugador2.set('imagen', "imagenes/players/Vinicius.jpg");

addCar(jugador2);

let jugador3 = new Map()
    jugador3.set('caracteristicas', ['Nombre','Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador3.set('valores', [ "Theo HErnández", "Defensa", "19", "6 de Octubre de 1997", "Francés", "60.000.000", "Theo Hernández, nacido el 6 de octubre de 1997 en Marsella, Francia, es un lateral izquierdo francés conocido por su velocidad, potencia física y capacidad para contribuir en el ataque. Ha jugado para clubes prominentes como el Real Madrid y el AC Milan, demostrando habilidades defensivas sólidas y destacándose en el desarrollo de jugadas ofensivas desde la banda izquierda."]);
    jugador3.set('imagen', "imagenes/players/TheoHernandez.png");

addCar(jugador3);


let jugador4 = new Map()
    jugador4.set('caracteristicas', ['Nombre','Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador4.set('valores', [ "Isco Alarcón", "Medio", "22", "21 de Abril de 1992", "Español", "8.000.000", "Isco Alarcón es un talentoso centrocampista español nacido el 21 de abril de 1992 en Benalmádena. Conocido por su elegancia en el manejo del balón, visión de juego y habilidades técnicas, Isco ha tenido una destacada carrera en clubes como el Real Madrid, donde ha ganado varios títulos, incluidas cuatro Ligas de Campeones de la UEFA. Su estilo de juego creativo y versátil lo ha convertido en un jugador apreciado en el fútbol español."]);
    jugador4.set('imagen', "imagenes/players/Isco.png");

addCar(jugador4);

let jugador5 = new Map()
    jugador5.set('caracteristicas', ['Nombre','Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador5.set('valores', [ "Jude Bellingham","Medio", "5", "29 de Junio de 2003", "Inglés", "150.000.000", "Jude Bellingham es un centrocampista inglés nacido el 29 de junio de 2003 en Stourbridge, Inglaterra. Reconocido por su madurez futbolística a pesar de su juventud, Bellingham se ha destacado por su versatilidad, energía en el campo y capacidad para contribuir tanto en la defensa como en el ataque. Jugó para el Borussia Dortmund en la Bundesliga y también representó a la selección nacional de Inglaterra, mostrando un gran potencial y siendo considerado como uno de los jóvenes talentos más prometedores en el fútbol."]);
    jugador5.set('imagen', "imagenes/players/Bellingham.png");

addCar(jugador5);

let jugador6 = new Map()
    jugador6.set('caracteristicas', ['Nombre','Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador6.set('valores', [ "Mason Mount","Delantero", "7", "10 de Enero de 1999", "Inglés", "60.000.000", "Mason Mount es un talentoso centrocampista inglés, nacido el 10 de enero de 1999 en Portsmouth, Inglaterra. Destaca por su visión de juego, capacidad de pase y versatilidad en el campo. Desarrolló gran parte de su carrera en el Derby County antes de unirse al Chelsea. Mount ha sido una pieza clave para el Chelsea y la selección inglesa, demostrando su habilidad para marcar goles y crear oportunidades. Su proyección y consistencia lo han establecido como uno de los jóvenes talentos más prometedores del fútbol inglés."]);
    jugador6.set('imagen', "imagenes/players/MasonMount.png");

addCar(jugador6);

let jugador7 = new Map()
    jugador7.set('caracteristicas', ['Nombre','Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador7.set('valores', [ "Leo Messi", "Delantero", "10", "24 de Junio de 1987", "Argentino", "35.000.000", "Lionel Messi, nacido el 24 de junio de 1987 en Rosario, Argentina, es ampliamente considerado como uno de los mejores futbolistas de todos los tiempos. Conocido por su habilidad extraordinaria con el balón, regate excepcional, visión de juego única y capacidad goleadora, Messi ha pasado la mayor parte de su carrera en el FC Barcelona, donde ganó numerosos títulos, incluyendo múltiples Ligas de Campeones de la UEFA y Balones de Oro.Messi es conocido por su dedicación, profesionalismo y capacidad para marcar diferencias en el terreno de juego. En agosto de 2021, dejó el Barcelona debido a problemas financieros del club y se unió al Paris Saint-Germain (PSG) en la Ligue 1 de Francia. Su legado en el fútbol mundial es indiscutible, y su impacto en el juego ha dejado una huella imborrable."]);
    jugador7.set('imagen', "imagenes/players/Messi.png");

addCar(jugador7);

let jugador8 = new Map()
    jugador8.set('caracteristicas', ['Nombre','Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador8.set('valores', [ "Jesús Vallejo","Defensa", "5", "5 de Enero de 1997", "Español", "2.000.000", "Jesús Vallejo es un defensor español nacido el 5 de enero de 1997 en Zaragoza. Conocido por su solidez defensiva, Vallejo ha pasado por clubes como el Real Madrid y el Wolverhampton Wanderers. A lo largo de su carrera, ha demostrado ser un central con buen posicionamiento y habilidades tácticas. Su experiencia en clubes de alto nivel ha contribuido a su desarrollo como defensor confiable."]);
    jugador8.set('imagen', "imagenes/players/Vallejo.png");

addCar(jugador8);

let jugador9 = new Map()
    jugador9.set('caracteristicas', ['Nombre', 'Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador9.set('valores', [ "Robert Sánchez","Portero", "1", "18 de Noviembre de 1997", "Español", "28.000.000", "Robert Sánchez es un portero español nacido el 19 de noviembre de 1997 en Cartagena. Ha ganado reconocimiento por sus actuaciones con el Brighton & Hove Albion en la Premier League inglesa. Sánchez se destaca por su agilidad, seguridad en la portería y habilidad para realizar importantes intervenciones. Su ascenso en el fútbol inglés ha sido notable, convirtiéndose en un portero prometedor con un futuro brillante. "]);
    jugador9.set('imagen', "imagenes/players/RobertSanchez.png");

addCar(jugador9);

let jugador10 = new Map()
    jugador10.set('caracteristicas', ['Nombre','Posición', 'Dorsal', 'Fecha de nacimiento', 'Nacionalidad', 'Valor de mercado', 'Descripción']);
    jugador10.set('valores', [ "Achraf Hakimi","Defensa", "2", "4 de Noviembre de 1998", "Marroquí", "65.000.000", "Achraf Hakimi es un futbolista marroquí nacido el 4 de noviembre de 1998 en Madrid, España. Se destaca por su versatilidad, ya que puede desempeñarse como lateral derecho o izquierdo, así como en posiciones más avanzadas del campo. Conocido por su velocidad impresionante y capacidad para incorporarse al ataque, Hakimi ha jugado en clubes como el Real Madrid, Borussia Dortmund e Inter de Milán. Su estilo de juego ofensivo y su habilidad para contribuir en la generación de jugadas lo han convertido en uno de los laterales más destacados en el fútbol contemporáneo."]);
    jugador10.set('imagen', "imagenes/players/Achraf.jpg");

addCar(jugador10); 
