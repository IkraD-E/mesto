import './index.css'

import Card from "../script/components/Card.js";

import FormValidator from "../script/components/FormValidator.js";

import { initialCards } from "../script/cards.js";

import { Section } from "../script/components/Section.js";

import {PopupWithImage} from "../script/components/PopupWithImage.js";

import { PopupWithForm } from "../script/components/PopupWithForm.js";

import { UserInfo } from "../script/components/UserInfo.js";

import { 
    nameInput,
    infoInput,
    profileAdd,
    profileEditButton,
    formValidators,
    validationList,
    addButton
} from '../script/utils/constants.js';

const handleSubmitProfileChanges = () => {
    userInfo.setNewUserInfo(popupProfile.returnInputValues());
    popupProfile.close();

    profileEditButton.focus()
}

function setInputProfileInfo({ name, info }) {
    nameInput.value = name; 
    infoInput.value = info;
}

// Сбор информации с сайта

const userInfo = new UserInfo('.profile__header', '.profile__text');

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

// Создание стандартного набора карточек

function createCard(element) {
    const card = new Card(element, '#element-template', handleCardClick);

    const cardElement = card.generateCard();

    return cardElement;

}

const cardList = new Section({ items:initialCards, 
        renderer: createCard
    }, 
    '.elements__list');

cardList.createCard();

// Логика добавления карточек новых мест

const addNewPlace = () => {
    const element = popupPlace.returnInputValues();
    
    cardList.addItem(element);
    popupPlace.close();

    addButton.focus()
}

const popupPlace = new PopupWithForm(addNewPlace,"#popup__add-place");

const popupProfile = new PopupWithForm(handleSubmitProfileChanges,"#popup__change-profile");

// Добавление слушателей событий карточек

popupPlace.setEventListeners();

popupProfile.setEventListeners();

//Логика работы попапов с картинками

const popupWithImage = new PopupWithImage(".popup_type_image");

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
}