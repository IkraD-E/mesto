export const popupAddPlace = document.querySelector("#popup__add-place");

export const profileChange = document.querySelector("#popup__change-profile");

export const nameInput = profileChange.querySelector(".popup__input_type_initial");

export const infoInput = profileChange.querySelector(".popup__input_type_description");

export const placeNameInput = popupAddPlace.querySelector(".popup__input_type_place-name");

export const imageSourceInput = popupAddPlace.querySelector(".popup__input_type_image-source");

export const profileAdd = document.querySelector(".profile__add-button");

export const profileEditButton = document.querySelector(".profile__edit-button");

export const formValidators = {};

export const validationList = {
    formSelector: ".popup__form",
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
