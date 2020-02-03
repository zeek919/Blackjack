import axios from 'axios';
import { BASIC_URL, SINGLE_DECK_URL } from '../constants/deckURL';
import { specialCardValueChanger } from '../helpers';
import { showCard } from '../utils';

class DeckService {
    constructor() {
        this.deckId = null;
        this.remainigCard = 100;
        this.cardValue = null;

        this.cardStatus = {
            ACE: 4,
            KING: 4,
            QUEEN: 4,
            JACK: 4,
            10: 4,
            9: 4,
            8: 4,
            7: 4,
            6: 4,
            5: 4,
            4: 4,
            3: 4,
            2: 4,
        };
    }

    async deckData() {
        try {
            const getDeck = await axios.get(SINGLE_DECK_URL);
            this.deckId = getDeck.data.deck_id;
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
            this.correctCardStatus(getCard.data.cards[0].value);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }

    correctCardStatus(card) {
        if (this.remainigCard === 0) {
            Object.keys(this.cardStatus).forEach(item => {
                this.cardStatus[item] = 4;
            });
        }
        this.cardStatus[card] -= 1;
    }
}

export default DeckService;
