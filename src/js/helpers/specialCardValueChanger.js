const specialCardValueChanger = value => {
    const card = value;
    const translatedValue =
        (card === 'JACK' && 2) ||
        (card === 'QUEEN' && 3) ||
        (card === 'KING' && 4) ||
        (card === 'ACE' && 11) ||
        card;

    return translatedValue;
};

export default specialCardValueChanger;
