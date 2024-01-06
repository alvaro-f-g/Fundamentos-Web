const NUM_RESULTS = 5;

let loadMoreRequest = 0;

async function loadMore() {

    const from = (loadMoreRequest+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;

    const response = await fetch(`/players?from=${from}&to=${to}`);

    const newPlayers = await response.json();

    const playersContainer = document.getElementById("players-container");

    playersContainer.innerHTML += newPlayers;

    loadMoreRequest++;
}