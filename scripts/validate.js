//показать ошибку
const showInputError = (formElement, inputElement, validateObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  setDefaultError(formElement, inputElement, validateObject);
  inputElement.classList.add(validateObject.inputErrorClass);
  errorElement.classList.add(validateObject.errorClass);
};
//спрятать ошибку
const hideInputError = (formElement, inputElement, validateObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(validateObject.errorClass);
  inputElement.classList.remove(validateObject.inputErrorClass);
};
//проверка на валидность
const isValid = (formElement, inputElement, validateObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validateObject);
  } else {
    hideInputError(formElement, inputElement, validateObject);
    }
};
// слушатели событий инпутов, кнопка сохранить
const setEventListeners = (formElement, validateObject) => {
  const inputList = Array.from(formElement.querySelectorAll(validateObject.inputSelector));
  const buttonElement = formElement.querySelector(validateObject.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement, validateObject);
      isValid(formElement, inputElement, validateObject);
    });
  });
};

//сабмит
const enableValidation = (validateObject) => {
  const formList = Array.from(document.querySelectorAll(validateObject.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault()
    }); // отменяет стандартную отправку формы
    setEventListeners(formElement, validateObject);
  });
};
//состояние валидации
const clearValidationInput = (validateObject) => {
  const formList = Array.from(document.querySelectorAll(validateObject.formSelector));
  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(validateObject.inputSelector));
    inputList.forEach(inputElement => {
      hideInputError(formElement, inputElement, validateObject);
    });
    const buttonElement = formElement.querySelector(validateObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validateObject);
  });
};
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, buttonElement, validateObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validateObject.inactiveButtonClass);
  } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(validateObject.inactiveButtonClass);
    }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
//функия ошибки по дефолту и проверка полей
function setDefaultError(formElement, inputElement, validateObject) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (inputElement.classList.contains(validateObject.inputUrlClass)) {
    errorElement.textContent = validateObject.errorEmptyUrlMessage;
  }
  else if (!inputElement.value.length <= 0) {
    errorElement.textContent = inputElement.validationMessage;
  }
  else {
    errorElement.textContent = validateObject.errorEmptyInputMessage;
  }
}

enableValidation(validateObject);
