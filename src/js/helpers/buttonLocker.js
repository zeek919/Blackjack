const buttonLocker = flag => {
    const EVERY_BTN = document.querySelectorAll('button');

    if (flag === true) {
        EVERY_BTN.forEach(item => {
            item.disabled = true;
        });
    } else {
        EVERY_BTN.forEach(item => {
            item.disabled = false;
        });
    }
};

export default buttonLocker;
