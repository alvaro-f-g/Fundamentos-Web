import { addPlayer, getPlayer, addSubelement } from './playerService.js';
import { numberInRange, correctDate, validFormat } from "./auxFunctions.js";

export class Player {
     constructor(photo, name, position, number, birth, nationality, marketValue, description) {
          this.photo = photo;
          this.name = name;
          this.position = position;
          this.number = number;
          this.birth = birth;
          this.nationality = nationality;
          this.marketValue = marketValue;
          this.description = description;
          this.subelements = [];
     }

     checkValues() {
          let longFields = new Set(["description", "photo"]);
          let positions = new Set(["Banquillo", "Portero", "Defensa", "Centrocampista", "Delantero"]);
          let birthday = new Date(this.birth);

          for (const value in this) {
               if (this[value] === "") throw new Error("Rellene todos los campos del formulario");
               if (this[value].length > 20 && !longFields.has(value)) throw new Error("La longitud del campo " + value + " es demasiado larga");
               if (this[value].length > 2000 && longFields.has(value)) throw new Error("La longitud del campo " + value + " es demasiado larga");
          }
          if (!validFormat(this.photo)) throw new Error("No es una URL de imagen válida");
          if (!positions.has(this.position)) throw new Error("Introduzca una posición válida");
          numberInRange("El dorsal", parseInt(this.number), 0, 99);
          if (correctDate(this.birth)) throw new Error("Introduzca una fecha correcta");
          if (birthday.getTime() > Date.now()) throw new Error("¿Ha nacido en el futuro?");
          numberInRange("El valor de mercado", parseInt(this.marketValue), 0, 100000000);
          if (this.marketValue == 0) throw new Error("Todos los jugadores valen algo");

          return true;
     }
}

export class Subelement {
     constructor(emblem, club, start, end) {
          this.emblem = emblem,
          this.club = club,
          this.stage = { start: start, end: end }
     }

     checkValues() {
          for (const value in this) {
               if (this[value] === "") throw new Error("Rellene todos los campos");
          }
          if (!validFormat(this.emblem)) throw new Error("No es una URL de imagen válida");
          if (this.club.length > 20) throw new Error("El nombre del club es demasiado largo");
          numberInRange("El año de entrada", parseInt(this.stage.start), 1863, 2222);
          numberInRange("El año de salida", parseInt(this.stage.end), 1863, 2222);
          if (this.stage.start > this.stage.end) throw new Error("¡Es imposible que haya dejado el club antes de haber entrado!");

          return true;
     }
}

