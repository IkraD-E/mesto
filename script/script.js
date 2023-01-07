let popup = document.querySelector(".popup");

let popupAddPlace = document.querySelector("#popup__add-place");

let profileChange = document.querySelector("#popup__change-profile");

let nameInput = profileChange.querySelector(".popup__text_type_initial");

let jobInput = profileChange.querySelector(".popup__text_type_description");

let placeNameInput = popupAddPlace.querySelector(".popup__text_type_place-name");

let imageSourceInput = popupAddPlace.querySelector(".popup__text_type_image-source");

let profileAdd = document.querySelector(".profile__add-button");

let profileEditButton = document.querySelector(".profile__edit-button");

let nameProfile = document.querySelector(".profile__header");

let jobProfile = document.querySelector(".profile__text");

let popupImage = document.querySelector("#popup__image");


//Создаём массив карт для подгрузки

let elementList = document.querySelector(".elements__list");

const initialCards = [
    {
      name: 'Архыз',
      link: './images/Karachaevsck.jpg'
    },
    {
      name: 'Челябинская область',
      link: './images/Elbrus.jpg'
    },
    {
      name: 'Иваново',
      link: './images/Dombai.jpg'
    },
    {
      name: 'Камчатка',
      link: './images/Elbrus.jpg'
    },
    {
      name: 'Холмогорский район',
      link: './images/Dombai.jpg'
    },
    {
      name: 'Байкал',
      link: './images/Karachaevsck.jpg'
    }
];

// Функция удаления карточки
function deletePlace(place) {
    place.target.closest(".element").remove();
}

function addPlace(placeName, placeImage, position = "start") {
    const placeTemplate = document.querySelector("#element-template").content;
    const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
    const likeBtn = placeElement.querySelector(".element__like-btn")
    const placeElementPhoto = placeElement.querySelector(".element__photo");
    const placeElementDelBtn = placeElement.querySelector(".element_delete_button");

    placeElement.querySelector(".element__title").textContent = placeName;
    placeElementPhoto.src = placeImage;
    placeElementPhoto.alt = placeName;
    likeBtn.addEventListener("click", evt => {
        evt.target.classList.toggle("element__like-btn_active");
    })
    placeElementDelBtn.addEventListener("click", evt => deletePlace(evt));

    placeElementPhoto.addEventListener("click", evt => {
        openPopup(popupImage);
        const popupCloseBtn = popupImage.querySelector(".popup__close-btn");
        const elementPhoto = popupImage.querySelector(".popup__image");
        const elementPhotoHeader = popupImage.querySelector(".popup__image-header");

        elementPhoto.src = placeElementPhoto.src;
        elementPhoto.alt = placeName;
        elementPhotoHeader.textContent = placeName;

        popupCloseBtn.addEventListener("click",  () => 
        closePopup(popupCloseBtn));
    });

    if (position === "start") {
        elementList.insertBefore(placeElement, elementList.children[0]);
    } else {
        elementList.append(placeElement);
    }

};

//Добовляем карты на страницу
initialCards.forEach(item => {
    addPlace(item["name"], item["link"], "start");
});

//Работа попапов

function openPopup(name) {
    name.classList.add("popup_opened");
}

function getProfileInfo() {
    nameInput.value = nameProfile.innerHTML; 
    jobInput.value = jobProfile.innerHTML;
}

function closePopup(name) {
    name.closest(".popup").classList.remove("popup_opened");
}

function submitProfileChanges(evt) {
    evt.preventDefault();
    console.log(evt.target.closest(".popup").id)
    nameProfile.innerHTML = nameInput.value;
    jobProfile.innerHTML = jobInput.value;
    closePopup(evt.target);
}

profileEditButton.addEventListener("click",  () => {
    const popupCloseBtn = profileChange.querySelector(".popup__close-btn");
    const popupSubmitBtn = profileChange.querySelector(".popup__submit-btn");
    popupSubmitBtn.addEventListener("click",  evt => submitProfileChanges(evt));
    openPopup(profileChange);
    getProfileInfo();
    popupCloseBtn.addEventListener("click",  () => closePopup(profileChange));
});

profileAdd.addEventListener("click",  () => {
    const popupCloseBtn = popupAddPlace.querySelector(".popup__close-btn");
    const popupSubmitBtn = popupAddPlace.querySelector(".popup__submit-btn");
    openPopup(popupAddPlace);
    popupSubmitBtn.addEventListener("click",  evt => {
        evt.preventDefault();
        const place = placeNameInput.value;
        const image = imageSourceInput.value;
        addPlace(place, image)
        closePopup(evt.target);
    });
    popupCloseBtn.addEventListener("click",  () => closePopup(popupAddPlace));
});

