const jugadores = new Map();
let nextId = 0;
//Plantilla inicial
function cargarJugador(id){
    let foto;
    let name;
    let pos;
    let number;
    let date;
    let nationality;
    let marketValue;
    let description;
    let subelemento; //Variable para cargar el subelemento llamandóse a la función cargarSubElementos
    
    switch (id){
        case 0:
            foto = "CristianoRonaldo.png";
            name = "Cristiano Ronaldo";
            pos = "Delantero";
            number = "7";
            date = "5 de Febrero de 1985";
            nationality = "Portugués";
            marketValue = "94.000.000";
            description = "Cristiano Ronaldo, nacido el 5 de febrero de 1985 en Portugal, es uno de los mejores futbolistas de la historia. Destacado por su habilidad técnica, velocidad y capacidad goleadora, ha tenido exitosas etapas en clubes como el Manchester United y el Real Madrid, ganando múltiples títulos, incluidas varias Ligas de Campeones. Su carrera internacional con Portugal también ha sido destacada, culminando en la victoria en la Eurocopa 2016. Más allá del fútbol, Ronaldo es una figura globalmente reconocida y admirada.";
           //cargarsubelementos
           subelemento=cargarSubElementos(id);
            break;
        case 1:
            foto = "Vinicius.jpg";
            name = "Vinicius Junior";
            pos = "Delantero";
            number = "7";
            date = "12 de Julio de 2000";
            nationality = "Brasileño";
            marketValue = "166.000.000";
            description = "Vinícius Júnior es uno de los extremos más emocionantes del mundo. Juega para el Real Madrid y la selección nacional de Brasil, y es conocido por sus deslumbrantes habilidades de regate, alto ritmo y creación de juego.";
           //cargarsubelementos
           subelemento=cargarSubElementos(id);
            break;
        case 2:
            foto = "TheoHernandez.png";
            name = "Theo Hernandez";
            pos = "Defensa";
            number = "19";
            date = "6 de Octubre de 1997";
            nationality = "Francés";
            marketValue = "60.000.000";
            description = "Theo Hernández, nacido el 6 de octubre de 1997 en Marsella, Francia, es un lateral izquierdo francés conocido por su velocidad, potencia física y capacidad para contribuir en el ataque. Ha jugado para clubes prominentes como el Real Madrid y el AC Milan, demostrando habilidades defensivas sólidas y destacándose en el desarrollo de jugadas ofensivas desde la banda izquierda.";
           //cargarsubelementos
           subelemento=cargarSubElementos(id);
            break;
        case 3:
            foto = "Isco.png";
            name = "Isco Alarcón";
            pos = "Medio";
            number = "22";
            date = "21 de Abril de 1992";
            nationality = "Español";
            marketValue = "8.000.000";
            description =  "Isco Alarcón es un talentoso centrocampista español nacido el 21 de abril de 1992 en Benalmádena. Conocido por su elegancia en el manejo del balón, visión de juego y habilidades técnicas, Isco ha tenido una destacada carrera en clubes como el Real Madrid, donde ha ganado varios títulos, incluidas cuatro Ligas de Campeones de la UEFA. Su estilo de juego creativo y versátil lo ha convertido en un jugador apreciado en el fútbol español.";
           //cargarsubelementos
           subelemento=cargarSubElementos(id); 
            break;
        case 4:
            foto = "Bellingham.png";
            name = "Jude Bellingham";
            pos = "Medio";
            number = "5";
            date = "29 de Junio de 2003";
            nationality = "Inglés";
            marketValue = "150.000.000";
            description =  "Jude Bellingham es un centrocampista inglés nacido el 29 de junio de 2003 en Stourbridge, Inglaterra. Reconocido por su madurez futbolística a pesar de su juventud, Bellingham se ha destacado por su versatilidad, energía en el campo y capacidad para contribuir tanto en la defensa como en el ataque. Jugó para el Borussia Dortmund en la Bundesliga y también representó a la selección nacional de Inglaterra, mostrando un gran potencial y siendo considerado como uno de los jóvenes talentos más prometedores en el fútbol.";
           //cargarsubelementos
           subelemento=cargarSubElementos(id);
            break;
        case 5:
            foto = "MasonMount.png";
            name = "Mason Mount";
            pos = "Delantero";
            number = "7";
            date = "10 de Enero de 1999";
            nationality = "Inglés";
            marketValue = "60.000.000";
            description =  "Mason Mount es un talentoso centrocampista inglés, nacido el 10 de enero de 1999 en Portsmouth, Inglaterra. Destaca por su visión de juego, capacidad de pase y versatilidad en el campo. Desarrolló gran parte de su carrera en el Derby County antes de unirse al Chelsea. Mount ha sido una pieza clave para el Chelsea y la selección inglesa, demostrando su habilidad para marcar goles y crear oportunidades. Su proyección y consistencia lo han establecido como uno de los jóvenes talentos más prometedores del fútbol inglés.";
           //cargarsubelementos
           subelemento=cargarSubElementos(id);
            break; 
        case 6:
            foto = "Messi.png";
            name = "Leo Messi";
            pos = "Delantero";
            number = "10";
            date = "24 de Junio de 1987";
            nationality = "Argentino";
            marketValue = "35.000.000";
            description =  "Lionel Messi, nacido el 24 de junio de 1987 en Rosario, Argentina, es ampliamente considerado como uno de los mejores futbolistas de todos los tiempos. Conocido por su habilidad extraordinaria con el balón, regate excepcional, visión de juego única y capacidad goleadora, Messi ha pasado la mayor parte de su carrera en el FC Barcelona, donde ganó numerosos títulos, incluyendo múltiples Ligas de Campeones de la UEFA y Balones de Oro.Messi es conocido por su dedicación, profesionalismo y capacidad para marcar diferencias en el terreno de juego. En agosto de 2021, dejó el Barcelona debido a problemas financieros del club y se unió al Paris Saint-Germain (PSG) en la Ligue 1 de Francia. Su legado en el fútbol mundial es indiscutible, y su impacto en el juego ha dejado una huella imborrable.";
           //cargarsubelementos
           subelemento=cargarSubElementos(id);
            break;
        case 7:
            foto = "Vallejo.png";
            name = "Jesús Vallejo";
            pos = "Defensa";
            number = "5";
            date = "5 de Enero de 1997";
            nationality = "Español";
            marketValue = "2.000.000";
            description = "Jesús Vallejo es un defensor español nacido el 5 de enero de 1997 en Zaragoza. Conocido por su solidez defensiva, Vallejo ha pasado por clubes como el Real Madrid y el Wolverhampton Wanderers. A lo largo de su carrera, ha demostrado ser un central con buen posicionamiento y habilidades tácticas. Su experiencia en clubes de alto nivel ha contribuido a su desarrollo como defensor confiable.";
           //cargarsubelementos
           subelemento=cargarSubElementos(id);
            break;
        case 8:
            foto = "RobertSanchez.png";
            name = "Robert Sánchez";
            pos = "Portero";
            number = "1";
            date = "18 de Noviembre de 1997";
            nationality = "Español";
            marketValue = "28.000.000";
            description = "Robert Sánchez es un portero español nacido el 19 de noviembre de 1997 en Cartagena. Ha ganado reconocimiento por sus actuaciones con el Brighton & Hove Albion en la Premier League inglesa. Sánchez se destaca por su agilidad, seguridad en la portería y habilidad para realizar importantes intervenciones. Su ascenso en el fútbol inglés ha sido notable, convirtiéndose en un portero prometedor con un futuro brillante. ";
           //cargarsubelementos
           subelemento=cargarSubElementos(id);
            break;  
        case 9: 
            foto = "Achraf.jpg";
            name = "Achraf Hakimi";
            pos = "Defensa";
            number = "2";
            date = "4 de Noviembre de 1998";
            nationality = "Marroquí";
            marketValue = "65.000.000";
            description = "Achraf Hakimi es un futbolista marroquí nacido el 4 de noviembre de 1998 en Madrid, España. Se destaca por su versatilidad, ya que puede desempeñarse como lateral derecho o izquierdo, así como en posiciones más avanzadas del campo. Conocido por su velocidad impresionante y capacidad para incorporarse al ataque, Hakimi ha jugado en clubes como el Real Madrid, Borussia Dortmund e Inter de Milán. Su estilo de juego ofensivo y su habilidad para contribuir en la generación de jugadas lo han convertido en uno de los laterales más destacados en el fútbol contemporáneo.";
            //cargarsubelementos
            subelemento=cargarSubElementos(id);
            break;  
        default:
            console.log("Opcion no existente");
    } 
    let jugador ={ //definir las características de un jugador para cargar porque estamos haciendo un mapa de jugadores
        fotoPerfil:foto,
        nombreApellidos:name,
        posición:pos,
        dorsal:number,
        fechaNacimiento:date,
        nacionalidad:nationality,
        valorMercado:marketValue,
        descripcion:description,
        subElems : subelemento,//subelementos
        identificador:id
    }
    return jugador
}
//cargamos al mapa cada jugador de a plantilla inicial
function cargarJugadores(){
    for (let i=0; i<9; i++){
        jugadores.set(i,cargarJugador(i))
        nextId+=1
    }
}
function cargarSubElementos(id) {
        let sub = []; //para guardar las carácteristicas de los subelementos
        let datosComunes = {
            escudos: ["Sporting_Lisboa.png", "Manchester_United.png", "Real_Madrid.png", " Juventus.png", "Manchester United.png","Al-Nassr.png"],
            clubes: ["Sporting de Lisboa", "Manchester United", "Real Madrid", " Juventus", "Manchester United","Al-Nassr"],
            etapas: ["2002-03", "2003-09", "2009-18", "2018-22","2021-22","2022-24"]
        };
    
        if (id >= 0 && id <= 9) {
            for (let i = 0; i < datosComunes.escudos.length; i++) { //se verifica que id esté en el rango correcto antes de ejecutar el bucle for
                let subElemento = {
                    escudo: datosComunes.escudos[i],
                    club: datosComunes.clubes[i],
                    etapa: datosComunes.etapas[i]
                };
                sub[i] = subElemento;
            }
        } else {
            console.log("Opción no existente");
        }
    
        return sub;
    }
export function añadirJugador(jugador){
    let id = nextId++;
    jugador.set('id',id.toString()); //al ser un mapa necesitamos pasarle una cadena de caracteres, si fuera id 10 necesitamos id '10'
    jugador.id= id.toString();
    jugadores.set(jugador.id,jugador);
}
export function borrarJugador(id){
    jugadores.delete(id);
}
//
export function getKeys(){
    return Array.from(jugadores.keys()); //keys es un valor que tienen siempre los  mapas, el método keys() devuelve las claves en el objeto jugadores que es un Mapa y con Array.from hacemos que devuelva un array con las claves del mapa jugadores(foto, name...)
}

export function getJugadores(){
    return Array.from(jugadores.values()); //values es un valor que tienen siempre los mapas,el método values() devuelve las valores en el objeto jugadores que es un Mapa y con Array.from hacemos que devuelva un array con las valores del mapa jugadores(Cristiano Ronaldo o el jugador que sea, los dorsales...)
}
//Para acceder a  cada jugador
export function getJugador(id){
    return jugadores.get(id);
}