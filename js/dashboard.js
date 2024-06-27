class Dashboard {
    constructor(game) {
        this.game = game;
        
        this.dollars = 30000;
        this.bananaCount = 0;
    }

    update() {
        this.bananaCount += this.game.production.tick();
        this.dollars += this.game.sales.tick();
    }
}

export default Dashboard;