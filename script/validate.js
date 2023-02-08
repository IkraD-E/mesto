// включение валидации вызовом enableValidation
// все настройки передаются при вызове

function disableEnterBtn(evt) {
    if (evt.key === "Enter") {
        evt.preventDefault();
    }
}

function closePopupKeyboard(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === 'Escape' && openedPopup) {
        closePopup(openedPopup)
    }
};

function showInputError(formElement, inputElement, validationList, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${validationList.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_active');
};

function hideInputError(formElement, inputElement, validationList){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${validationList.inputErrorClass}`);
    errorElement.classList.remove('popup__error_active');
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, validationList){
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, validationList, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement, validationList);
    }
};

function setEventListeners(formElement, validationList){
    const inputList = Array.from(formElement.querySelectorAll(`${validationList.inputSelector}`));
    const buttonElement = formElement.querySelector(`${validationList.submitButtonSelector}`);

    toggleButtonState(inputList, buttonElement, validationList);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationList);
            toggleButtonState(inputList, buttonElement, validationList);
        });

        inputElement.addEventListener('keydown', disableEnterBtn);
        inputElement.addEventListener("keydown", closePopupKeyboard);
    });
};

function enableValidation(validationList){
    const formList = Array.from(document.querySelectorAll(`${validationList.formSelector}`));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationList);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
  
function toggleButtonState(inputList, buttonElement, validationList) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${validationList.inactiveButtonClass}`);
    } else {
        buttonElement.classList.remove(`${validationList.inactiveButtonClass}`);
    }
};