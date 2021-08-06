import { Popup } from "./Popup.js";

export class PopupWithConfirmDelete extends Popup {

    _loadingLabelTrue = 'Удаление...';
    _loadingLabelFalse = 'Да';

    constructor(popup, {submitHandler}) {
        super(popup);
        this._submitHandler = submitHandler;
    }

    open(cardId, element) {
        super.open();
        this._cardId = cardId;
        this.cardElement = element;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => { 
          evt.preventDefault();
          // this.changeDeleteButtonStatus();
          this._submitHandler(this._cardId);
        })
    }
}