const defaultPlayers = [
     new Player(
          "CristianoRonaldo.png",
          "Cristiano Ronaldo",
          "Delantero",
          "7",
          "1985-02-05",
          "Portugués",
          "94000000",
          "Cristiano Ronaldo, nacido el 5 de febrero de 1985 en Portugal, es uno de los mejores futbolistas de la historia. Destacado por su habilidad técnica, velocidad y capacidad goleadora, ha tenido exitosas etapas en clubes como el Manchester United y el Real Madrid, ganando múltiples títulos, incluidas varias Ligas de Campeones. Su carrera internacional con Portugal también ha sido destacada, culminando en la victoria en la Eurocopa 2016. Más allá del fútbol, Ronaldo es una figura globalmente reconocida y admirada."
     ),
     new Player(
          "Vinicius.jpg",
          "Vinicius Júnior",
          "Delantero",
          "7",
          "2000-07-12",
          "Brasileño",
          "166000000",
          "Vinícius Júnior es uno de los extremos más emocionantes del mundo. Juega para el Real Madrid y la selección nacional de Brasil, y es conocido por sus deslumbrantes habilidades de regate, alto ritmo y creación de juego."
     ),
     new Player(
          "TheoHernandez.png",
          "Theo Hernández",
          "Defensa",
          "19",
          "1997-10-06",
          "Francés",
          "60000000",
          "Theo Hernández, nacido el 6 de octubre de 1997 en Marsella, Francia, es un lateral izquierdo francés conocido por su velocidad, potencia física y capacidad para contribuir en el ataque. Ha jugado para clubes prominentes como el Real Madrid y el AC Milan, demostrando habilidades defensivas sólidas y destacándose en el desarrollo de jugadas ofensivas desde la banda izquierda."
     ),
     new Player(
          "Isco.png",
          "Isco Alarcón",
          "Medio",
          "22",
          "1992-04-21",
          "Español",
          "8000000",
          "Isco Alarcón es un talentoso centrocampista español nacido el 21 de abril de 1992 en Benalmádena. Conocido por su elegancia en el manejo del balón, visión de juego y habilidades técnicas, Isco ha tenido una destacada carrera en clubes como el Real Madrid, donde ha ganado varios títulos, incluidas cuatro Ligas de Campeones de la UEFA. Su estilo de juego creativo y versátil lo ha convertido en un jugador apreciado en el fútbol español."
     ),
     new Player(
          "Bellingham.png",
          "Jude Bellingham",
          "Medio",
          "5",
          "2003-06-29",
          "Inglés",
          "150000000",
          "Jude Bellingham es un centrocampista inglés nacido el 29 de junio de 2003 en Stourbridge, Inglaterra. Reconocido por su madurez futbolística a pesar de su juventud, Bellingham se ha destacado por su versatilidad, energía en el campo y capacidad para contribuir tanto en la defensa como en el ataque. Jugó para el Borussia Dortmund en la Bundesliga y también representó a la selección nacional de Inglaterra, mostrando un gran potencial y siendo considerado como uno de los jóvenes talentos más prometedores en el fútbol."
     ),
     new Player(
          "MasonMount.png",
          "Mason Mount",
          "Delantero",
          "7",
          "1999-01-10",
          "Inglés",
          "60000000",
          "Mason Mount es un talentoso centrocampista inglés, nacido el 10 de enero de 1999 en Portsmouth, Inglaterra. Destaca por su visión de juego, capacidad de pase y versatilidad en el campo. Desarrolló gran parte de su carrera en el Derby County antes de unirse al Chelsea. Mount ha sido una pieza clave para el Chelsea y la selección inglesa, demostrando su habilidad para marcar goles y crear oportunidades. Su proyección y consistencia lo han establecido como uno de los jóvenes talentos más prometedores del fútbol inglés."
     ),
     new Player(
          "Messi.png",
          "Leo Messi",
          "Delantero",
          "10",
          "1987-06-24",
          "Argentino",
          "35000000",
          "Lionel Messi, nacido el 24 de junio de 1987 en Rosario, Argentina, es ampliamente considerado como uno de los mejores futbolistas de todos los tiempos. Conocido por su habilidad extraordinaria con el balón, regate excepcional, visión de juego única y capacidad goleadora, Messi ha pasado la mayor parte de su carrera en el FC Barcelona, donde ganó numerosos títulos, incluyendo múltiples Ligas de Campeones de la UEFA y Balones de Oro.Messi es conocido por su dedicación, profesionalismo y capacidad para marcar diferencias en el terreno de juego. En agosto de 2021, dejó el Barcelona debido a problemas financieros del club y se unió al Paris Saint-Germain (PSG) en la Ligue 1 de Francia. Su legado en el fútbol mundial es indiscutible, y su impacto en el juego ha dejado una huella imborrable."
     ),
     new Player(
          "Vallejo.png",
          "Jesús Vallejo",
          "Defensa",
          "5",
          "1997-01-05",
          "Español",
          "2000000",
          "Jesús Vallejo es un defensor español nacido el 5 de enero de 1997 en Zaragoza. Conocido por su solidez defensiva, Vallejo ha pasado por clubes como el Real Madrid y el Wolverhampton Wanderers. A lo largo de su carrera, ha demostrado ser un central con buen posicionamiento y habilidades tácticas. Su experiencia en clubes de alto nivel ha contribuido a su desarrollo como defensor confiable."
     ),
     new Player(
          "RobertSanchez.png",
          "Robert Sánchez",
          "Portero",
          "1",
          "1997-11-18",
          "Español",
          "28000000",
          "Robert Sánchez es un portero español nacido el 19 de noviembre de 1997 en Cartagena. Ha ganado reconocimiento por sus actuaciones con el Brighton & Hove Albion en la Premier League inglesa. Sánchez se destaca por su agilidad, seguridad en la portería y habilidad para realizar importantes intervenciones. Su ascenso en el fútbol inglés ha sido notable, convirtiéndose en un portero prometedor con un futuro brillante."
     ),
     new Player(
          "Achraf.jpg",
          "Achraf Hakimi",
          "Defensa",
          "2",
          "1998-11-04",
          "Marroquí",
          "65000000",
          "Achraf Hakimi es un futbolista marroquí nacido el 4 de noviembre de 1998 en Madrid, España. Se destaca por su versatilidad, ya que puede desempeñarse como lateral derecho o izquierdo, así como en posiciones más avanzadas del campo. Conocido por su velocidad impresionante y capacidad para incorporarse al ataque, Hakimi ha jugado en clubes como el Real Madrid, Borussia Dortmund e Inter de Milán. Su estilo de juego ofensivo y su habilidad para contribuir en la generación de jugadas lo han convertido en uno de los laterales más destacados en el fútbol contemporáneo."
     )
];

const defaultSubelements = {
     emblems: ["Sporting_Lisboa.png", "Manchester_United.png", "Real_Madrid.png", "Juventus.png", "Manchester_United.png", "Al-Nassr.png"],
     clubs: ["Sporting de Lisboa", "Manchester United", "Real Madrid", " Juventus", "Manchester United", "Al-Nassr"],
     stages: [{ start: 2002, end: 2003 }, { start: 2003, end: 2009 }, { start: 2009, end: 2018 }, { start: 2018, end: 2021 }, { start: 2021, end: 2022 }, { start: 2023, end: 2024 }]
};

function loadDefaultSubelements(id) {
     let player = getPlayer(id);

     for (let i = 0; i < defaultSubelements.emblems.length; i++) {
          let sub = new Subelement(
               "/images/teams/" + defaultSubelements.emblems[i],
               defaultSubelements.clubs[i],
               defaultSubelements.stages[i].start,
               defaultSubelements.stages[i].end
          );
          addSubelement(player, sub);
     }
}

export function loadDefaultPlayers() {
     defaultPlayers.forEach((player) => {
          addPlayer(player);
          player.photo = "/images/players/" + player.photo;
     });
     loadDefaultSubelements(0);  // Solo tenemos los subelementos del bicho
}