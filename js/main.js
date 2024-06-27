import Production from './production.js';
import Logistics from './logistics.js';
import Dashboard from './dashboard.js';
import Sales from './sales.js';
import Administration from './administration.js';

class Game {
    production = new Production(this);
    logistics = new Logistics(this);
    dashboard = new Dashboard(this);
    sales = new Sales(this);
    administration = new Administration(this);
    
    updateOnTick() {
        document.getElementById('dollars').innerText = formatNumber(game.dashboard.dollars);
        document.getElementById('banana-count').innerText = formatNumber(game.dashboard.bananaCount, false);
    }
    
    updateOnPurchase() {
        this.updateOnTick();
        document.getElementById('plant-tree-cost').innerText = formatNumber(game.production.plantTreeCost);
        document.getElementById('hire-worker-cost').innerText = formatNumber(game.administration.hireWorkerCost);
    }
    
    updateOnWorkerChange() {
        document.getElementById('harvest-rate').innerText = game.production.getBananaAmount();
        document.getElementById('production-total-count').innerText = game.administration.workerCount;
        document.getElementById('production-available-count').innerText = game.administration.getAvailableWorkerCount();
        document.getElementById('harvest-worker-count').innerText = game.production.harvestWorkerCount;
        document.getElementById('fertilize-worker-count').innerText = game.production.fertilizeWorkerCount;
        document.getElementById('irrigate-worker-count').innerText = game.production.irrigateWorkerCount;
        document.getElementById('pest-control-worker-count').innerText = game.production.pestControlWorkerCount;
        document.getElementById('maintenance-worker-count').innerText = game.production.maintenanceWorkerCount;
        document.getElementById('prune-worker-count').innerText = game.production.pruningWorkerCount;
        
        document.getElementById('sell-value').innerText = game.sales.getSellValue();
        document.getElementById('sell-capacity').innerText = game.sales.getSellAmount();
        document.getElementById('sales-total-count').innerText = game.administration.workerCount;
        document.getElementById('sales-available-count').innerText = game.administration.getAvailableWorkerCount();
        document.getElementById('sales-worker-count').innerText = game.sales.salesWorkerCount;
        document.getElementById('sorting-worker-count').innerText = game.sales.sortingWorkerCount;
        document.getElementById('packaging-worker-count').innerText = game.sales.packagingWorkerCount;
        document.getElementById('freight-crew-worker-count').innerText = game.sales.freightCrewWorkerCount;
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

function openTab(tabName, element) {
    var i, tabContent, tabButton
    var isTabOpen = element.className.includes("active");
    var tabType = element.className.split(" ")[0].split("-").slice(0,-1).join("-");
    tabContent = document.getElementsByClassName(tabType + "-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabButton = document.getElementsByClassName(tabType + "-button");
    for (i = 0; i < tabButton.length; i++) {
        tabButton[i].className = tabButton[i].className.replace(" active", "");
    }
    if (!isTabOpen) {
        element.className += " active";
        document.getElementById(tabName).style.display = "block";
    }
}

const game = new Game();
game.updateOnPurchase();
game.updateOnWorkerChange();

window.openTab = openTab;
window.production = game.production;
window.logistics = game.logistics;
window.sales = game.sales;
window.administration = game.administration;