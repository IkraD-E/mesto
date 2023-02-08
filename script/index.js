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

const elementList = document.querySelector(".elements__list");

const placeTemplate = document.querySelector("#element-template").content;

const popupAddPlaceForm = popupAddPlace.querySelector(".popup__form");

const popupImageCloseBtn = popupImage.querySelector(".popup__close-btn");

const popupEditCloseBtn = profileChange.querySelector(".popup__close-btn");

const popupAddPlaceCloseBtn = popupAddPlace.querySelector(".popup__close-btn");

const elementPhoto = popupImage.querySelector(".popup__image");

const elementPhotoHeader = popupImage.querySelector(".popup__image-header");

const popupList = Array.from(document.querySelectorAll(".popup"));

const elementsContainer = document.querySelector(".elements");

elementsContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains("element__like-btn")) {
        evt.target.classList.toggle("element__like-btn_active");
    }
});

elementsContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains("element_delete_button")) {
        handleDeletePlace(evt)
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
        elementList.prepend(cardElement);
    } else {
        elementList.append(cardElement);
    }
}

function createPlace(placeName, placeImage) {
    const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
    const likeBtn = placeElement.querySelector(".element__like-btn");
    const placeElementPhoto = placeElement.querySelector(".element__photo");
    const placeElementDelBtn = placeElement.querySelector(".element_delete_button");

    placeElement.querySelector(".element__title").textContent = placeName;
    placeElementPhoto.src = placeImage;
    placeElementPhoto.alt = placeName;

    placeElementPhoto.addEventListener("click", () => {
        elementPhoto.src = placeElementPhoto.src;
        elementPhoto.alt = placeName;
        elementPhotoHeader.textContent = placeName;

        openPopup(popupImage);
    });
    return(placeElement);
}

function handleDeletePlace(event) {
    event.target.closest(".element").remove();
}

function openPopup(popup) {
    const popupSubmitBtn = popup.querySelector('.popup__button');
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupKeyboard);
    if (popupSubmitBtn) {
        popupSubmitBtn.classList.add("popup__button_disabled");
    }
}

function getProfileInfo() {
    nameInput.value = nameProfile.textContent; 
    jobInput.value = jobProfile.textContent;
}

function closePopup(popupId) {
    popupId.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupKeyboard);
}

profileEditButton.addEventListener("click",  () => {
    openPopup(profileChange);
    getProfileInfo();
});

profileAdd.addEventListener("click",  () => {
    openPopup(popupAddPlace);
});

popupImageCloseBtn.addEventListener("click",  () => closePopup(popupImage));

popupEditForm.addEventListener("submit",  handleSubmitProfileChanges);

popupEditCloseBtn.addEventListener("click",  () => closePopup(profileChange));

popupAddPlaceCloseBtn.addEventListener("click",  () => closePopup(popupAddPlace));

popupList.forEach((popup) => {
    popup.addEventListener("mousedown",  (evt) => closePopup(evt.target))
})

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

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});