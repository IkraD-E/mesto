import './index.css'

import { Section } from "../script/components/Section.js";

import { Card } from "../script/components/Card.js";

import { FormValidator } from "../script/components/FormValidator.js";

import { PopupWithImage } from "../script/components/PopupWithImage.js";

import { PopupWithForm } from "../script/components/PopupWithForm.js";

import { UserInfo } from "../script/components/UserInfo.js";

import { PopupWithConfirmation } from '../script/components/PopupWithConfirmation.js';

import { PopupWithAvatar } from '../script/components/PopupWithAvatar.js';

import { 
    nameInput,
    infoInput,
    profileAdd,
    profileEditButton,
    formValidators,
    validationList,
    addButton,
    profileAvatarWrap
} from '../script/utils/constants.js';

import { Api } from '../script/components/Api.js'

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-62/', {headers: {
    authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b'
}})

const popupChangeAvatar = new PopupWithAvatar(handleChangeAvatar, "#popup__change-avatar")

const handleSubmitProfileChanges = () => {
    const thisUserInfo = popupProfile.returnInputValues();
    api.changeServerUserInfo(thisUserInfo);
    userInfo.setNewUserInfo(thisUserInfo);
    popupProfile.close();

    profileEditButton.focus()
}

function setInputProfileInfo({ name, info }) {
    nameInput.value = name; 
    infoInput.value = info;
}

// Сбор информации с сайта

const userInfo = new UserInfo('.profile__header', '.profile__text', '.profile__avatar');

// Логика открытия попапов с редактированием профиля и добавления мест

profileEditButton.addEventListener("click",  () => {
    popupProfile.open();
    setInputProfileInfo(userInfo.getUserInfo());
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
                    card.setLikeCount(res)
                })
                .catch(err => console.log(`Лайк не добавлен ${err}`))},

        handleDeleteLike: cardId => {
            api.handleDeleteLike(cardId)
                .then(res => {
                    card.setLikeCount(res)
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

const addNewPlace = () => {
    const element = popupPlace.returnInputValues();

    element.owner = user;

    api.addNewPlaceToServer(element.name, element.link)
    
    cardList.addItem(element, true);
    popupPlace.close();

    addButton.focus()
}

//Удаление места

function handleDeleteClick(cardId, element) {
    popupDelete.open();
    popupDelete.writeElementData(cardId, element);
}

function handleDeletePlace(cardId, element) {
    element.remove();
    api.deleteCardFromServer(cardId);
    popupDelete.close();
}

//Включаем Попапы добавления нового места и изменения профиля

const popupPlace = new PopupWithForm(addNewPlace,"#popup__add-place");

const popupProfile = new PopupWithForm(handleSubmitProfileChanges,"#popup__change-profile");

const popupDelete = new PopupWithConfirmation(handleDeletePlace, "#popup__delete-image");


function handleChangePageAvatar(newAvatarLink) {
    api.handleChangeAvatar(newAvatarLink).then((res) => userInfo.setNewUserAvatar(res.avatar));
    
    popupChangeAvatar.close();
    profileAvatarWrap.focus();
}

function handleChangeAvatar() {
    const newAvatarLink = popupChangeAvatar.returnInputValues();
    popupChangeAvatar.writeElementData(newAvatarLink);
    handleChangePageAvatar(newAvatarLink);
}

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
        console.log(user);
        userInfo.setNewUserInfo({initial: userData.name, description: userData.about, link: userData.avatar});
        cardList.createCardList(cards);
})
    .catch(res => console.log(`Ошибка: ${res.status}`))