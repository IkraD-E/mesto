export class UserInfo{
    constructor(userNameSelector, userInfoSelector, userAvatarSelector){
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;
        this._userAvatarSelector = userAvatarSelector;
        this._profileName = document.querySelector(this._userNameSelector);
        this._profileInfo = document.querySelector(this._userInfoSelector);
        this._profileAvatar = document.querySelector(this._userAvatarSelector);
    }

    getUserInfo() {
        this._userName = document.querySelector(this._userNameSelector).textContent;
        this._userInfo = document.querySelector(this._userInfoSelector).textContent;
        
        return {name:this._userName, info:this._userInfo}
    }

    setNewUserInfo({initial, description, link}) {
        this._profileName.textContent = initial;
        this._profileInfo.textContent = description;
        this._profileAvatar.src = link;
    }

    setNewUserAvatar(link) {
        this._profileAvatar.src = link;
    }
}