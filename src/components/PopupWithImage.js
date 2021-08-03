import { Popup } from './Popup.js';

export class PopupWithImage extends Popup { // используется для создания дочернего класса
  constructor(popup) {
    super(popup); // обращаемся к конструктору родительского объекта
    this._photo = this._popup.querySelector('.popup-open-photo__image');
    this._title = this._popup.querySelector('.popup-open-photo__caption');

  }

  open({name, link}) {
    this._photo.src = link;
    this._photo.alt = name;
    this._title.textContent = name;
    super.open();
  }
}

