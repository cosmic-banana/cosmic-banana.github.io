let bananaCount = 0;
let treeCount = 1;
let harvestRate = 1;

function updateDashboard() {
    document.getElementById('banana-count').innerText = bananaCount;
    document.getElementById('tree-count').innerText = treeCount;
    document.getElementById('harvest-rate').innerText = harvestRate;
}

function plantTree() {
    treeCount += 1;
    harvestRate += 1;
    updateDashboard();
}

function harvestBananas() {
    bananaCount += treeCount;
    updateDashboard();
}

setInterval(() => {
    bananaCount += harvestRate;
    updateDashboard();
}, 1000);

updateDashboard();
