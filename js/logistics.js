class Logistics {
    constructor(game) {
        this.game = game;

        this.packedBananaCount = 0;
        this.bananasPacked = 0;
        this.marketPrice = 2;
    }

    packageBananas() {
        if (this.game.dashboard.bananaCount >= 10) {
            this.game.dashboard.bananaCount -= 10;
            this.bananasPacked += 10;
            this.packedBananaCount += 10;
            this.game.updateDisplay();
        }
    }

    sellBananas() {
        let profit = this.packedBananaCount * this.marketPrice;
        this.packedBananaCount = 0;
        this.game.dashboard.dollars += profit;
        this.game.updateDisplay();
    }
}

export default Logistics;