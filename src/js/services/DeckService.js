import axios from 'axios';
import { BASIC_URL, SINGLE_DECK_URL } from '../constants/deckURL';
import { specialCardValueChanger } from '../helpers';
import { showCard } from '../utils';

class DeckService {
    constructor() {
        this.deckId = null;
        this.remainigCard = 100;
        this.cardValue = null;
    }

    async getDeck() {
        try {
            const getDeck = await axios.get(SINGLE_DECK_URL);
            this.deckId = await getDeck.data.deck_id;
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }

    async getCard() {
        try {
            const getCard = await axios.get(`${BASIC_URL}${this.deckId}/draw/?count=1`);
            const currentCardImage = getCard.data.cards[0].image;
            this.remainigCard = await getCard.data.remaining;
            this.cardValue = specialCardValueChanger(getCard.data.cards[0].value);
            showCard(currentCardImage);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }
}

export default DeckService;
