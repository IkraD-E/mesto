import  {Popup} from './Popup.js'

export class PopupWithForm extends Popup{
    constructor(submitEvent, popupSelector) {
        super(popupSelector);
        this._submitEvent = submitEvent;
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    getInputValues(){
        this._dataList = {};
        this._inputs.forEach(element => {
            this._dataList[element.name] = element.textContent;
        });

        return this._dataList;
    }

    close(){
        this._popupForm.reset();
        super.close();

    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', this._submitEvent);

        super.setEventListeners()
    }
}