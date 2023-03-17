import '../pages/index.css'

import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

import { initialCards } from "./cards.js";

import { Section } from "./Section.js";

import {PopupWithImage} from "./PopupWithImage.js";

import { PopupWithForm } from "./PopupWithForm.js";

import { UserInfo } from "./UserInfo.js";

import { 
    nameInput,
    infoInput,
    placeNameInput,
    imageSourceInput,
    profileAdd,
    profileEditButton,
    formValidators,
    validationList 
} from './utils/constants.js';

const handleSubmitProfileChanges = (event) => {
    event.preventDefault();
    userInfo.setNewUserInfo(nameInput.value, infoInput.value);
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
    formValidators['profile-form'].resetValidation();
    setInputProfileInfo(userInfo.getUserInfo());
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

const CardList = new Section({ items:initialCards, 
        renderer: (element) => {
            const card = new Card(element, '#element-template', handleCardClick);

            const cardElement = card.generateCard();

            return cardElement;
        }
    }, '.elements__list');

CardList.createCard();

// Логика добавления карточек новых мест

const addNewPlace = (event) => {
    event.preventDefault();
    const element = {
        name: placeNameInput.value,
        link: imageSourceInput.value
    }
    
    CardList.addItem(element);
    popupPlace.close();

    document.querySelector(".profile__add-button").focus()
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