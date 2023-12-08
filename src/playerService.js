let players = new Map();
let nextId = 0;
let freesIdArray = [];
let freesIdSet = new Set();

export function addPlayer(player) {
    player.id = freesIdArray.length ? freesIdArray.pop() : nextId++;  // Si hay ids que han quedado libres se usará uno de ellos, sino se creará uno nuevo
    players.set(player.id, player);
}
export function editPlayer(id,player){
    player.id = id;
    players.set(id,equipo);
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