// import { popupsObj } from "../utils/ui.js"; -убрал

export class Popup { //класc отвечает за открытие и закрытие попапа.
  constructor(popup) {
    this._popup = popup; //Принимает в конструктор единственный параметр — селектор попапа.
    // this._popup = document.querySelector(popup); //Принимает в конструктор единственный параметр — селектор попапа.
  }

  open() { //публичный методы open который отвечает за открытие попапа.
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupPressEsc);
  }

  close() {//публичный метод close, который отвечает за закрытие попапа.
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupPressEsc);
  }

  _closePopupPressEsc = (evt) => { //приватный метод который содержит логику закрытия попапа клавишей Esc.
    if(evt.key === 'Escape') {
      this.close(this._popup);
    }
  }

  setEventListeners() {// публичный метод - добавляет слушатель клика иконке закрытия попапа.
    this._popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close(this._popup);
      }
      if(evt.target.classList.contains('popup__close-button')) {
        this.close(this._popup);
      }
    })
  }
}

