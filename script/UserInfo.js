export class UserInfo{
    constructor(userNameSelector, userInfoSelector){
        this._userName = document.querySelector(userNameSelector).textContent;
        this._userInfo = document.querySelector(userInfoSelector).textContent;
    }

    getUserInfo() {
        return {name:this._userName, info:this._userInfo}
    }

    setUserInfo() {

    }
}