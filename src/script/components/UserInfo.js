export class UserInfo{
    constructor(userNameSelector, userInfoSelector){
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;
        this._profileName = document.querySelector(this._userNameSelector);
        this._profileInfo = document.querySelector(this._userInfoSelector);
    }

    getUserInfo() {
        this._userName = document.querySelector(this._userNameSelector).textContent;
        this._userInfo = document.querySelector(this._userInfoSelector).textContent;
        
        return {name:this._userName, info:this._userInfo}
    }

    setNewUserInfo({initial, description}) {
        this._profileName.textContent = initial;
        this._profileInfo.textContent = description;
    }
}