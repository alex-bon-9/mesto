import { Popup } from "./Popup.js";

export class PopupWithConfirmDelete extends Popup {
    constructor(popup, {submitHandler}) {
        super(popup);
        this._submitHandler = submitHandler;
        // window.console.log(this._submitHandler);
    }

    open(cardId, element) {
        super.open();
        this._cardId = cardId;
        this.cardElement = element;
    }

    changeDeleteButtonStatus() { // менять текст для кнопки удаления
        const statusDeleteButton = this._popup.querySelector('.form__save-button_type_confirm-delete');
        // window.console.log(statusDeleteButton)
        if (statusDeleteButton) { 
        //   window.console.log('delete worked')
          const oldText = statusDeleteButton.textContent;
          this._popup.querySelector('.form__save-button_type_confirm-delete').textContent = 'Удаление...';
          setTimeout(() => {
            this._popup.querySelector('.form__save-button_type_confirm-delete').textContent = oldText;
          }, 2000)
        }
      };

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => { // this.element.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this.changeDeleteButtonStatus();
          this._submitHandler(this._cardId);
        })
    }
}
