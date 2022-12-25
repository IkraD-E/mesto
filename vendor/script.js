let popup = document.querySelector(".popup");

let popupCloseBtn = popup.querySelector(".popup__close-btn");

let profileEditButton = document.querySelector(".profile__edit-button");

let nameProfile = document.querySelector(".profile__header");

let jobProfile = document.querySelector(".profile__text");

let nameInput = document.querySelector(".popup__text_name");

let jobInput = document.querySelector(".popup__text_description");

let formElement = document.querySelector(".popup__submit-btn");

function openPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = nameProfile.innerHTML; 
    jobInput.value = jobProfile.innerHTML;
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

profileEditButton.addEventListener("click", openPopup);

popupCloseBtn.addEventListener("click", closePopup);

formElement.addEventListener("click", function (e) {
    e.preventDefault();
    nameProfile.innerHTML = nameInput.value;
    jobProfile.innerHTML = jobInput.value;
    popup.classList.remove("popup_opened");
});