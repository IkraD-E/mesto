import Popup from './Popup.js'

export class PopupWithForm extends Popup{
    constructor(evenet, popupSelector) {
        super(popupSelector);
        this._evenet = evenet;
    }

    _getInputValues(){

    }

    open(){

    }

    setEventListeners() {

        super.setEventListeners()
    }
}