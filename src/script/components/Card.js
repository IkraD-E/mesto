export default class Card {
    constructor({name, link, likes = [], _id, owner}, templateSelector, handleCardClick, handleDeleteClick, thisUserId) {
        this._placeName = name;
        this._placeImage = link;
        this._likes = likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._cardId = _id;
        this._userId = owner._id;
        this._thisUserId = thisUserId._id;
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
        console.log(`Я есть - `);
        console.log(this._element);
        // this._element.remove();
        // this._element = null;
    }

    _setEventListeners() {
        this._elementPhoto.addEventListener("click", () => {
            this._handleCardClick(this._placeName, this._placeImage)
        });

        this._likeBtn.addEventListener("click", () => this._handleTuggleLikeBtn());

        this._delBtn.addEventListener('click', () => this._handleDeleteClick(this._cardId, this._element));
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementPhoto = this._getElementPhoto();
        this._likeBtn = this._getLikeBtn();
        this._delBtn = this._getDelBtn(); 
        this._likeCount = this._getLikeCount();

        if (!(this._userId === this._thisUserId)) {
            this._delBtn.remove();
        }

        this._elementPhoto.src = this._placeImage;
        this._elementPhoto.alt = this._placeName;
        this._element.querySelector(".element__title").textContent = this._placeName;
        this._likeCount.textContent = this._likes.length;

        this._setEventListeners();

        return this._element;
    }
}
