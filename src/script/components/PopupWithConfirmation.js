import  {Popup} from './Popup.js'

export class PopupWithConfirmation extends Popup{
    constructor(submitEvent, popupSelector) {
        super(popupSelector);
        this._submitEvent = submitEvent;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__button');
    }

    writeElementData(cardId, element) {
        this._cardId = cardId;
        this._element = element;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
        } else {
            this._submitButton.textContent = "Сохранить";
        }
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitEvent(this._cardId, this._element);
        });

        super.setEventListeners()
    }
}