class BotPlayerService {
    constructor(deckService) {
        this.deckService = deckService;
    }

    init() {
        this.calculateChance();
    }

    calculateChance() {
        const cardInGame = this.deckService.remainigCard;
        const cardPropability = {};

        Object.keys(this.deckService.cardStatus).forEach(card => {
            const singlePropability = parseFloat(
                (this.deckService.cardStatus[card] * 100) / cardInGame
            ).toFixed(2);
            cardPropability[card] = singlePropability;
        });
    }
}

export default BotPlayerService;
