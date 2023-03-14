export class Section{
    constructor({items, renderer}, selector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    createCard(){
        this._renderedItems.forEach(element => {
            this.addItem(this._renderer(element));
        });
    }

    addItem(element){
        this._container.prepend(element);
    }
}