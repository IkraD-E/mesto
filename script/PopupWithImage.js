import {Popup} from './Popup.js';

export class PopupWithImage extends Popup{
    constructor(link, name, popupSelector) {
        super(popupSelector);
        this._imageLink = link;
        this._imageName = name; 
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupHeader = this._popup.querySelector('.popup__image-header');
    }

    open() {
        this._popupImage.src = this._imageLink;
        this._popupImage.alt = this._imageName;
        this._popupHeader = this._imageName;


        super.open()
    }

    close() {
        this._popupImage.src = '';
        this._popupImage.alt = '';
        this._popupHeader = '';


        super.close()
    }
}