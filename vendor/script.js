let popup = document.querySelector(".popup");

let popupCloseBtn = popup.querySelector(".popup__close-btn");

let profileEditButton = document.querySelector(".profile__edit-button");

console.log(popup);

console.log(profileEditButton);

console.log(popupCloseBtn);

function openPopup() {
    popup.classList.add("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

profileEditButton.addEventListener("click", openPopup);

popupCloseBtn.addEventListener("click", closePopup);