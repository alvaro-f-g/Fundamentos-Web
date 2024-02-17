const playerWidth = 250 + 2*20 + 2*1; // Ancho máximo de cada jugador + márgenes + bordes
let isGridColumns = localStorage.getItem('isGridColumns') ? localStorage.getItem('isGridColumns') === "true" : true;
let selectedPosition;
let players;

document.addEventListener('DOMContentLoaded', function () {
    players = document.getElementById("players");

    setFormat();
    loadPlayers();
    filter();
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
    else {players.insertAdjacentHTML("beforeend", newPlayers)}

    filterPlayersByPosition(selectedPosition);
    checkLoadMore();
}

async function search(event) {
    event.preventDefault();

    const info = document.getElementById('searchPlayer').value;
    const title = document.getElementById("title");

    const response = await fetch(`/search?info=${info}`);
    const results = await response.text();

    title.innerHTML = "<h2>Resultados de la busqueda: " + info + "</h2>";
    players.innerHTML = results;

    const loadMore = document.getElementById("loadPlayers");
    loadMore && loadMore.remove();
}

function setFormat() {
    const container = document.querySelector(".container");

    if (isGridColumns) {
        players.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
        container.style.width = "80%";
    } else {
        players.style.gridTemplateColumns = "1fr";
        container.style.width = "fit-content";
    }
}

function changeGrid() {
    isGridColumns = !isGridColumns;
    localStorage.setItem('isGridColumns', isGridColumns);
    setFormat();
}

function filter() {
    const positionFilter = document.getElementById('positionFilter');
    positionFilter.addEventListener('click', function (event) {
        selectedPosition = event.target.dataset.value;
        filterPlayersByPosition(selectedPosition);
    });
}

function checkFilterMessage() {
    const filterMessage = document.getElementById("filter-message");
    filterMessage && filterMessage.remove();
}


function filterPlayersByPosition(position) {
    let hidden = false;
    let shown = false;

    checkFilterMessage();

    if (position === undefined) {
        players.querySelectorAll(`a`).forEach(player => {
            player.style.display = 'block';
        });
        return;
    }

    const selectedPlayers = players.querySelectorAll(`a[data-position="${position}"]`);
    selectedPlayers.forEach(player => {
        player.style.display = 'block';
        shown = true;
    });

    const otherPlayers = players.querySelectorAll(`a:not([data-position="${position}"])`);
    otherPlayers.forEach(player => {
        player.style.display = 'none';
        hidden = true;
    });

    if (!shown && hidden) {
        if (position === "Banquillo") {players.insertAdjacentHTML("beforeend", "<p id='filter-message'>No hay jugadores en el banquillo</p>")}
        else {players.insertAdjacentHTML("beforeend", "<p id='filter-message'>No hay jugadores que juegen de "+ position.toLowerCase() +"</p>")}
    }
}