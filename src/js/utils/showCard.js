import { CARD_TABLE } from '../constants/matchInfo';

const showCard = image => {
    CARD_TABLE.innerHTML = `
    <img src="${image}">`;
};

export default showCard;
