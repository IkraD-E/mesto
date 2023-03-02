export default class FormValidator {
    constructor(validatoionList, popupForm) {
        this._popupForm = popupForm;
        this._inputList = this._popupForm.querySelectorAll(validatoionList.inputSelector);
        this._submitButtonSelector = this._popupForm.querySelector(validatoionList.submitButtonSelector); 
        this._inactiveButtonClass = validatoionList.inactiveButtonClass;
        this._inputErrorClass = validatoionList.inputErrorClass;
        this._errorClass = validatoionList.errorClass;
    }

    _disableEnterBtn(evt) {
        if (evt.key === "Enter") {
            evt.preventDefault();
        }
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(`${this._inputErrorClass}`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add('popup__error_active');
    }

    _hideInputError(inputElement) {
        const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(`${this._inputErrorClass}`);
        errorElement.classList.remove('popup__error_active');
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
                this._toggleButtonState(inputElement);
            });
            
            this._toggleButtonState(inputElement);
        });
    }

    _hasInvalidInput() {
        return Array.from(this._inputList).some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputElement) {
        if (this._hasInvalidInput()) {
            this._submitButtonSelector.classList.add(`${this._inactiveButtonClass}`);
            this._submitButtonSelector.disabled = true;
            inputElement.addEventListener('keydown', this._disableEnterBtn);
        } else {
            this._submitButtonSelector.classList.remove(`${this._inactiveButtonClass}`);
            inputElement.removeEventListener('keydown', this._disableEnterBtn);
            this._submitButtonSelector.disabled = false;
        }
    }

    enableValidation() {
        this._popupForm.addEventListener('submit', evt => evt.preventDefault());

        this._setEventListeners();
    }
}