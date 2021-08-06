export class Popup { //класc отвечает за открытие и закрытие попапа.
  constructor(popup) {
    this._popup = popup; //Принимает в конструктор единственный параметр — селектор попапа.
    this._buttonStatus = this._popup.querySelector('.form__save-button');
  }

  open() { //публичный методы open который отвечает за открытие попапа.
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupPressEsc);
  }

  close() {//публичный метод close, который отвечает за закрытие попапа.
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupPressEsc);
  }

  changeButtonStatus(isLoading) { 
    if (!this._buttonStatus)  return; 

    if (isLoading) {
      this._buttonStatus.textContent = this._loadingLabelTrue;
    } else {
      this._buttonStatus.textContent = this._loadingLabelFalse;
    }
  }

  _closePopupPressEsc = (evt) => { //приватный метод который содержит логику закрытия попапа клавишей Esc.
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {// публичный метод - добавляет слушатель клика иконке закрытия попапа.
    this._popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if(evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  }
}

