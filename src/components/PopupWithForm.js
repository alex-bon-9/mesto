import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {

  _loadingLabelTrue = 'Сохранение...';
  _loadingLabelFalse = 'Сохранить';

  constructor(popup, {handlerSubmit}) {
    super(popup);
    this._submitForm = handlerSubmit;
    this._form = this._popup.querySelector('.form');
    // this._buttonStatus = this._popup.querySelector('.form__save-button');
    this._inputs = this._form.querySelectorAll('.form__input');

  }

  _getInputValues() {
    this._values = {};
    this._inputs.forEach((input) => (this._values[input.name]= input.value));

    return  this._values;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
