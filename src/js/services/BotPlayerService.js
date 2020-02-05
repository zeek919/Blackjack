import { BOT_CARD_SUMMARY } from '../constants/matchInfo';
import { BLACKJACK } from '../constants/importantNumbers';
import { specialCardValueChanger, cardValueAdder } from '../helpers';

class BotPlayerService {
    constructor(deckService) {
        this.deckService = deckService;
        this.cardPropability = {};
        this.drawedCard = null;
        this.currentResult = null;
    }

    init() {
        this.currentResult = 0;
        this.deckService.cardValue = 0;
        this.winChance = 0;
        this.cardPropability = this.calculateChance();
        this.drawAction();
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

    nextDrawChance() {
        const valueToWin = BLACKJACK - this.currentResult;
        Object.keys(this.cardPropability).forEach(item => {
            if (item <= valueToWin) {
                this.winChance += Number.parseFloat(this.cardPropability[item]);
            }
        });
    }

    drawAction() {
        const draw = window.setInterval(async () => {
            await this.deckService.getCard();
            this.currentResult += parseInt(this.deckService.cardValue, 10);
            this.nextDrawChance();
            cardValueAdder(this.deckService.cardValue, BOT_CARD_SUMMARY);
            if (this.winChance <= 50) {
                clearInterval(draw);
            }

            this.winChance = 0;
        }, 1500);
    }
}

export default BotPlayerService;
