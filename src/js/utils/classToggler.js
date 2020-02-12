const classToggler = (classNameSucces, classNameFail, element) => {
    if (element.classList.contains(classNameFail)) {
        element.classList.remove(classNameFail);
    }

    if (!element.classList.contains(classNameSucces)) {
        element.classList.add(classNameSucces);
    }
};

export default classToggler;
