import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {

  constructor(popup, {handlerSubmit}) {
    super(popup);
    this._submitForm = handlerSubmit;
    this._form = this._popup.querySelector('.form')
  }

  changeSaveButtonStatus() {
    const statusSaveButton = this._popup.querySelector('.form__save-button');
    if (statusSaveButton) {
      const oldText = statusSaveButton.textContent;
      this._popup.querySelector('.form__save-button').textContent = 'Сохранение...';

      setTimeout(() => {
        this._popup.querySelector('.form__save-button').textContent = oldText;
        this._submitForm(this._getInputValues());
      }, 2000)
    }
  };

  // changeDeleteButtonStatus() { // менять текст для кнопки удаления
  //   const statusDeleteButton = this._popup.querySelector('.form__save-button_type_confirm-delete');
  //   window.console.log(statusDeleteButton)
  //   if (statusDeleteButton) { 
  //     window.console.log('delete worked')
  //     const oldText = statusDeleteButton.textContent;
  //     this._popup.querySelector('.form__save-button_type_confirm-delete').textContent = 'Удаление...';
  //     setTimeout(() => {
  //       this._popup.querySelector('.form__save-button_type_confirm-delete').textContent = oldText;
  //       this._submitForm(this._getInputValues());
  //     }, 2000)
  //   }
  // };
  

  _getInputValues() {
    this._values = {};
    this._inputs = this._form.querySelectorAll('.form__input');
    this._inputs.forEach((input) => (this._values[input.name]= input.value));

    if (this._values.avatar) { this._values.link = this._values.avatar};

    return  this._values;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.changeSaveButtonStatus();
      //this.changeDeleteButtonStatus();
      //this._submitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
