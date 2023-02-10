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

const popupImage = document.querySelector("#popup__image");

const elementsList = document.querySelector(".elements__list");

const placeTemplate = document.querySelector("#element-template").content;

const popupAddPlaceForm = popupAddPlace.querySelector(".popup__form");

const popupImageCloseBtn = popupImage.querySelector(".popup__close-btn");

const popupEditCloseBtn = profileChange.querySelector(".popup__close-btn");

const popupAddPlaceCloseBtn = popupAddPlace.querySelector(".popup__close-btn");

const elementPhoto = popupImage.querySelector(".popup__image");

const elementPhotoHeader = popupImage.querySelector(".popup__image-header");

const popupList = Array.from(document.querySelectorAll(".popup"));

const validationList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

elementsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains("element__like-btn")) {
        evt.target.classList.toggle("element__like-btn_active");
    }
});

elementsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains("element_delete_button")) {
        handleDeletePlace(evt)
    }
});

elementsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains("element__photo")) {
        elementPhoto.src = evt.target.src;
        elementPhoto.alt = evt.target.alt;
        elementPhotoHeader.textContent = evt.target.alt;

        openPopup(popupImage);
    }
});

popupList.forEach((popup) => {
    popup.addEventListener('mousedown', function (evt) {
        const target = evt.target;
        const targetClassList = target.classList;

        if (targetClassList.contains("popup__close-btn") || targetClassList.contains("popup")) {
            closePopup(popup);
        }
    });
})

function handleSubmitProfileChanges(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profileChange);
}

function renderCard(cardElement, isStart) {
    if (isStart) {
        elementsList.prepend(cardElement);
    } else {
        elementsList.append(cardElement);
    }
}

function createPlace(placeName, placeImage) {
    const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
    const placeElementPhoto = placeElement.querySelector(".element__photo");

    placeElement.querySelector(".element__title").textContent = placeName;
    placeElementPhoto.src = placeImage;
    placeElementPhoto.alt = placeName;

    return(placeElement);
}

function handleDeletePlace(event) {
    event.target.closest(".element").remove();
}

function openPopup(popup) {
    const buttonElement = popup.querySelector('.popup__button');

    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupKeyboard);
    if (buttonElement) {
        const inputList = Array.from(popup.querySelectorAll(`${validationList.inputSelector}`));

        toggleButtonState(inputList, buttonElement, validationList);
    }

}

function getProfileInfo() {
    nameInput.value = nameProfile.textContent; 
    jobInput.value = jobProfile.textContent;
}

function closePopup(popup) {
    const inputList = Array.from(popup.querySelectorAll(".popup__input"));
    const popupForm = popup.querySelector('.popup__form');
    const formElement = popup.querySelector(".popup__form");

    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupKeyboard);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationList);
    })

    popupForm.reset();    
}

profileEditButton.addEventListener("click",  () => {
    getProfileInfo();
    openPopup(profileChange);
});

profileAdd.addEventListener("click",  () => {
    openPopup(popupAddPlace);
});

popupEditForm.addEventListener("submit",  handleSubmitProfileChanges);


popupAddPlaceForm.addEventListener("submit",  event => {
    event.preventDefault();
    const place = placeNameInput.value;
    const image = imageSourceInput.value;
    renderCard(createPlace(place, image), true);
    closePopup(popupAddPlace);
    event.target.reset(); 
});

initialCards.forEach(item => renderCard(createPlace(item["name"], item["link"])));

// Код валидации

enableValidation(validationList);