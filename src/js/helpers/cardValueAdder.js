import { BALCKJACK } from '../constants/importantNumbers';

/* eslint-disable no-param-reassign */
const cardValueAdder = (cardValue, handler, buttons) => {
    const parsedHandler = parseInt(handler.textContent, 10);
    const parsedCardValue = parseInt(cardValue, 10);
    const summaryValue = parsedHandler + parsedCardValue;

    if (summaryValue > BALCKJACK) {
        buttons.forEach(item => {
            item.disabled = true;
        });
        handler.textContent = summaryValue;
    } else {
        handler.textContent = summaryValue;
    }
};

export default cardValueAdder;
