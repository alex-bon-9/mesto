export class UserInfo {

  constructor(name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    const name = this._name.textContent;
    const about = this._about.textContent;
    const id = this._id;
    const avatar = this._avatar;
    return {name, about, id, avatar };
  };
  setUserInfo(name, about, id, avatar) {

    if (name) { this._name.textContent = name;}
    if (about) {this._about.textContent = about;}
    if (id) {this._id = id;}
    if (avatar) {this._avatar.src = avatar};
  };

  setUserAvatar(link) {
    // window.console.log(link)
    if (link) {this._avatar.src = link;}
  }

  getUserId() {
    return this._id;
  }
}
