import {Popup} from './Popup.js';

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupHeader = this._popup.querySelector('.popup__image-header');
    }

    open(name, link) {
        super.open();

        this._imageLink = link;
        this._imageName = name; 
        this._popupImage.src = this._imageLink;
        this._popupImage.alt = this._imageName;
        this._popupHeader.textContent = this._imageName;
    }

    close() {
        super.close();

        this._popupImage.src = '';
        this._popupImage.alt = '';
        this._popupHeader.textContent = '';
    }
}