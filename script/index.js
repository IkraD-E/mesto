import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

import { initialCards } from "./cards.js";

import { Section } from "./Section.js";

import {PopupWithImage} from "./PopupWithImage.js";

// const popupWithImage = new PopupWithImage(this._placeImage, this._placeName, ".popup_type_image")


const popupAddPlace = document.querySelector("#popup__add-place");

const profileChange = document.querySelector("#popup__change-profile");

const popupEditForm = profileChange.querySelector(".popup__form");

const nameInput = profileChange.querySelector(".popup__input_type_initial");

const jobInput = profileChange.querySelector(".popup__input_type_description");

const placeNameInput = popupAddPlace.querySelector(".popup__input_type_place-name");

const imageSourceInput = popupAddPlace.querySelector(".popup__input_type_image-source");

const profileAdd = document.querySelector(".profile__add-button");

const profileEditButton = document.querySelector(".profile__edit-button");

const nameProfile = document.querySelector(".profile__header");

const jobProfile = document.querySelector(".profile__text");

const elementsList = document.querySelector(".elements__list");

const popupAddPlaceForm = popupAddPlace.querySelector(".popup__form");

const popupList = Array.from(document.querySelectorAll(".popup"));

const formList = document.querySelectorAll('.popup__form');

const popupImage = document.querySelector('#popup__image');

const popupImagePhoto = popupImage.querySelector(".popup__image");

const popupImageHeader = popupImage.querySelector(".popup__image-header");

const formValidators = {};

const validationList = {
    formSelector: ".popup__form",
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function handleCardClick(name = "", link = "") {
    popupImagePhoto.src = link;
    popupImagePhoto.alt = name;
    popupImageHeader.textContent = name;

    openPopup(popupImage);
}

function handleSubmitProfileChanges(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profileChange);

    profileEditButton.focus()
}

function getProfileInfo() {
    nameInput.value = nameProfile.textContent; 
    jobInput.value = jobProfile.textContent;
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupKeyboard);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupKeyboard);
}

export function closePopupKeyboard(evt) {
    if (evt.key === 'Escape') {  
        const openedPopup = document.querySelector(".popup_opened");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function addEvtClosePopupByMouse(popup) {
    popup.addEventListener('mousedown', (evt) => {
        const targetClassList = evt.target.classList;

        if (targetClassList.contains("popup__close-btn") || targetClassList.contains("popup")) {
            closePopup(popup);
        }
    });
}

function generateCard(element) {
    const card = new Card(element, '#element-template', handleCardClick);
    const cardElement = card.generateCard();

    return cardElement;
}

function renderCard(cardElement, isStart) {
    if (isStart) {
        elementsList.prepend(cardElement);
    } else {
        elementsList.append(cardElement);
    }
}

function addNewPlace(event) {
    event.preventDefault();
    const element = {
        name: placeNameInput.value,
        link: imageSourceInput.value
    }
    
    renderCard(generateCard(element), true);
    closePopup(popupAddPlace);

    profileAdd.focus()
}

profileEditButton.addEventListener("click",  () => {
    formValidators['profile-form'].resetValidation()
    getProfileInfo();
    openPopup(profileChange);
});

profileAdd.addEventListener("click",  () => {
    formValidators['add-place-form'].resetValidation()
    openPopup(popupAddPlace);
});

popupEditForm.addEventListener("submit", handleSubmitProfileChanges);

popupList.forEach(addEvtClosePopupByMouse);

popupAddPlaceForm.addEventListener("submit",  addNewPlace);

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

const defaultCardList = new Section({ items:initialCards, 
        renderer: (element) => {
            const card = new Card(element, '#element-template', handleCardClick);

            const cardElement = card.generateCard();

            return cardElement;
        }
    }, '.elements__list');

defaultCardList.createCard()