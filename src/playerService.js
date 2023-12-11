import { noAccents, withPoints, dateToString } from "./auxFunctions.js";

let players = new Map();
let nextId = 0;
let freesIdArray = [];

export function addPlayer(player) {
    player.id = freesIdArray.length ? freesIdArray.pop() : nextId++;  // Si hay ids que han quedado libres se usará uno de ellos, sino se creará uno nuevo
    players.set(player.id, player);
}

export function editPlayer(oldPlayer, newPlayer) {
    newPlayer.subelements = oldPlayer.subelements;
    newPlayer.id = oldPlayer.id;

    players.set(newPlayer.id, newPlayer);
}

export function deletePlayer(id) {
    players.delete(id) && freesIdArray.push(id);
}

export function getPlayers() {
    return [...players.values()]; // == Array.from(players.values())
}

export function getPlayer(id) {
    return players.get(id);
}

function numberInRange(name, number, min, max) {
    if (!Number.isInteger(number)) throw new Error (name + " debe ser un número entero");
    if (number < min || number > max) throw new Error (name + " debe ser un número entre " + min + " y " + max);
}

function correctDate(string) {
    const parts = string.split('-');

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    const date = new Date(year, month - 1, day);

    return (isNaN(date.getTime()) || date.getFullYear() !== year || month < 1 || month > 12 || day < 1 || day > 31)
}

function validFormat(url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

export function correctValues(player) {
    let correct = false;

    let longFields = new Set(["description", "photo", "otherProperty"]);

    for (const value in player) {
        if (player[value] === "") throw new Error("Rellene todos los campos del formulario");
        if (player[value].length > 20 && !longFields.has(value)) throw new Error("La longitud del campo " + value + " es demasiado larga");
        if (player[value].length > 2000 && longFields.has(value)) throw new Error("La longitud del campo " + value + " es demasiado larga");
    }
    numberInRange("El dorsal", parseInt(player.number), 0, 99);
    numberInRange("El valor de mercado", parseInt(player.marketValue), 0, 100000000);
    if (player.marketValue == 0) {
        throw new Error("Todos los jugadores valen algo");
    } else if (correctDate(player.birth)) {
        throw new Error("Introduzca una fecha correcta");
    } else if (birthday.getTime() > Date.now()) {
        throw new Error("¿Ha nacido en el futuro?");
    } else if (!validFormat(player.photo)) {
        throw new Error("No es una URL de imagen válida");
    } else {
        correct = true;
    }

    return correct;
}

export function correctSubvalues(sub) {
    let correct = false;

    for (const value in sub) {
        if (sub[value] === "") throw new Error("Rellene todos los campos");
    }
    numberInRange("El año de entrada", parseInt(sub.stage.start), 1863, 2222);
    numberInRange("El año de salida", parseInt(sub.stage.end), 1863, 2222);
    if (!validFormat(sub.emblem)) {
        throw new Error("No es una URL de imagen válida");
    } else if (sub.club.length > 20) {
        throw new Error("El nombre del club es demasiado largo");
    } else if (sub.stage.start > sub.stage.end) {
        throw new Error("¡Es imposible que haya dejado el club antes de haber entrado!");
    } else {
        correct = true;
    }

    return correct;
}

export function formatInfo(player) {
    return [noAccents(player.name), withPoints(player.marketValue), dateToString(new Date(player.birth))];
}