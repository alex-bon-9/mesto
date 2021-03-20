let popup = document.querySelector('.popup'); //сохранил попап в переменную popup (в переменной лежит объект с разметкой html)
/*console.log(popup);*/
let openPopupButton = document.querySelector('.profile__edit-button');//сохраняем  кнопку редактировать в переменную.
let closePopupButton = document.querySelector('.popup__close-button');//сохраняем  кнопку закрыть в переменную.
let containerPopupButton = document.querySelector('.popup__container');//сохраняем  кнопку подложка в переменную.
let formPopupButton = document.querySelector('.popup__form');//сохраняем  форму чтобы при клике на форму поп-ап не исчезал

function openPopup() {
  popup.classList.add('popup_opened'); //поп-ап откарвается (добавляем класс). Почему тут пишем класс без точки popup_opened?
}

function closePopup() {
  popup.classList.remove('popup_opened'); //поп-ап закрывается (удаляем класс)
}

//добавляем кнопке редактировать слушатель
openPopupButton.addEventListener('click', function() {
  closePopup();
});

//добавляем кнопке закрыть слушатель
closePopupButton.addEventListener('click', function() {
  openPopup();
});
//добавляем нажатию на слой контейнер слушатель
containerPopupButton.addEventListener('click', function() {
   openPopup();
});
formPopupButton.addEventListener('click', function(event) {
  event.stopImmediatePropagation();
}); //добавляем стоп чтобы при нажатии на форму поп-ап не закрывался
