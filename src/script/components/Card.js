export default class Card {
    constructor({name, link, likes}, templateSelector, handleCardClick) {
        this._placeName = name;
        this._placeImage = link;
        this._likes = likes;
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
    
    _getLikeCount() {
        const likeCount = this._element.querySelector('.button-container__count');

        return likeCount;
    }

    _handleTuggleLikeBtn() {
        this._likeBtn.classList.toggle("element__like-btn_active");
    }

    _handleDeletePlace() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._elementPhoto.addEventListener("click", () => {
            this._handleCardClick(this._placeName, this._placeImage)
        });

        this._likeBtn.addEventListener("click", () => this._handleTuggleLikeBtn());

        this._delBtn.addEventListener("click", () => this._handleDeletePlace());
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementPhoto = this._getElementPhoto();
        this._likeBtn = this._getLikeBtn();
        this._delBtn = this._getDelBtn(); 
        this._likeCount = this._getLikeCount();

        this._elementPhoto.src = this._placeImage;
        this._elementPhoto.alt = this._placeName;
        this._element.querySelector(".element__title").textContent = this._placeName;
        this._likeCount.textContent = this._likes.length;

        this._setEventListeners();

        return this._element;
    }
}
