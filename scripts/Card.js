export class Card {

  constructor(data, template, openPreviewImage) {
    this._link = data.link;
    this._name = data.name;
    this._template = template;//
    this.openPreviewImage = openPreviewImage;
  }

  _getTempalte() {
    const newElement = this._template.querySelector('.element__item').cloneNode(true);
    return newElement;
  }

  _setCardListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._likeBtnClick();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', (event) => {
      this._delBtnClick(event);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this.openPreviewImage(this._name, this._link);
    });
  }

  _likeBtnClick() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _delBtnClick() {
    this._element.remove();
    // this._element = null;
  }

  generateCard() {
    this._element = this._getTempalte();
    this._setCardListeners();

    this._element.querySelector('.element__group-title').textContent = this._name;
    this._element.querySelector('.element__group-title').alt = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;
  }
}
