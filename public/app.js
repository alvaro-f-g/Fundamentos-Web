let playersContainer;
let playerWidth;

document.addEventListener('DOMContentLoaded', function () {
    playersContainer = document.getElementById("players");
    playerWidth = 250 + 2*20; // Ancho máximo de cada jugador + márgenes

    if (!sessionStorage.getItem('initialLoad')) {
        loadPlayers()
        sessionStorage.setItem('initialLoad', 'true');
    }
});

function calculateColumns() {
    const containerWidth = playersContainer.offsetWidth;
    const columns = Math.floor(containerWidth / playerWidth);

    return columns;
}

async function loadPlayers() {
    const amount = Math.max(2, Math.min(5, calculateColumns()));  // Entre 2 y 5 jugadores

    const response = await fetch(`/loadMore?amount=${amount}`);
    const newPlayers = await response.text();

    const playersContainer = document.getElementById("players");
    const empty = (playersContainer.innerHTML.includes("<p>No hay jugadores fichados aún</p>"));

    if (empty) {playersContainer.innerHTML = newPlayers}
    else {playersContainer.innerHTML += newPlayers}
}