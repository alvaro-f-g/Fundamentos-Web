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

async function loadPlayers() {
    const empty = players.innerHTML.includes("<p>No hay jugadores fichados aún</p>");
    const playersNumber = empty ? 0: players.childElementCount;

    const from = playersNumber;
    const amount = Math.max(2, Math.min(5, calculateColumns()));  // Entre 2 y 5 jugadores

    const response = await fetch(`/loadMore?from=${from}&amount=${amount}`);
    const newPlayers = await response.text();

    if (newPlayers && newPlayers != "<div id='notLoadMore'></div>") {
        if (empty) {players.innerHTML = newPlayers}
        else {players.innerHTML += newPlayers}
    }

    const loadMore = document.getElementById("loadPlayers");
    const notLoadMore = document.getElementById("notLoadMore");
    if (notLoadMore) {
        notLoadMore.remove();
        loadMore && loadMore.remove();
    }
}

async function search() {
    const info = document.getElementById('searchPlayer').value;

    const response = await fetch(`/search?info=${info}`);
    const results = await response.text();

    const title = document.getElementById("title");
    title.innerHTML = "<h2>Resultados de la busqueda: " + info + "</h2>";

    if (results) {players.innerHTML = results}
    else {players.innerHTML = "<p>No hay resultados</p>"}
}