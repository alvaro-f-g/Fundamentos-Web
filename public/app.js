let players;
const playerWidth = 250 + 2*20; // Ancho máximo de cada jugador + márgenes

document.addEventListener('DOMContentLoaded', function () {
    players = document.getElementById("players");

    loadPlayers();
});

function calculateColumns() {
    const containerWidth = players.offsetWidth;
    const columns = Math.floor(containerWidth / playerWidth);

    return columns;
}

async function checkLoadMore() {
    const response = await fetch(`/allPlayersLoaded`);
    const allPlayersLoaded = await response.json();

    const loadMore = document.getElementById("loadPlayers");

    if (allPlayersLoaded.value) loadMore.remove();
}

async function loadPlayers() {
    const from = players.childElementCount;
    const amount = Math.max(2, Math.min(5, calculateColumns()));  // Entre 2 y 5 jugadores

    const response = await fetch(`/loadPlayers?from=${from}&amount=${amount}`);
    const newPlayers = await response.text();

    if (from == 0) {players.innerHTML = newPlayers}
    else {players.innerHTML += newPlayers}

    checkLoadMore();
}