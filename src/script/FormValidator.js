export default class FormValidator {
    constructor({inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, popupForm) {
        this._popupForm = popupForm;
        this._inputList = this._popupForm.querySelectorAll(inputSelector);
        this._submitButton = this._popupForm.querySelector(submitButtonSelector); 
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
    }

    resetValidation() {
        this._popupForm.reset();

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(`${this._inputErrorClass}`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(`${this._inputErrorClass}`);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
            
            this._toggleButtonState();
        });
    }

    _hasInvalidInput() {
        return Array.from(this._inputList).some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(`${this._inactiveButtonClass}`);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(`${this._inactiveButtonClass}`);
            this._submitButton.disabled = false;
        }
    }

    enableValidation() {
        this._popupForm.addEventListener('submit', evt => evt.preventDefault());

        this._setEventListeners();
    }
}