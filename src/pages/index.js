import './index.css'

import { Section } from "../script/components/Section.js";

import { Card } from "../script/components/Card.js";

import { FormValidator } from "../script/components/FormValidator.js";

import { PopupWithImage } from "../script/components/PopupWithImage.js";

import { PopupWithForm } from "../script/components/PopupWithForm.js";

import { UserInfo } from "../script/components/UserInfo.js";

import { PopupWithConfirmation } from '../script/components/PopupWithConfirmation.js';

import { 
    nameInput,
    infoInput,
    profileAdd,
    profileEditButton,
    formValidators,
    validationList,
    addButton
} from '../script/utils/constants.js';

import { Api } from '../script/components/Api.js'

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-62/', {headers: {
    authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b'
}})

const handleSubmitProfileChanges = () => {
    const thisUserInfo = popupProfile.returnInputValues();
    api.changeServerUserInfo(thisUserInfo);
    userInfo.setNewUserInfo(thisUserInfo);
    popupProfile.close();

    profileEditButton.focus()
}

function setInputProfileInfo({ name, info }) {
    nameInput.value = name; 
    infoInput.value = info;
}

// Сбор информации с сайта

const userInfo = new UserInfo('.profile__header', '.profile__text');

// Логика открытия попапов с редактированием профиля и добавления мест

profileEditButton.addEventListener("click",  () => {
    popupProfile.open();
    setInputProfileInfo(userInfo.getUserInfo());
    formValidators['profile-form'].resetValidation();
});

profileAdd.addEventListener("click",  () => {
    popupPlace.open();
    formValidators['add-place-form'].resetValidation();
});

// Включение валидации

const enableValidation = (validationList) => {
    const formList = Array.from(document.querySelectorAll(validationList.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(validationList, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;

        validator.enableValidation();
    })
}

enableValidation(validationList);

// Создание класса для добавления новых мест с  его настройкой

function createCard(element) {
    const card = new Card(element, '#element-template', handleCardClick, handleDeleteClick, userId, handleAddLike);

    const cardElement = card.generateCard();

    return cardElement;

}

export const cardList = new Section({ items: null, 
    renderer: createCard
}, 
'.elements__list');

// Логика добавления карточек новых мест

const addNewPlace = () => {
    const element = popupPlace.returnInputValues();

    element.owner = user;

    api.addNewPlaceToServer(element.name, element.link)
    
    cardList.addItem(element, true);
    popupPlace.close();

    addButton.focus()
}

//Удаление места

function handleDeleteClick(cardId, element) {
    popupDelete.open();
    popupDelete.writeElementData(cardId, element);
}

function handleDeletePlace(cardId, element) {
    element.remove();
    api.deleteCardFromServer(cardId);
    popupDelete.close();
}

//Включаем Попапы добавления нового места и изменения профиля

const popupPlace = new PopupWithForm(addNewPlace,"#popup__add-place");

const popupProfile = new PopupWithForm(handleSubmitProfileChanges,"#popup__change-profile");

const popupDelete = new PopupWithConfirmation(handleDeletePlace, "#popup__delete-image");


// Добавление слушателей событий карточек

popupPlace.setEventListeners();

popupProfile.setEventListeners();

popupDelete.setEventListeners();

//Логика работы попапов с картинками

const popupWithImage = new PopupWithImage(".popup_type_image");

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
}

//Работа с сервером
//Информация о пользователе
//Создаём карточки из информации с сервера


function handleAddLike(cardId) {
    console.log(cardId);
    fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${cardId}/likes`, {
        headers: {
            authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: 'PUT',

    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.status)
        })
        .then(json => {
            console.log((json));
        })
        .catch(res => console.log(`Ошибка: ${res.status}`))
}

//Рботаем с сервером через класс

let user = '';

let userId = '';

Promise.all([api.getUserDataFromServer(), api.getCardFromServer()])
    .then(([userData, cards]) => {
        user = userData;
        userId = userData._id;
        userInfo.setNewUserInfo({initial: userData.name, description: userData.about});
        cardList.createCardList(cards);
})
    .catch(res => console.log(`Ошибка: ${res.status}`))

// Для проверки работоспособности
document.querySelector('.profile__avatar').addEventListener('click', () => {console.log(pageOwner)})
