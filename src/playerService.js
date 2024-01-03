let players = new Map();
let playersNames = new Set();
let nextId = 0;
let freesIdArray = [];

export function addPlayer(player) {
    isNew(player.name);
    player.checkValues();

    player.id = freesIdArray.length ? freesIdArray.pop() : nextId++;  // Si hay ids que han quedado libres se usará uno de ellos, sino se creará uno nuevo
    playersNames.add(player.name);
    players.set(player.id, player);
}

export function addSubelement(player, subelement) {
    subelement.checkValues();

    player.subelements.push(subelement);
}

export function editPlayer(oldPlayer, newPlayer) {
    if (newPlayer.name != oldPlayer.name) isNew(newPlayer.name);
    playersNames.delete(oldPlayer.name);
    playersNames.add(newPlayer.name);
    newPlayer.checkValues();

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

function isNew(name) {
    if (playersNames.has(name)) throw new Error("Ya existe un jugador con ese nombre");
}