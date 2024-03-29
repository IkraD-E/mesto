import {Popup} from './Popup.js';

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupHeader = this._popup.querySelector('.popup__image-header');
    }

    open(name, link) {
        super.open();

        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupHeader.textContent = name;
    }

    close() {
        super.close();

        this._popupImage.src = '';
        this._popupImage.alt = '';
        this._popupHeader.textContent = '';
    }
}