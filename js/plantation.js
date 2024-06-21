class Plantation {
    static PLANT_TREE_COST_GROWTH = 1.14;
    static HIRE_WORKER_COST_GROWTH = 1.34;

    static BASE_HARVEST_RATE = 1;

    constructor(game) {
        this.game = game;

        this.plantTreeCost = 10;
        this.hireWorkerCost = 100;

        this.totalWorkerCount = 1;
        this.harvestWorkerCount = 0; // cutter+carrier+deleaf
        this.fertilizeWorkerCount = 0;
        this.irrigateWorkerCount = 0;
        // pest control
        // maintenance
        // pruning
    }

    tick() {
        return this.getBananaAmount();
    }
    
    getBananaAmount() {
        return Plantation.BASE_HARVEST_RATE * this.harvestWorkerCount;
    }

    getAvailableWorkerCount() {
        return this.totalWorkerCount - 
            this.harvestWorkerCount -
            this.fertilizeWorkerCount -
            this.irrigateWorkerCount;
    }

    plantTree() {
        if (this.game.dashboard.dollars >= this.plantTreeCost) {
            this.game.dashboard.dollars -= this.plantTreeCost;
            this.plantTreeCost = Math.ceil(this.plantTreeCost * Plantation.PLANT_TREE_COST_GROWTH);
            // this.treeCount += 1;
            // this.harvestRate += 1;
            // this.game.updateDisplay();
            this.game.updateOnPurchase();
        }
    }

    hireWorker() {
        if (this.game.dashboard.dollars >= this.hireWorkerCost) {
            this.game.dashboard.dollars -= this.hireWorkerCost;
            this.hireWorkerCost = Math.ceil(this.hireWorkerCost * Plantation.HIRE_WORKER_COST_GROWTH);
            this.totalWorkerCount++;
            this.game.updateOnPurchase();
            this.game.updateOnWorkerChange();
        }
    }

    addHarvestWorker() {
        if (this.getAvailableWorkerCount() > 0) {
            this.harvestWorkerCount++;
            this.game.updateOnWorkerChange();
        }
    }
    
    removeHarvestWorker() {
        if (this.harvestWorkerCount > 0) {
            this.harvestWorkerCount--;
            this.game.updateOnWorkerChange();
        }
    }
}

export default Plantation;