import './index.css'

import Card from "../script/components/Card.js";

import FormValidator from "../script/components/FormValidator.js";

import { Section } from "../script/components/Section.js";

import {PopupWithImage} from "../script/components/PopupWithImage.js";

import { PopupWithForm } from "../script/components/PopupWithForm.js";

import { UserInfo } from "../script/components/UserInfo.js";

import { 
    nameInput,
    infoInput,
    profileAdd,
    profileEditButton,
    formValidators,
    validationList,
    addButton
} from '../script/utils/constants.js';

//Работа с сервером
//Информация о пользователе
function getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me ', {
        headers: {
            authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b'
        }
    })
        .then(res => res.json())
        .catch(res => console.log(`Ошибка: ${res.status}`))
}

const handleSubmitProfileChanges = () => {
    userInfo.setNewUserInfo(popupProfile.returnInputValues());
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
    const card = new Card(element, '#element-template', handleCardClick);

    const cardElement = card.generateCard();

    return cardElement;

}

const cardList = new Section({ items: null, 
        renderer: createCard
    }, 
    '.elements__list');

//Создаём карточки с из информации с сервера

function createCardFromServer() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
        headers: {
            authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.status)
        })
        .then(cards => {
            cardList.createCardList(cards);
        })
        .catch(err => console.log(`Ошибка: ${err}`))
}

createCardFromServer();

// Логика добавления карточек новых мест

function addNewPlaceToSerwer(placeName, placeLink) {
    console.log(`Вот информация ${placeName}, ${placeLink}`);
    fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
        method: 'POST',
        body: JSON.stringify({
            name: placeName,
            link: placeLink
        }),
        headers: {
            'authorization': 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b',
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.status)
        })
        .catch(err => console.log(`Ошибка: ${err}`))
}

const addNewPlace = () => {
    const element = popupPlace.returnInputValues();

    addNewPlaceToSerwer(element.name, element.link)
    
    cardList.addItem(element, true);
    popupPlace.close();

    addButton.focus()
}

//Включаем Попапы добавления нового места и изменения профиля

const popupPlace = new PopupWithForm(addNewPlace,"#popup__add-place");

const popupProfile = new PopupWithForm(handleSubmitProfileChanges,"#popup__change-profile");

// Добавление слушателей событий карточек

popupPlace.setEventListeners();

popupProfile.setEventListeners();

//Логика работы попапов с картинками

const popupWithImage = new PopupWithImage(".popup_type_image");

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
}