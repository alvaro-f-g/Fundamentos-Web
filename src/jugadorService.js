import { Player, defaultPlayers, defaultSubelements } from "./defaultPlayers.js";

let players = new Map();
let nextId = 0;

function loadDefaultSubelements(id) {
    let sub = [];

    for (let i = 0; i < defaultSubelements.emblems.length; i++) {
        let subelement = {
            emblem: defaultSubelements.emblems[i],
            club: defaultSubelements.clubs[i],
            stage: defaultSubelements.stages[i]
        };
        sub[i] = subelement;
    }

    players.get(id).subelements = sub;
}

export function addPlayer(player) {
    player.id = nextId++;
    players.set(player.id, player);
}

export function borrarJugador(id){
    players.delete(id);
}
//
export function getKeys(){
    return Array.from(players.keys()); //keys es un valor que tienen siempre los  mapas, el método keys() devuelve las claves en el objeto jugadores que es un Mapa y con Array.from hacemos que devuelva un array con las claves del mapa jugadores(foto, name...)
}

export function getJugadores(){
    return Array.from(players.values()); //values es un valor que tienen siempre los mapas,el método values() devuelve las valores en el objeto jugadores que es un Mapa y con Array.from hacemos que devuelva un array con las valores del mapa jugadores(Cristiano Ronaldo o el jugador que sea, los dorsales...)
}
//Para acceder a  cada jugador
export function getJugador(id){
    return players.get(id);
}

export function loadDefaultPlayers() {
    defaultPlayers.forEach((player) => {
        addPlayer(player);
        loadDefaultSubelements(player.id);  // Todos tendrán los mismos subelementos
    });
}