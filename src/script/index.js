import '../pages/index.css'

import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

import { initialCards } from "./cards.js";

import { Section } from "./Section.js";

import {PopupWithImage} from "./PopupWithImage.js";

import { PopupWithForm } from "./PopupWithForm.js";

import { UserInfo } from "./UserInfo.js";

const popupAddPlace = document.querySelector("#popup__add-place");

const profileChange = document.querySelector("#popup__change-profile");

const nameInput = profileChange.querySelector(".popup__input_type_initial");

const infoInput = profileChange.querySelector(".popup__input_type_description");

const placeNameInput = popupAddPlace.querySelector(".popup__input_type_place-name");

const imageSourceInput = popupAddPlace.querySelector(".popup__input_type_image-source");

const profileAdd = document.querySelector(".profile__add-button");

const profileEditButton = document.querySelector(".profile__edit-button");

const formValidators = {};

const validationList = {
    formSelector: ".popup__form",
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const userInfo = new UserInfo('.profile__header', '.profile__text');

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

// Логика на добавление новых мест

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

popupPlace.setEventListeners();

popupProfile.setEventListeners();

//Логика работы попапов с картинками

const popupWithImage = new PopupWithImage(".popup_type_image");

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
}