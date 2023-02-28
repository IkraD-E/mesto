import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

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

const formList = document.querySelectorAll('.popup__form')

const validationList = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function handleSubmitProfileChanges(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profileChange);
}

function getProfileInfo() {
    nameInput.value = nameProfile.textContent; 
    jobInput.value = jobProfile.textContent;
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupKeyboard);
}

function toggleButtonPopupOpening(popup) {
    const buttonElement = popup.querySelector('.popup__button');
    const inputList = Array.from(popup.querySelectorAll(`${validationList.inputSelector}`));

    toggleButtonState(inputList, buttonElement, validationList);
}
  
function toggleButtonState(inputList, buttonElement, validationList) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${validationList.inactiveButtonClass}`);
    } else {
        buttonElement.classList.remove(`${validationList.inactiveButtonClass}`);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
  
function hideInputError(formElement, inputElement, validationList){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${validationList.inputErrorClass}`);
    errorElement.classList.remove('popup__error_active');
    errorElement.textContent = '';
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupKeyboard);
}

function resetPopupInputs(popup) {
    const inputList = Array.from(popup.querySelectorAll(".popup__input"));
    const popupForm = popup.querySelector('.popup__form');
    const formElement = popup.querySelector(".popup__form");

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationList);
    });

    popupForm.reset();  
}

function closePopupKeyboard(evt) {
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
    const card = new Card(element, '#element-template');
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
    resetPopupInputs(popupAddPlace);
    closePopup(popupAddPlace);

    event.target.reset(); 
}

profileEditButton.addEventListener("click",  () => {
    resetPopupInputs(profileChange);
    getProfileInfo();
    openPopup(profileChange);
    toggleButtonPopupOpening(profileChange);
});

profileAdd.addEventListener("click",  () => {
    resetPopupInputs(popupAddPlace);
    openPopup(popupAddPlace);
    toggleButtonPopupOpening(popupAddPlace);
});

popupEditForm.addEventListener("submit",  handleSubmitProfileChanges);

popupList.forEach(addEvtClosePopupByMouse);

popupAddPlaceForm.addEventListener("submit",  addNewPlace);

initialCards.forEach(element => {
    renderCard(generateCard(element));
})

formList.forEach(formElement => {
    const validation = new FormValidator(validationList, formElement);
    
    validation.enableValidation();
})