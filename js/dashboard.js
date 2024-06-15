class Dashboard {
    constructor(game) {
        this.game = game;
        
        this.dollars = 14348550000000000;
        this.bananaCount = 0;
    }

    update() {
        this.bananaCount += this.game.plantation.harvestRate + this.game.plantation.workerRate;
    }
}

export default Dashboard;