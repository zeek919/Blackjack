import { botCardSummary } from '../constants/matchInfo';
import { BLACK_VALUE } from '../constants/importantNumbers';
import { specialCardValueChanger, cardValueAdder } from '../helpers';

class BotPlayerService {
    constructor(deckService, matchService) {
        this.matchService = matchService;
        this.deckService = deckService;
        this.cardStaus = this.deckService.cardStatus;
        this.cardPropability = {};
        this.drawedCard = null;
        this.currentResult = null;
    }

    async init() {
        this.currentResult = 0;
        this.deckService.cardValue = 0;
        this.winChance = 0;
        this.cardPropability = this.calculateChance();
        this.drawAction();
    }

    calculateChance() {
        const cardPropability = { 11: 0 };
        const cardInGame = this.deckService.remainigCard;

        Object.keys(this.cardStaus).forEach(card => {
            const singlePropability = parseFloat(
                (this.deckService.cardStatus[card] * 100) / cardInGame
            ).toFixed(2);
            cardPropability[card] = singlePropability;

            const translatedCard = specialCardValueChanger(card);
            if (typeof translatedCard === typeof Number) {
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
        const valueToWin = BLACK_VALUE - this.currentResult;
        Object.keys(this.cardPropability).forEach(item => {
            if (item <= valueToWin) {
                this.winChance += Number.parseFloat(this.cardPropability[item]);
            }
        });
    }

    drawAction() {
        let IS_FINAL_RESULT = false;
        const draw = window.setInterval(async () => {
            await this.deckService.getCard();
            this.currentResult += parseInt(this.deckService.cardValue, 10);
            this.nextDrawChance();
            cardValueAdder(this.deckService.cardValue, botCardSummary);
            if (this.winChance <= 30) {
                IS_FINAL_RESULT = true;
                clearInterval(draw);
            }

            if (IS_FINAL_RESULT) {
                this.matchService.setBotCardValue(botCardSummary.textContent);
                this.matchService.finalResult();
            }

            this.winChance = 0;
        }, 1500);
    }
}

export default BotPlayerService;
