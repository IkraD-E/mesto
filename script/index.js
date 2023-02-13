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
    const target = evt.target;
    const targetClassList = target.classList;
    if (targetClassList.contains("element__photo")) {
        elementPhoto.src = target.src;
        elementPhoto.alt = target.alt;
        elementPhotoHeader.textContent = target.alt;

        openPopup(popupImage);
    }

    if (targetClassList.contains("element_delete_button")) {
        handleDeletePlace(evt);
    }

    if (targetClassList.contains("element__like-btn")) {
        targetClassList.toggle("element__like-btn_active");
    }
});

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
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupKeyboard);
}

function toggleButtonPopupOpening(popup) {
    const buttonElement = popup.querySelector('.popup__button');
    const inputList = Array.from(popup.querySelectorAll(`${validationList.inputSelector}`));

    toggleButtonState(inputList, buttonElement, validationList);
}

function getProfileInfo() {
    nameInput.value = nameProfile.textContent; 
    jobInput.value = jobProfile.textContent;
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
    if (formElement) {
        popupForm.reset();  
    }
}

function closePopupKeyboard(evt) {
    if (evt.key === 'Escape') {  
        const openedPopup = document.querySelector(".popup_opened");
        if (openedPopup) {
            resetPopupInputs(openedPopup);
            closePopup(openedPopup);
        }
    }
}

function addEvtClosePopupByMouse(popup) {
    popup.addEventListener('mousedown', function (evt) {
        const target = evt.target;
        const targetClassList = target.classList;

        if (targetClassList.contains("popup__close-btn") || targetClassList.contains("popup")) {
            resetPopupInputs(popup);
            closePopup(popup);
        }
    });
}

profileEditButton.addEventListener("click",  () => {
    getProfileInfo();
    openPopup(profileChange);
    toggleButtonPopupOpening(profileChange);
});

profileAdd.addEventListener("click",  () => {
    openPopup(popupAddPlace);
    toggleButtonPopupOpening(popupAddPlace);
});

popupEditForm.addEventListener("submit",  handleSubmitProfileChanges);

popupList.forEach(addEvtClosePopupByMouse);

popupAddPlaceForm.addEventListener("submit",  addNewPlace);

function addNewPlace(event) {
    event.preventDefault();
    const place = placeNameInput.value;
    const image = imageSourceInput.value;
    
    renderCard(createPlace(place, image), true);
    resetPopupInputs(popupAddPlace);
    closePopup(popupAddPlace);

    event.target.reset(); 

}

initialCards.forEach(item => renderCard(createPlace(item["name"], item["link"])));

enableValidation(validationList);