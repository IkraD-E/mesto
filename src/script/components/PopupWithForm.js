import  {Popup} from './Popup.js'

export class PopupWithForm extends Popup{
    constructor(submitEvent, popupSelector) {
        super(popupSelector);
        this._submitEvent = submitEvent;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputs = this._popupForm.querySelectorAll('.popup__input');
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

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitEvent();
        });

        super.setEventListeners()
    }
}