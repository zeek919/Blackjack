const getRate = (rateButtons, currentRate) => {
    rateButtons.forEach(item => {
        item.addEventListener('click', () => {
            // eslint-disable-next-line no-param-reassign
            currentRate.innerHTML = item.innerHTML;
        });
    });
};

export default getRate;
