import './index.css'

import { Section } from "../script/components/Section.js";

import { Card } from "../script/components/Card.js";

import { FormValidator } from "../script/components/FormValidator.js";

import { PopupWithImage } from "../script/components/PopupWithImage.js";

import { PopupWithForm } from "../script/components/PopupWithForm.js";

import { UserInfo } from "../script/components/UserInfo.js";

import { PopupWithConfirmation } from '../script/components/PopupWithConfirmation.js';

import {
    profileAdd,
    profileEditButton,
    formValidators,
    validationList,
    addButton,
    profileAvatarWrap
} from '../script/utils/constants.js';

import { Api } from '../script/components/Api.js'

const apiParams = {
    link: 'https://mesto.nomoreparties.co/v1/cohort-62/',
    headers: {
        authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b',
        'Content-Type': 'application/json'
    }
}

const api = new Api(apiParams)

function handleSubmitProfileChanges() {
    return api.changeServerUserInfo(popupProfile.returnInputValues())
        .then((res) => {
            userInfo.setUserInfo({
                name: res.name, 
                info: res.about
            });
        })
        .then(() => {
            profileEditButton.focus();
        })
        .catch((err) => {console.log(`Ошибка при изменении информации о пользователе - ${err}`)})
}

// Изменение аватара

function handleSubmitChangePageAvatar() {
    return api.handleChangeAvatar(popupChangeAvatar.returnInputValues().link)
        .then((res) => {
            userInfo.setNewUserAvatar(res.avatar);
        })
        .then(() => {
            profileAvatarWrap.focus();
        })
        .catch((err) => {console.log(`Ошибка при изменении аватара пользователя - ${err}`)})
    
}

function handleChangeAvatar() {
    const newAvatarLink = popupChangeAvatar.returnInputValues().link;
    handleChangePageAvatar(newAvatarLink);
}


// Сбор информации с сайта

const userInfo = new UserInfo('.profile__header', '.profile__text', '.profile__avatar');

// Логика открытия попапов с редактированием профиля и добавления мест

profileEditButton.addEventListener("click",  () => {
    popupProfile.open();
    popupProfile.setInputsValues(userInfo.getUserInfo());
    formValidators['profile-form'].resetValidation();
});

profileAdd.addEventListener("click",  () => {
    popupPlace.open();
    formValidators['add-place-form'].resetValidation();
});

profileAvatarWrap.addEventListener('click', () => {
    popupChangeAvatar.open();
    formValidators['change-avatar-form'].resetValidation();
})

// Включение валидации

const enableValidation = (validationList) => {
    const formList = Array.from(document.querySelectorAll(validationList.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(validationList, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    })
}

enableValidation(validationList);

// Создание класса для добавления новых мест с  его настройкой

function createCard(element) {
    const card = new Card(element, '#element-template', user, {
        handleCardClick: handleCardClick,
        handleDeleteClick: handleDeleteClick,
        handleAddLike: cardId => {
            api.handleAddLike(cardId)
                .then(res => {
                    card.setLikeCount(res);
                    card.handleTuggleLikeBtn();
                })
                .catch(err => console.log(`Лайк не добавлен ${err}`))},

        handleDeleteLike: cardId => {
            api.handleDeleteLike(cardId)
                .then(res => {
                    card.setLikeCount(res);
                    card.handleTuggleLikeBtn();
                })
                .catch(err => console.log(`Лайк не удалён ${err}`))},

    });

    const cardElement = card.generateCard();

    return cardElement;

}

const cardList = new Section({ items: null, 
    renderer: createCard
}, 
'.elements__list');

// Логика добавления карточек новых мест

const handleSubmitAddNewPlace = () => {
    const element = popupPlace.returnInputValues();
    return api.addNewPlaceToServer(element.name, element.link)
        .then((res) => {
            cardList.addItem(res, true);
        })
        .then(() => {
            addButton.focus();
        })
        .catch((err) => {console.log(`Ошибка при добавлении нового места - ${err}`)})
}

//Удаление места

function handleDeleteClick(cardId, element) {
    popupDelete.open();
    popupDelete.writeElementData(cardId, element);
}

function handleSubmitDeletePlace(cardId, element) {
    api.deleteCardFromServer(cardId)
        .then(() => {
            element.remove();
            popupDelete.close();
        })
        .catch((err) => {console.log(`Ошибка при удалении места - ${err}`)})
}

//Включаем Попапы добавления нового места и изменения профиля

const popupPlace = new PopupWithForm(handleSubmitAddNewPlace,"#popup__add-place");

const popupProfile = new PopupWithForm(handleSubmitProfileChanges,"#popup__change-profile");

const popupChangeAvatar = new PopupWithForm(handleSubmitChangePageAvatar, "#popup__change-avatar")

const popupDelete = new PopupWithConfirmation(handleSubmitDeletePlace, "#popup__delete-image");

// Добавление слушателей событий карточек

popupPlace.setEventListeners();

popupProfile.setEventListeners();

popupDelete.setEventListeners();

popupChangeAvatar.setEventListeners();

//Логика работы попапов с картинками

const popupWithImage = new PopupWithImage(".popup_type_image");

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
}

let user = '';

Promise.all([api.getUserDataFromServer(), api.getCardFromServer()])
    .then(([userData, cards]) => {
        user = userData;
        userInfo.setUserInfo({name: userData.name, info: userData.about});
        userInfo.setNewUserAvatar(user.avatar);
        cardList.createCardList(cards);
})
    .catch(res => console.log(`Ошибка: ${res.status}`));

// Логика ожидания