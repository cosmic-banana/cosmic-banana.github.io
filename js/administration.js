class Administration {
    static HIRE_WORKER_COST_GROWTH = 1.34;

    constructor(game) {
        this.game = game;

        this.hireWorkerCost = 100;

        this.workerCount = 1;
    }

    getAvailableWorkerCount() {
        return this.workerCount - 
            this.game.production.harvestWorkerCount -
            this.game.production.fertilizeWorkerCount -
            this.game.production.irrigateWorkerCount -
            this.game.production.pestControlWorkerCount -
            this.game.production.maintenanceWorkerCount -
            this.game.production.pruningWorkerCount -
            this.game.sales.salesWorkerCount -
            this.game.sales.sortingWorkerCount -
            this.game.sales.packagingWorkerCount -
            this.game.sales.freightCrewWorkerCount;
    }

    hireWorker() {
        if (this.game.dashboard.dollars >= this.hireWorkerCost) {
            this.game.dashboard.dollars -= this.hireWorkerCost;
            this.hireWorkerCost = Math.ceil(this.hireWorkerCost * Administration.HIRE_WORKER_COST_GROWTH);
            this.workerCount++;
            this.game.updateOnPurchase();
            this.game.updateOnWorkerChange();
        }
    }

}

export default Administration;