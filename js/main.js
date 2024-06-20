import Plantation from './plantation.js';
import Logistics from './logistics.js';
import Dashboard from './dashboard.js';
import Sales from './sales.js';

class Game {
    plantation = new Plantation(this);
    logistics = new Logistics(this);
    dashboard = new Dashboard(this);
    sales = new Sales(this);
    
    updateDisplay() {
        document.getElementById('banana-count').innerText = game.dashboard.bananaCount;
        document.getElementById('dollars').innerText = formatNumber(game.dashboard.dollars);

        // document.getElementById('tree-count').innerText = game.plantation.treeCount;
        // document.getElementById('harvest-rate').innerText = game.plantation.harvestRate;
        // document.getElementById('worker-count').innerText = game.plantation.workerCount;

        document.getElementById('bananas-packed').innerText = game.logistics.bananasPacked;
        document.getElementById('packed-banana-count').innerText = game.logistics.packedBananaCount;
        document.getElementById('market-price').innerText = game.logistics.marketPrice;
    }

    updatePrices() {
        document.getElementById('plant-tree-cost').innerText = formatNumber(game.plantation.plantTreeCost);
        document.getElementById('hire-worker-cost').innerText = formatNumber(game.plantation.hireWorkerCost);
        document.getElementById('random-placeholder').innerText = formatNumber(game.sales.hireWorkerCost);
    }
    
    updateWorkerCount() {
        document.getElementById('plantation-total-count').innerText = game.plantation.totalWorkerCount;
        document.getElementById('plantation-available-count').innerText = game.plantation.getAvailableWorkerCount();
        document.getElementById('harvest-worker-count').innerText = game.plantation.harvestWorkerCount;

        document.getElementById('sales-total-count').innerText = game.sales.totalWorkerCount;
        document.getElementById('sales-available-count').innerText = game.sales.getAvailableWorkerCount();
        document.getElementById('sales-worker-count').innerText = game.sales.salesWorkerCount;
    }
}

setInterval(() => {
    game.dashboard.update();
    game.updateDisplay();
}, 1000);

function formatNumber(number) {
    if (number < 100000) {
        return "$" + number;
    } else if (number < 1000000) {
        return "$" + Math.floor(number*10 / 1000)/10 + "K";
    } else if (number < 1000000000) {
        return "$" + Math.floor(number*10/1000000)/10 + "M";
    } else if (number < 1000000000000) {
        return "$" + Math.floor(number*10/1000000000)/10 + "B";
    } else if (number < 1000000000000000) {
        return "$" + Math.floor(number*10/1000000000000)/10 + "T";
    } else if (number < 1000000000000000000) {
        return "$" + Math.floor(number*10/1000000000000000)/10 + "Q";
    }
}

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

const game = new Game();
game.updatePrices();
game.updateWorkerCount();

window.openTab = openTab;
window.plantation = game.plantation;
window.logistics = game.logistics;
window.sales = game.sales;