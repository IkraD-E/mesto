export class Section{
    constructor({items, renderer}, selector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    createCard(){
        this._renderedItems.forEach(element => {
            this.addItem(element);
        });
    }

    createCardList(cardList){
        cardList.forEach(card =>{
            this.addItem(card);
        })
    }

    addItem(element, positionStart){
        if (positionStart) {
            this._container.prepend(this._renderer(element));
        } else {
            this._container.append(this._renderer(element));
        }
    }
}