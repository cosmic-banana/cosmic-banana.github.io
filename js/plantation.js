class Plantation {
    constructor(game) {
        this.game = game;

        this.treeCount = 1;
        this.plantBananaTreeCost = 10;
        this.hireWorkerCost = 100;
        this.workerCount = 0;
        this.workerRate = 0;
        this.harvestRate = 1;
    }

    plantTree() {
        if (this.game.dashboard.dollars >= 10) {
            this.game.dashboard.dollars -= 10;
            this.treeCount += 1;
            this.harvestRate += 1;
            this.game.updateDisplay();
        }
    }

    hireWorker() {
        if (this.game.dashboard.dollars >= 100) {
            this.game.dashboard.dollars -= 100;
            this.workerCount += 1;
            this.workerRate += 0.5;
            this.game.updateDisplay();
        }
    }
}

export default Plantation;