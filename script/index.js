
const popupAddPlace = document.querySelector("#popup__add-place");

const profileChange = document.querySelector("#popup__change-profile");

const popupEditForm = profileChange.querySelector(".popup__form");

const nameInput = profileChange.querySelector(".popup__text_type_initial");

const jobInput = profileChange.querySelector(".popup__text_type_description");

const placeNameInput = popupAddPlace.querySelector(".popup__text_type_place-name");

const imageSourceInput = popupAddPlace.querySelector(".popup__text_type_image-source");

const profileAdd = document.querySelector(".profile__add-button");

const profileEditButton = document.querySelector(".profile__edit-button");

const nameProfile = document.querySelector(".profile__header");

const jobProfile = document.querySelector(".profile__text");

const popupImage = document.querySelector("#popup__image");

const elementList = document.querySelector(".elements__list");

const placeTemplate = document.querySelector("#element-template").content;

const popupAddPlaceForm = popupAddPlace.querySelector(".popup__form");

// Image

const popupImageCloseBtn = popupImage.querySelector(".popup__close-btn");

popupImageCloseBtn.addEventListener("click",  () => closePopup(popupImage));

// ProfileChange

const popupEditCloseBtn = profileChange.querySelector(".popup__close-btn");

function submitProfileChanges(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profileChange);
}

popupEditForm.addEventListener("submit",  submitProfileChanges);

popupEditCloseBtn.addEventListener("click",  () => closePopup(profileChange));

// AddPlace

const popupAddPlaceCloseBtn = popupAddPlace.querySelector(".popup__close-btn");

popupAddPlaceCloseBtn.addEventListener("click",  () => closePopup(popupAddPlace));

popupAddPlaceForm.addEventListener("submit",  event => {
    event.preventDefault();
    const place = placeNameInput.value;
    const image = imageSourceInput.value;
    renderCard(addPlace(place, image));
    closePopup(popupAddPlace);
    event.target.reset(); 
});

function deletePlace(event) {
    event.target.closest(".element").remove();
}


//Добовляем карты на страницу

function renderCard(cardElement, position = "start") {
    if (position === "start") {
        elementList.prepend(cardElement);
    } else {
        elementList.append(cardElement);
    }
}

function addPlace(placeName, placeImage) {
    const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
    const likeBtn = placeElement.querySelector(".element__like-btn");
    const placeElementPhoto = placeElement.querySelector(".element__photo");
    const placeElementDelBtn = placeElement.querySelector(".element_delete_button");

    placeElement.querySelector(".element__title").textContent = placeName;
    placeElementPhoto.src = placeImage;
    placeElementPhoto.alt = placeName;
    likeBtn.addEventListener("click", evt => {
        evt.target.classList.toggle("element__like-btn_active");
    });

    placeElementDelBtn.addEventListener("click", deletePlace);

    placeElementPhoto.addEventListener("click", () => {
        const elementPhoto = popupImage.querySelector(".popup__image");
        const elementPhotoHeader = popupImage.querySelector(".popup__image-header");

        elementPhoto.src = placeElementPhoto.src;
        elementPhoto.alt = placeName;
        elementPhotoHeader.textContent = placeName;

        openPopup(popupImage);
    });
    return(placeElement);
}

initialCards.forEach(item => renderCard(addPlace(item["name"], item["link"]), null));

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

//Работа попапов

function getProfileInfo() {
    nameInput.value = nameProfile.textContent; 
    jobInput.value = jobProfile.textContent;
}

function closePopup(popupId) {
    popupId.classList.remove("popup_opened");
}

profileEditButton.addEventListener("click",  () => {
    openPopup(profileChange);
    getProfileInfo();
});

profileAdd.addEventListener("click",  () => {
    openPopup(popupAddPlace);
});