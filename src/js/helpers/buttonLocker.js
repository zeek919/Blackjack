/* eslint-disable no-param-reassign */
const buttonLocker = (flag, elements) => {
    if (flag) {
        elements.forEach(item => {
            item.disabled = true;
        });
    } else {
        elements.forEach(item => {
            item.disabled = false;
        });
    }
};

export default buttonLocker;
