export class Api{
    constructor({link, headers}){
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
            headers: this._headers
        })
            .then(res => this._serverResponse(res))
    }

    //Сбор информации о карточках
    getCardFromServer() {
        return fetch(`${this._link}cards`, {
            headers: this._headers
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
            headers: this._headers
        })
            .then(res => this._serverResponse(res))
    }

    //Удаление карточки с сервера
    deleteCardFromServer(cardId) {
        return fetch(`${this._link}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._serverResponse(res))
    }

    //Изменить данные о пользователе на сервере
    changeServerUserInfo(data) {
        return fetch(`${this._link}users/me`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.info
            }),
            headers: this._headers
        })
            .then(res => this._serverResponse(res))
    }

    //Добавить лайк на сервер
    handleAddLike(cardId) {
        return fetch(`${this._link}cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
    
        })
            .then(res => this._serverResponse(res))
    }

    //Убрать лайк с сервера
    handleDeleteLike(cardId) {
        return fetch(`${this._link}cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
    
        })
        .then(res => this._serverResponse(res))
    }

    handleChangeAvatar(newAvatarLink) {
        return fetch(`${this._link}/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify({
                avatar: newAvatarLink
            }),
            headers: this._headers
        })
            .then(res => this._serverResponse(res))
    }
}