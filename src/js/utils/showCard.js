import { cardTable } from '../constants/matchInfo';

const showCard = image => {
    cardTable.innerHTML = `
    <img src="${image}">`;
};

export default showCard;
