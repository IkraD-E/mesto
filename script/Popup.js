export class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose(evt){
        if (evt.key === 'Escape') {  
            const openedPopup = document.querySelector(".popup_opened");
            if (openedPopup) {
                this.close();
            }
        }
    }

    open(){
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close(){
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    setEventListeners(){
        this._popup.addEventListener('mousedown', (evt) => {
            const targetClassList = evt.target.classList;
    
            if (targetClassList.contains("popup__close-btn") || targetClassList.contains("popup")) {
                this.close;
            }
        });
    }
}