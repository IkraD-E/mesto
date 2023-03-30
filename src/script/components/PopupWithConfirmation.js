import  {Popup} from './Popup.js'

export class PopupWithConfirmation extends Popup{
    constructor(submitEvent, popupSelector) {
        super(popupSelector);
        this._submitEvent = submitEvent;
        this._popupForm = this._popup.querySelector('.popup__form');

    }

    writeElementData(cardId, element) {
        this._cardId = cardId;
        this._element = element;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitEvent(this._cardId, this._element);
        });

        super.setEventListeners()
    }
}