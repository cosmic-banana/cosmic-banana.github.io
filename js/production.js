class Production {
    static PLANT_TREE_COST_GROWTH = 1.14;
    static HIRE_WORKER_COST_GROWTH = 1.34;

    static BASE_HARVEST_RATE = 1;

    constructor(game) {
        this.game = game;

        this.plantTreeCost = 10;
        this.hireWorkerCost = 100;

        this.harvestWorkerCount = 0; // cutter+carrier+deleaf
        this.fertilizeWorkerCount = 0;
        this.irrigateWorkerCount = 0;
        this.pestControlWorkerCount = 0;
        this.maintenanceWorkerCount = 0;
        this.pruningWorkerCount = 0;
    }

    tick() {
        return this.getBananaAmount();
    }
    
    getBananaAmount() {
        return Production.BASE_HARVEST_RATE * this.harvestWorkerCount;
    }

    plantTree() {
        if (this.game.dashboard.dollars >= this.plantTreeCost) {
            this.game.dashboard.dollars -= this.plantTreeCost;
            this.plantTreeCost = Math.ceil(this.plantTreeCost * Production.PLANT_TREE_COST_GROWTH);
            this.game.updateOnPurchase();
        }
    }

    addWorker(job) {
        if (this.game.administration.getAvailableWorkerCount() == 0)
            return;

        switch(job) {
            case "harvesting":
                this.harvestWorkerCount++;
                break;
            case "fertilizing":
                this.fertilizeWorkerCount++;
                break;
            case "irrigation":
                this.irrigateWorkerCount++;
                break;
            case "pestControl":
                this.pestControlWorkerCount++;
                break;
            case "maintenance":
                this.maintenanceWorkerCount++;
                break;
            case "pruning":
                this.pruningWorkerCount++;
                break;
        }
        this.game.updateOnWorkerChange();
    }
    
    removeWorker(job) {
        if (job === "harvesting") {
            if (this.harvestWorkerCount > 0)
                this.harvestWorkerCount--;
        } else if (job === "fertilizing") {
            if (this.fertilizeWorkerCount > 0)
                this.fertilizeWorkerCount--;
        } else if (job === "irrigation") {
            if (this.irrigateWorkerCount > 0)
                this.irrigateWorkerCount--;
        } else if (job === "pestControl") {
            if (this.pestControlWorkerCount > 0)
                this.pestControlWorkerCount--;
        } else if (job === "maintenance") {
            if (this.maintenanceWorkerCount > 0)
                this.maintenanceWorkerCount--;
        } else if (job === "pruning") {
            if (this.pruningWorkerCount > 0)
                this.pruningWorkerCount--;
        }
        this.game.updateOnWorkerChange();
    }
}

export default Production;