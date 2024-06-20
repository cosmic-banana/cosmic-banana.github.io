class Dashboard {
    constructor(game) {
        this.game = game;
        
        this.dollars = 1000;
        this.bananaCount = 0;
    }

    update() {
        this.bananaCount += this.game.plantation.getBananas();
        this.dollars += this.game.sales.getIncome();
    }
}

export default Dashboard;