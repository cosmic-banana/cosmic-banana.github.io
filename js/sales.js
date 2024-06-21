class Sales {
    static HIRE_WORKER_COST_GROWTH = 1.34;

    static BASE_SELL_AMOUNT = 1;
    static BASE_SELL_PRICE = 1;

    static PACKAGING_INITIAL_MULTIPLIER = 2;
    static PACKAGING_DIMINISHING_MULTIPLIER = .6;
    static INCREASE_PER_SORTER = .5;
    static INCREASE_PER_FREIGHT_CREW = 1;
    static FREIGHT_INITIAL_MULTIPLIER = 3;
    static FREIGHT_DIMINISHING_MULTIPLIER = .6;

    constructor(game) {
        this.game = game;

        this.hireWorkerCost = 100;

        this.totalWorkerCount = 1;
        this.salesWorkerCount = 0;
        this.sortingWorkerCount = 0;
        this.packagingWorkerCount = 0;
        this.freightCrewWorkerCount = 0;
        // cargo crew
        // grading
        // processing (delay ripening)
    }

    tick() {
        let bananasToSell = Math.min(this.getSellAmount(), this.game.dashboard.bananaCount);
        this.game.dashboard.bananaCount -= bananasToSell;
        return bananasToSell * this.getSellValue();
    }

    getSellValue() {
        return Sales.BASE_SELL_PRICE * this.getSortingBoost() * this.getFreightPriceBoost();
    }

    getSellAmount() {
        return Math.round(Sales.BASE_SELL_AMOUNT * this.salesWorkerCount 
            * this.getPackagingBoost() * this.getFreightAmountBoost());
    }

    getFreightPriceBoost() {
        return 1 + this.freightCrewWorkerCount * Sales.INCREASE_PER_FREIGHT_CREW;
    }

    getFreightAmountBoost() {
        if (this.freightCrewWorkerCount == 0)
            return 1;
        let boost = 0;
        for (let i = 0; i < this.freightCrewWorkerCount; i++) {
            boost += Sales.FREIGHT_INITIAL_MULTIPLIER * Math.pow(Sales.FREIGHT_DIMINISHING_MULTIPLIER, i);
        }
        return boost;
    }

    getSortingBoost() {
        return 1 + this.sortingWorkerCount * Sales.INCREASE_PER_SORTER;
    }
    
    getPackagingBoost() { //first ones are more powerful than salesman. counter with late unlock or nerf value.
        if (this.packagingWorkerCount == 0)
            return 1;
        let boost = 0;
        for (let i = 0; i < this.packagingWorkerCount; i++) {
            boost += Sales.PACKAGING_INITIAL_MULTIPLIER * Math.pow(Sales.PACKAGING_DIMINISHING_MULTIPLIER, i);
        }
        return boost; //2, 3.2, 3.94 [. . .]
    }

    getAvailableWorkerCount() {
        return this.totalWorkerCount - 
            this.salesWorkerCount -
            this.sortingWorkerCount -
            this.packagingWorkerCount -
            this.freightCrewWorkerCount;
    }

    hireWorker() {
        if (this.game.dashboard.dollars >= this.hireWorkerCost) {
            this.game.dashboard.dollars -= this.hireWorkerCost;
            this.hireWorkerCost = Math.ceil(this.hireWorkerCost * Sales.HIRE_WORKER_COST_GROWTH);
            this.totalWorkerCount++;
            this.game.updateOnPurchase();
            this.game.updateOnWorkerChange();
        }
    }

    addSalesWorker() {
        if (this.getAvailableWorkerCount() > 0) {
            this.salesWorkerCount++;
            this.game.updateOnWorkerChange();
        }
    }
    
    removeSalesWorker() {
        if (this.salesWorkerCount > 0) {
            this.salesWorkerCount--;
            this.game.updateOnWorkerChange();
        }
    }

    addSortingWorker() {
        if (this.getAvailableWorkerCount() > 0) {
            this.sortingWorkerCount++;
            this.game.updateOnWorkerChange();
        }
    }
    
    removeSortingWorker() {
        if (this.sortingWorkerCount > 0) {
            this.sortingWorkerCount--;
            this.game.updateOnWorkerChange();
        }
    }

    addPackagingWorker() {
        if (this.getAvailableWorkerCount() > 0) {
            this.packagingWorkerCount++;
            this.game.updateOnWorkerChange();
        }
    }
    
    removePackagingWorker() {
        if (this.packagingWorkerCount > 0) {
            this.packagingWorkerCount--;
            this.game.updateOnWorkerChange();
        }
    }

    addFreightCrewWorker() {
        if (this.getAvailableWorkerCount() > 0) {
            this.freightCrewWorkerCount++;
            this.game.updateOnWorkerChange();
        }
    }
    
    removeFreightCrewWorker() {
        if (this.freightCrewWorkerCount > 0) {
            this.freightCrewWorkerCount--;
            this.game.updateOnWorkerChange();
        }
    }

}

export default Sales;