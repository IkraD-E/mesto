import  {Popup} from './Popup.js'

export class PopupWithAvatar extends Popup{
    constructor(submitEvent, popupSelector) {
        super(popupSelector);
        this._submitEvent = submitEvent;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._input = this._popupForm.querySelector('.popup__input');
        this._submitButton = this._popup.querySelector('.popup__button');
    }
    
    returnInputValues() {
        return this._input.value;
    }

    close() {
        this._popupForm.reset();
        super.close();

    }

    writeElementData(cardLink) {
        this._cardLink = cardLink;
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
            this._submitEvent(this._cardLink);
        });

        super.setEventListeners()
    }
}