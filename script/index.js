
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

const popupImageCloseBtn = popupImage.querySelector(".popup__close-btn");

const popupEditCloseBtn = profileChange.querySelector(".popup__close-btn");

const popupAddPlaceCloseBtn = popupAddPlace.querySelector(".popup__close-btn");

const elementPhoto = popupImage.querySelector(".popup__image");

const elementPhotoHeader = popupImage.querySelector(".popup__image-header");

const popupList = Array.from(document.querySelectorAll(".popup"));

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
    likeBtn.addEventListener("click", evt => {
        evt.target.classList.toggle("element__like-btn_active");
    });

    placeElementDelBtn.addEventListener("click", handleDeletePlace);

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
    popup.classList.add("popup_opened");
}

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

popupImageCloseBtn.addEventListener("click",  () => closePopup(popupImage));

popupEditForm.addEventListener("submit",  handleSubmitProfileChanges);

popupEditCloseBtn.addEventListener("click",  () => closePopup(profileChange));

popupAddPlaceCloseBtn.addEventListener("click",  () => closePopup(popupAddPlace));

popupList.forEach((popup) => {
    console.log('Я работаю!', popup);
    popup.addEventListener("click",  (evt) => closePopup(evt.target))
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

function showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};
  

function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};
  

function checkInputValidity(formElement, inputElement){
    if (!inputElement.validity.valid) {
        console.log('Это ошибка -', inputElement.validationMessage);
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        console.log('Это здоровая строка -', inputElement);
        hideInputError(formElement, inputElement);
    }
};

function setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-btn');

    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};
  
enableValidation();

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
  
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-btn_inactive');
    } else {
        buttonElement.classList.remove('popup__submit-btn_inactive');
    }
};