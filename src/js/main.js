import { CURRENT_RATE, RATE_BUTTONS } from './constants/rateButtons';
import { getCardBtn, passButton, everyButtons } from './constants/playButtons';
import { getRate, cardValueAdder, buttonLocker } from './helpers';
import { DeckService, BotPlayerService } from './services';
import { PLAYER_CARD_SUMMARY } from './constants/matchInfo';

const deckService = new DeckService();
const botPlayerService = new BotPlayerService(deckService);
deckService.deckData();

getCardBtn.addEventListener('click', async () => {
    if (deckService.remainigCard !== 0) {
        await deckService.getCard();
        cardValueAdder(deckService.cardValue, PLAYER_CARD_SUMMARY);
    } else {
        await deckService.deckData();
        await deckService.getCard();
        cardValueAdder(deckService.cardValue, PLAYER_CARD_SUMMARY);
    }
});

passButton.addEventListener('click', () => {
    botPlayerService.init();
    buttonLocker(true, everyButtons);
});

getRate(RATE_BUTTONS, CURRENT_RATE);
