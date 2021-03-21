let popup = document.querySelector('.popup'); //сохранил попап в переменную popup
let openPopupButton = document.querySelector('.profile__edit-button');  //сохраняем  кнопку редактировать в переменную.
let closePopupButton = document.querySelector('.popup__close-button');  //сохраняем  кнопку закрыть в переменную.
let containerPopupButton = document.querySelector('.popup__container');  //сохраняем  кнопку подложка в переменную.
let formPopupButton = document.querySelector('.popup__form');  //сохраняем  форму чтобы при клике на форму поп-ап не исчезал
let formElement = document.querySelector('.popup__form'); // сохраняем форму
let nameInput = document.querySelector('.popup__input-name');  //Находим поля формы в DOM
let jobInput = document.querySelector('.popup__input-job');  //Находим поля формы в DOM
let titleProfile = document.querySelector('.profile__title'); //сохраняем заголовок профиля title
let textProfile = document.querySelector('.profile__text'); //сохраняем текст профиля

function openPopup() {
  popup.classList.add('popup_opened'); //поп-ап откырвается (добавляем класс). Почему тут пишем класс без точки popup_opened, потому что метод!?
}

function closePopup() {
  popup.classList.remove('popup_opened'); //поп-ап закрывается (удаляем класс)
}

//добавляем кнопке редактировать слушатель
openPopupButton.addEventListener('click', function() {
  openPopup();
});
//добавляем кнопке закрыть слушатель
closePopupButton.addEventListener('click', function() {
  closePopup();
});
//добавляем нажатию на слой контейнер слушатель
containerPopupButton.addEventListener('click', function() {
  closePopup();
});

formPopupButton.addEventListener('click', function(event) {
  event.stopImmediatePropagation();
}); //добавляем стоп чтобы при нажатии на форму поп-ап не закрывался из Livecoding


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    titleProfile.textContent = nameInput.value;  // Выберите элементы, куда должны быть вставлены значения полей
    textProfile.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closePopup); //закрытие попапа при нажатии сохранить


