class Plantation {
    static PLANT_TREE_COST_GROWTH = 1.14;
    static HIRE_WORKER_COST_GROWTH = 1.34;

    constructor(game) {
        this.game = game;

        this.treeCount = 1;
        this.plantTreeCost = 10;
        this.hireWorkerCost = 100;
        this.workerCount = 0;
        this.workerRate = 0;
        this.harvestRate = 1;
    }

    plantTree() {
        if (this.game.dashboard.dollars >= this.plantTreeCost) {
            this.game.dashboard.dollars -= this.plantTreeCost;
            this.plantTreeCost = Math.ceil(this.plantTreeCost * Plantation.PLANT_TREE_COST_GROWTH);
            this.treeCount += 1;
            this.harvestRate += 1;
            this.game.updateDisplay();
            this.game.updatePrices();
        }
    }

    hireWorker() {
        if (this.game.dashboard.dollars >= this.hireWorkerCost) {
            this.game.dashboard.dollars -= this.hireWorkerCost;
            this.hireWorkerCost = Math.ceil(this.hireWorkerCost * Plantation.HIRE_WORKER_COST_GROWTH);
            this.workerCount += 1;
            this.workerRate += 0.5;
            this.game.updateDisplay();
            this.game.updatePrices();
        }
    }
}

export default Plantation;