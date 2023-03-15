export class UserInfo{
    constructor(userNameSelector, userInfoSelector){
        this._userName = document.querySelector(userNameSelector).textContent;
        this._userInfo = document.querySelector(userInfoSelector).textContent;
        this._profileName = document.querySelector('.profile__header');
        this._profileInfo = document.querySelector('.profile__text');
    }

    getUserInfo() {
        return {name:this._userName, info:this._userInfo}
    }

    setNewUserInfo(newName, newInfo) {
        this._profileName.textContent = newName;
        this._profileInfo.textContent = newInfo;
    }
}