import {profileAvatar,
        profileName,
        profileInfo 
} from "../utils/constants.js";

import { cardList } from "../../pages/index.js";

//Работа с карточкамаи
//Добовление места на сервер

export class Api{
    constructor(link, headers){
        this._link = link;
        this._headers = headers;
    }

    _serverResponse(res){
        if (res.ok) {
            return res.json()
        }
            return Promise.reject(res.status)
        }


    //Сбор информации о пользователе
    getUserDataFromServer() {
        return fetch(`${this._link}users/me`, {
            headers: {
                authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b'
            }
        })
            .then(res => this._serverResponse(res))
    }

    //Сбор информации о карточках
    getCardFromServer() {
        return fetch(`${this._link}cards`, {
            headers: {
                authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b'
            }
        })
            .then(res => this._serverResponse(res))
    }

    //Добавление карточки на сервер
    addNewPlaceToServer(placeName, placeLink) {
        return fetch(`${this._link}cards`, {
            method: 'POST',
            body: JSON.stringify({
                name: placeName,
                link: placeLink
            }),
            headers: {
                'authorization': 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => this._serverResponse(res))
    }

    //Удаление карточки с сервера
    deleteCardFromServer(cardId) {
        return fetch(`${this._link}cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b',
            }
        })
            .then(res => this._serverResponse(res))
    }

    //Изменить данные о пользователе на сервере
    changeServerUserInfo({initial, description}) {
        return fetch(`${this._link}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: initial,
                about: description
            })
        })
            .then(res => this._serverResponse(res))
    }
}