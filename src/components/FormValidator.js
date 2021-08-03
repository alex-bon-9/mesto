// import {validateObject} from '../utils/ui.js';//уд

export class FormValidator {
  constructor(validateObject, formElement) {
    // this._validateObject = validateObject; //уд
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(validateObject.inputSelector));
    this._buttonElement = this._form.querySelector(validateObject.submitButtonSelector);
    this._inactiveButtonClass = validateObject.inactiveButtonClass;
    this._errorClass = validateObject.errorClass;
    this._inputErrorClass = validateObject.inputErrorClass;
    this._errorEmptyInputMessage = validateObject.errorEmptyInputMessage;
    this._errorEmptyUrlMessage = validateObject.errorEmptyUrlMessage;
    this._inputUrlClass = validateObject.inputUrlClass;
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._setDefaultError(inputElement);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };

  _isValid(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    }
    else {
      this._showInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._isValid(inputElement);
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };

  clearValidationInput() {
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
    this._toggleButtonState();
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setDefaultError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if (inputElement.classList.contains(this._inputUrlClass)) {
      errorElement.textContent = this._errorEmptyUrlMessage;
    }
    else if (!inputElement.value.length <= 0) {
      errorElement.textContent = inputElement.validationMessage;

    }
    else {
      errorElement.textContent = this._errorEmptyInputMessage;
    }
  }
}

