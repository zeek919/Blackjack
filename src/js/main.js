import { currentRate, rateButtons } from './constants/rateButtons';
import { getCardBtn, passButton, everyButtons } from './constants/playButtons';
import { getRate, cardValueAdder, buttonLocker } from './helpers';
import { DeckService, BotPlayerService, MatchService } from './services';
import { playerCardSummary } from './constants/matchInfo';
import { BLACK_VALUE } from './constants/importantNumbers';

const matchService = new MatchService();
const deckService = new DeckService();
const botPlayerService = new BotPlayerService(deckService, matchService);
deckService.deckData();
matchService.cashButtonUsage();

getCardBtn.addEventListener('click', async () => {
    matchService.isCardDrawed = true;
    matchService.unlockPassButton();

    if (matchService.cashAmount !== null) {
        buttonLocker(true, rateButtons);
    }

    if (deckService.remainigCard !== 0) {
        await deckService.getCard();
        cardValueAdder(deckService.cardValue, playerCardSummary);
    } else {
        await deckService.deckData();
        await deckService.getCard();
        cardValueAdder(deckService.cardValue, playerCardSummary);
    }

    if (Number.parseInt(playerCardSummary.textContent, 10) === BLACK_VALUE) {
        matchService.setPlayerCardValue(playerCardSummary.textContent);
        passButton.click();
    }

    if (playerCardSummary.textContent > BLACK_VALUE) {
        matchService.setPlayerCardValue(playerCardSummary.textContent);
        matchService.finalResult();
    }
});

passButton.addEventListener('click', () => {
    matchService.setPlayerCardValue(playerCardSummary.textContent);
    botPlayerService.init();
    buttonLocker(true, everyButtons);
});

getRate(rateButtons, currentRate);
