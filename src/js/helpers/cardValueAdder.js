import { BLACK_VALUE } from '../constants/importantNumbers';
/* eslint-disable no-param-reassign */
const cardValueAdder = (cardValue, handler) => {
    const parsedHandler = parseInt(handler.textContent, 10);
    const parsedCardValue = parseInt(cardValue, 10);
    const summaryValue = parsedHandler + parsedCardValue;

    if (summaryValue > BLACK_VALUE) {
        handler.textContent = summaryValue;
    } else {
        handler.textContent = summaryValue;
    }
};

export default cardValueAdder;
