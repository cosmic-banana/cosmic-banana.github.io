class Sales {
    static HIRE_WORKER_COST_GROWTH = 1.34;

    static BASE_SELL_AMOUNT = 1;
    static BASE_SELL_PRICE = 1;

    constructor(game) {
        this.game = game;

        this.hireWorkerCost = 100;

        this.totalWorkerCount = 1;
        this.salesWorkerCount = 0;
    }

    getIncome() {
        let maxBananasToSell = Sales.BASE_SELL_AMOUNT * this.salesWorkerCount;
        let bananasToSell = Math.min(maxBananasToSell, this.game.dashboard.bananaCount);
        this.game.dashboard.bananaCount -= bananasToSell;
        return bananasToSell * Sales.BASE_SELL_PRICE;
    }

    getAvailableWorkerCount() {
        return this.totalWorkerCount - 
            this.salesWorkerCount;
    }

    hireWorker() {
        if (this.game.dashboard.dollars >= this.hireWorkerCost) {
            this.game.dashboard.dollars -= this.hireWorkerCost;
            this.hireWorkerCost = Math.ceil(this.hireWorkerCost * Sales.HIRE_WORKER_COST_GROWTH);
            this.totalWorkerCount++;
            this.game.updateDisplay();
            this.game.updatePrices();
            this.game.updateWorkerCount();
        }
    }

    addSalesWorker() {
        if (this.getAvailableWorkerCount() > 0) {
            this.salesWorkerCount++;
            this.game.updateWorkerCount();
        }
    }
    
    removeSalesWorker() {
        if (this.salesWorkerCount > 0) {
            this.salesWorkerCount--;
            this.game.updateWorkerCount();
        }
    }
}

export default Sales;