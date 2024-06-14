import Plantation from './plantation.js';
import Logistics from './logistics.js';
import Dashboard from './dashboard.js';

class Game {
    plantation = new Plantation(this);
    logistics = new Logistics(this);
    dashboard = new Dashboard(this);

    updateDisplay() {
        document.getElementById('banana-count').innerText = game.dashboard.bananaCount;
        document.getElementById('dollars').innerText = game.dashboard.dollars;

        document.getElementById('tree-count').innerText = game.plantation.treeCount;
        document.getElementById('harvest-rate').innerText = game.plantation.harvestRate;
        document.getElementById('worker-count').innerText = game.plantation.workerCount;

        document.getElementById('bananas-packed').innerText = game.logistics.bananasPacked;
        document.getElementById('packed-banana-count').innerText = game.logistics.packedBananaCount;
        document.getElementById('market-price').innerText = game.logistics.marketPrice;
    }
}

setInterval(() => {
    game.dashboard.update();
    game.updateDisplay();
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

const game = new Game();

window.openTab = openTab;
window.plantation = game.plantation;
window.logistics = game.logistics;