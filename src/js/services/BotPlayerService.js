import { specialCardValueChanger } from '../helpers';

class BotPlayerService {
    constructor(deckService) {
        this.deckService = deckService;
        this.cardPropability = {};
    }

    init() {
        this.cardPropability = this.calculateChance();
    }

    calculateChance() {
        const cardPropability = { 11: 0 };
        const cardInGame = this.deckService.remainigCard;

        Object.keys(this.deckService.cardStatus).forEach(card => {
            const singlePropability = parseFloat(
                (this.deckService.cardStatus[card] * 100) / cardInGame
            ).toFixed(2);
            cardPropability[card] = singlePropability;

            const translatedCard = specialCardValueChanger(card);
            if (typeof translatedCard === typeof 1) {
                const parsedTranslatedValue = Number.parseFloat(cardPropability[translatedCard]);
                const parsedCardValue = Number.parseFloat(cardPropability[card]);
                const result = parsedTranslatedValue + parsedCardValue;

                cardPropability[translatedCard] = Number.parseFloat(result).toFixed(2);
            }

            if (card.length >= 3) {
                delete cardPropability[card];
            }
        });

        return cardPropability;
    }
}

export default BotPlayerService;
