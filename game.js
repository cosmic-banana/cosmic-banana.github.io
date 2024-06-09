let bananaCount = 0;
let treeCount = 1;
let harvestRate = 1;
let workerCount = 0;
let workerRate = 0;
let packagingLevel = 1;
let bananasPacked = 0;
let packedBananaCount = 0;
let marketPrice = 2;
let totalProfit = 0;

function updateDashboard() {
    document.getElementById('banana-count').innerText = bananaCount;
    document.getElementById('tree-count').innerText = treeCount;
    document.getElementById('harvest-rate').innerText = harvestRate;
    document.getElementById('worker-count').innerText = workerCount;
    document.getElementById('packaging-level').innerText = packagingLevel;
    document.getElementById('bananas-packed').innerText = bananasPacked;
    document.getElementById('packed-banana-count').innerText = packedBananaCount;
    document.getElementById('market-price').innerText = marketPrice;
    document.getElementById('total-profit').innerText = totalProfit;
}

function plantTree() {
    if (bananaCount >= 10) {
        bananaCount -= 10;
        treeCount += 1;
        harvestRate += 1;
    }
    updateDashboard();
}

function hireWorker() {
    if (bananaCount >= 20) {
        bananaCount -= 20;
        workerCount += 1;
        workerRate += 0.5;
    }
    updateDashboard();
}

function upgradePackaging() {
    if (bananaCount >= 50) {
        bananaCount -= 50;
        packagingLevel += 1;
    }
    updateDashboard();
}

function harvestBananas() {
    bananaCount += treeCount;
    updateDashboard();
}

function packageBananas() {
    if (bananaCount >= 10 * packagingLevel) {
        bananaCount -= 10 * packagingLevel;
        bananasPacked += 10 * packagingLevel;
        packedBananaCount += 10;
    }
    updateDashboard();
}

function sellBananas() {
    let profit = packedBananaCount * marketPrice;
    packedBananaCount = 0;
    totalProfit += profit;
    updateDashboard();
}

setInterval(() => {
    bananaCount += harvestRate + workerRate;
    updateDashboard();
}, 1000);

function openTab(tabName) {
    var i, tabContent, tabButton;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabButton = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButton.length; i++) {
        tabButton[i].className = tabButton[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
}

updateDashboard();
