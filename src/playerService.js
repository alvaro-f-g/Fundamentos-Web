import { noAccents, withPoints, dateToString } from "./auxFunctions.js";

let players = new Map();
let nextId = 0;
let freesIdArray = [];
let freesIdSet = new Set();

export function addPlayer(player) {
    player.id = freesIdArray.length ? freesIdArray.pop() : nextId++;  // Si hay ids que han quedado libres se usará uno de ellos, sino se creará uno nuevo
    players.set(player.id, player);
}

export function editPlayer(oldPlayer, newPlayer){
    newPlayer.subelements = oldPlayer.subelements;
    newPlayer.id = oldPlayer.id;

    players.set(newPlayer.id, newPlayer);
}

export function deletePlayer(id) {
    if (id >= nextId || freesIdSet.has(id)) throw new Error("Invalid id");

    players.delete(id);

    freesIdArray.push(id);
    freesIdSet.add(id);
}

export function getPlayers() {
    return [...players.values()]; // == Array.from(players.values())
}

export function getPlayer(id) {
    return players.get(id);
}

export function correctValues(player) {
    if (player.marketValue == 0) {
        throw new Error("Todos los jugadores valen algo");
    }
}

export function correctSubvalues(sub) {
    if (sub.stage.start > sub.stage.end) {
        throw new Error("¡Es imposible que haya dejado el club antes de haber entrado!");
    }
}

export function formatInfo(player) {
    return [noAccents(player.name), withPoints(player.marketValue), dateToString(new Date(player.birth))];
}