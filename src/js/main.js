import { currentRate, rateButtons } from './constants/rateButtons';
import { getCardBtn, passButton, everyButtons } from './constants/playButtons';
import { getRate, cardValueAdder, buttonLocker } from './helpers';
import { DeckService, BotPlayerService, MatchService } from './services';
import { PLAYER_CARD_SUMMARY } from './constants/matchInfo';
import { BLACK_VALUE } from './constants/importantNumbers';

const matchService = new MatchService();
const deckService = new DeckService();
const botPlayerService = new BotPlayerService(deckService, matchService);
deckService.deckData();
matchService.cashButtonUsage();

getCardBtn.addEventListener('click', async () => {
    if (matchService.cashAmount !== null) {
        buttonLocker(true, rateButtons);
    }

    if (deckService.remainigCard !== 0) {
        await deckService.getCard();
        cardValueAdder(deckService.cardValue, PLAYER_CARD_SUMMARY);
    } else {
        await deckService.deckData();
        await deckService.getCard();
        cardValueAdder(deckService.cardValue, PLAYER_CARD_SUMMARY);
    }

    if (Number.parseInt(PLAYER_CARD_SUMMARY.textContent, 10) === BLACK_VALUE) {
        matchService.setPlayerCardValue(PLAYER_CARD_SUMMARY.textContent);
        passButton.click();
    }

    if (PLAYER_CARD_SUMMARY.textContent > BLACK_VALUE) {
        matchService.setPlayerCardValue(PLAYER_CARD_SUMMARY.textContent);
        matchService.finalResult();
    }
});

passButton.addEventListener('click', () => {
    matchService.setPlayerCardValue(PLAYER_CARD_SUMMARY.textContent);
    botPlayerService.init();
    buttonLocker(true, everyButtons);
});

getRate(rateButtons, currentRate);
