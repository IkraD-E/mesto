export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._placeName = data.name;
        this._placeImage = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }


    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
      }

    _getElementPhoto() {
        const elementPhoto = this._element.querySelector('.element__photo');

        return elementPhoto;
    }

    _getLikeBtn() {
        const likeBtn = this._element.querySelector(".element__like-btn");

        return likeBtn;
    }

    _getDelBtn() {
        const delBtn = this._element.querySelector('.element_delete_button');

        return delBtn;
    }
    
    _handleTuggleLikeBtn(evt) {
        evt.target.classList.toggle("element__like-btn_active");
    }

    _handleDeletePlace(evt) {
        evt.target.closest(".element").remove();
    }

    _setEventListeners() {
        this._elementPhoto.addEventListener("click", () => {
            this._handleCardClick(this._placeName, this._placeImage)
        });

        this._likeBtn.addEventListener("click", this._handleTuggleLikeBtn);

        this._delBtn.addEventListener("click", this._handleDeletePlace);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementPhoto = this._getElementPhoto();
        this._likeBtn = this._getLikeBtn();
        this._delBtn = this._getDelBtn(); 

        this._elementPhoto.src = this._placeImage;
        this._elementPhoto.alt = this._placeName;
        this._element.querySelector(".element__title").textContent = this._placeName;

        this._setEventListeners();

        return this._element;
    }
}
