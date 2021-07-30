export class Card {

  constructor({name, link}, {openPreviewImage}, template) {
    this._name = name;
    this._image = link;
    this._template = template;
    this._likeButton = ".element__like-button"; //ui.likebutton;
    this._openPreviewImage = openPreviewImage;
  }

  _getTempalte() {
    const newElement = document.querySelector(this._template).content.querySelector('.element__item').cloneNode(true);
    return newElement;
  }

  _setCardListeners() {
    this._element.querySelector(this._likeButton).addEventListener('click', () => {
      this._likeBtnClick();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', (event) => {
      this._delBtnClick(event);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPreviewImage(this._name, this._image);
    });
  }

  _likeBtnClick() {
    this._element.querySelector(this._likeButton).classList.toggle('element__like-button_active');
  }

  _delBtnClick() {
    this._element.remove();
    // this._element = null;
  }

  generateCard() {
    this._element = this._getTempalte();
    this._setCardListeners();

    this._element.querySelector('.element__group-title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__image').src = this._image;

    return this._element;
  }
}
