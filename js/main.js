import Plantation from './plantation.js';
import Logistics from './logistics.js';
import Dashboard from './dashboard.js';
import Sales from './sales.js';

class Game {
    plantation = new Plantation(this);
    logistics = new Logistics(this);
    dashboard = new Dashboard(this);
    sales = new Sales(this);
    
    updateOnTick() {
        document.getElementById('dollars').innerText = formatNumber(game.dashboard.dollars);
        document.getElementById('banana-count').innerText = formatNumber(game.dashboard.bananaCount, false);
    }
    
    updateOnPurchase() {
        this.updateOnTick();
        document.getElementById('plant-tree-cost').innerText = formatNumber(game.plantation.plantTreeCost);
        document.getElementById('hire-worker-cost').innerText = formatNumber(game.plantation.hireWorkerCost);
        document.getElementById('random-placeholder').innerText = formatNumber(game.sales.hireWorkerCost);
    }
    
    updateOnWorkerChange() {
        document.getElementById('plantation-total-count').innerText = game.plantation.totalWorkerCount;
        document.getElementById('plantation-available-count').innerText = game.plantation.getAvailableWorkerCount();
        document.getElementById('harvest-worker-count').innerText = game.plantation.harvestWorkerCount;
        document.getElementById('harvest-rate').innerText = game.plantation.getBananaAmount();
        
        document.getElementById('sales-total-count').innerText = game.sales.totalWorkerCount;
        document.getElementById('sales-available-count').innerText = game.sales.getAvailableWorkerCount();
        document.getElementById('sales-worker-count').innerText = game.sales.salesWorkerCount;
        document.getElementById('sorting-worker-count').innerText = game.sales.sortingWorkerCount;
        document.getElementById('packaging-worker-count').innerText = game.sales.packagingWorkerCount;
        document.getElementById('freight-crew-worker-count').innerText = game.sales.freightCrewWorkerCount;
        document.getElementById('sell-value').innerText = game.sales.getSellValue();
        document.getElementById('sell-capacity').innerText = game.sales.getSellAmount();
    }
}

setInterval(() => {
    game.dashboard.update();
    game.updateOnTick();
}, 1000);

function formatNumber(number, isMoney = true) {
    let formattedNumber;
    if (number < 100000) {
        formattedNumber = Math.floor(number);
    } else if (number < 1000000) {
        formattedNumber = Math.floor(number*10 / 1000)/10 + "K";
    } else if (number < 1000000000) {
        formattedNumber = Math.floor(number*10/1000000)/10 + "M";
    } else if (number < 1000000000000) {
        formattedNumber = Math.floor(number*10/1000000000)/10 + "B";
    } else if (number < 1000000000000000) {
        formattedNumber = Math.floor(number*10/1000000000000)/10 + "T";
    } else if (number < 1000000000000000000) {
        formattedNumber = Math.floor(number*10/1000000000000000)/10 + "Q";
    }
    return (isMoney) ? "$" + formattedNumber : formattedNumber;
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
game.updateOnPurchase();
game.updateOnWorkerChange();

window.openTab = openTab;
window.plantation = game.plantation;
window.logistics = game.logistics;
window.sales = game.sales;