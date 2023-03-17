export class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._escClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    // _escClose(evt){
    //     console.log(this._handleEscClose);
    //     this._handleEscClose(evt).bind(this);
    // };

    open(){
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._escClose);
    }

    close(){
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._escClose);
    }

    setEventListeners(){
        this._popup.addEventListener('mousedown', (evt) => {
            const targetClassList = evt.target.classList;
    
            if (targetClassList.contains("popup__close-btn") || targetClassList.contains("popup")) {
                this.close();
            }
        });
    }
}