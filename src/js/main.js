import { CURRENT_RATE, RATE_BUTTONS } from './constants/rateButtons';
import { GET_CARD_BTN, EVERY_BTN } from './constants/playButtons';
import { getRate, cardValueAdder } from './helpers';
import { DeckService } from './services';
import { PLAYER_CARD_SUMMARY } from './constants/matchInfo';

const deckService = new DeckService();
deckService.deckData();

GET_CARD_BTN.addEventListener('click', async () => {
    if (deckService.remainigCard !== 0) {
        await deckService.getCard();
        // console.log(PLAYER_CARD_SUMMARY);
        cardValueAdder(deckService.cardValue, PLAYER_CARD_SUMMARY, EVERY_BTN);
    } else {
        await deckService.deckData();
        await deckService.getCard();
        cardValueAdder(deckService.cardValue, PLAYER_CARD_SUMMARY, EVERY_BTN);
    }
});

getRate(RATE_BUTTONS, CURRENT_RATE);
