import  {Popup} from './Popup.js'

export class PopupWithForm extends Popup{
    constructor(submitEvent, popupSelector) {
        super(popupSelector);
        this._submitEvent = submitEvent;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputs = this._popupForm.querySelectorAll('.popup__input');
        this._submitButton = this._popup.querySelector('.popup__button');
    }

    _getInputValues(){
        this._dataList = {};
        this._inputs.forEach(element => {
            this._dataList[element.name] = element.value;
        });

        return this._dataList;
    }

    returnInputValues() {
        return this._getInputValues();
    }

    close() {
        this._popupForm.reset();
        super.close();

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
            this._submitEvent();
        });

        super.setEventListeners()
    }
}