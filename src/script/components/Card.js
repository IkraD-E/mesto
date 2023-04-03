export class Card {
    constructor(cardInfo, templateSelector, user, handleFunction) {
        this._cardInfo = cardInfo;
        this._placeName = this._cardInfo.name;
        this._placeImage = this._cardInfo.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleFunction.handleCardClick;
        this._handleDeleteClick = handleFunction.handleDeleteClick;
        this._cardId = this._cardInfo._id;
        this._owner = this._cardInfo.owner;
        this._user = user;
        this._handleAddLike = handleFunction.handleAddLike;
        this._handleDeleteLike = handleFunction.handleDeleteLike;
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
        return this._element.querySelector('.element__photo');
    }

    _getLikeBtn() {
        return this._element.querySelector(".element__like-btn");
    }

    _getDelBtn() {
        return this._element.querySelector('.element_delete_button');
    }
    
    _getLikeCount() {
        return this._element.querySelector('.button-container__count');
    }

    _handleTuggleLikeBtn() {
        this._likeBtn.classList.toggle("element__like-btn_active");
    }

    _checkUserLike() {
        return this._likeList.find((userInfo) => {
            return userInfo._id === this._user._id;
        })
    }

    setLikeCount(cardInfo) {
        this._likeList = cardInfo.likes || [];
        
        this._likeCount.textContent = this._likeList.length;

    }

    _setEventListeners() {
        this._elementPhoto.addEventListener("click", () => {
            this._handleCardClick(this._placeName, this._placeImage)
        });

        this._likeBtn.addEventListener("click", () => {
            if (this._checkUserLike()) {
                this._handleDeleteLike(this._cardId);
                this._handleTuggleLikeBtn();
            } else {
                this._handleAddLike(this._cardId);
                this._handleTuggleLikeBtn();
            }
        });

        
        if (!(this._owner._id === this._user._id)) {
            this._delBtn.remove();
        } else {
            this._delBtn.addEventListener('click', () => this._handleDeleteClick(this._cardId, this._element));
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementPhoto = this._getElementPhoto();
        this._likeBtn = this._getLikeBtn();
        this._delBtn = this._getDelBtn(); 
        this._likeCount = this._getLikeCount();

        this.setLikeCount(this._cardInfo);

        this._elementPhoto.src = this._placeImage;
        this._elementPhoto.alt = this._placeName;
        this._element.querySelector(".element__title").textContent = this._placeName;

        if (this._checkUserLike()) {
            this._handleTuggleLikeBtn();
        }

        this._setEventListeners();

        return this._element;
    }
}
