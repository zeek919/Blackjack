import { CURRENT_RATE, RATE_BUTTONS } from './constants/rateButtons';
import { GET_CARD_BTN } from './constants/playButtons';
import { getRate } from './helpers';
import { DeckService } from './services';

const deckService = new DeckService();
deckService.getDeck();

GET_CARD_BTN.addEventListener('click', async () => {
    if (deckService.remainigCard !== 0) {
        await deckService.getCard();
    } else {
        await deckService.getDeck();
        await deckService.getCard();
    }
});

getRate(RATE_BUTTONS, CURRENT_RATE);
