const popup = document.querySelector('.popup'); //сохранил попап в переменную popup
const openPopupButton = document.querySelector('.profile__edit-button'); //сохраняем  кнопку редактировать в переменную.
const closePopupButton = document.querySelector('.popup__close-button'); //сохраняем  кнопку закрыть в переменную.
const backgroundPopupButton = document.querySelector('.popup'); //сохраняем  кнопку нажатия на подложку в переменную.
const formPopupButton = document.querySelector('.form'); //сохраняем  форму чтобы при клике на форму поп-ап не исчезал
const formElement = document.querySelector('.form'); // сохраняем форму профиля

const nameInput = document.querySelector('.form__input_type_name'); //Находим поля формы в DOM
const jobInput = document.querySelector('.form__input_type_job'); //Находим поля формы в DOM
const titleProfile = document.querySelector('.profile__title'); //сохраняем заголовок профиля title
const textProfile = document.querySelector('.profile__text'); //сохраняем текст профиля

const templateElement = document.querySelector('.element-template').content; //находим содержимое темплейт
const insertElementAfter = document.querySelector('.element'); // после чего добавляем карточки
const popupAddFoto = document.querySelector('.popup_add-photo'); //сохранил попап Add-photo в переменную popup
const formAddFoto = popupAddFoto.querySelector('.form'); // сохраняем форму добавления фото
const placeNameInput = document.querySelector('.form__input_type_title'); //Находим поле формы - название
const linkInput = document.querySelector('.form__input_type_link'); //Находим поле формы - ссылка

const addPlaceButton = document.querySelector('.profile__add-button'); //сохраняем  кнопку добавить место в переменную.
const closepopupAdd = popupAddFoto.querySelector('.popup__close-button'); //кнопка закрыть попап с фото

const likeTemplateButton = document.querySelector('.element-template');
const likebutton = likeTemplateButton.querySelector('.element__like-button'); //кнопка лайка
//добавляем массив карточек
const initialCards = [{
        name: 'Пермский край',
        link: '../images/image1.jpg'
    },
    {
        name: 'Камчатка',
        link: '../images/image2.jpg'
    },
    {
        name: 'Архангельская область',
        link: '../images/image6.jpg'
    },
    {
        name: 'Крым',
        link: '../images/image4.jpg'
    },
    {
        name: 'Забайкалье',
        link: '../images/image5.jpg'
    },
    {
        name: 'Курильские острова',
        link: '../images/image3.jpg'
    }
];

//функция создания карточки
function createCard(item) {
    const newElement = templateElement.querySelector('.element__item').cloneNode(true); //клонируем КАРТОЧКУ
    const elementTitle = newElement.querySelector('.element__group-title');
    const elementImage = newElement.querySelector('.element__image');
    //const elementLike = newElement.querySelector('.element__like-button');
    //const elementDel = newElement.querySelector('.element__like-button'); // выбран лайк пока нет корзины

    elementTitle.textContent = item.name; //записать текст из массива в название
    elementImage.src = item.link; //записать картинку из массива в img
    elementImage.alt = item.name; //записать alt

    //здесь будут слушатели

    return newElement; //возвращается созданная карточка
}

//функция добавления карточек
function addCards() {
    const placeElements = initialCards.forEach(function(item) {
        createCard(item.name, item.link);
        insertElementAfter.append(placeElements);
    });
}

addCards();


/*
const cards = initialCards.forEach(function(item) {
    const cloneElementItem = templateElement.querySelector('.element__item').cloneNode(true); //клонируем содержимое ШАБЛОН
    const elementTitle = cloneElementItem.querySelector('.element__group-title');
    const elementImage = cloneElementItem.querySelector('.element__image');
    elementTitle.textContent = item.name; //записать текст из массива в название
    elementImage.src = item.link; //записать картинку из массива в img
    elementImage.alt = item.name;
    insertElementAfter.append(cloneElementItem); // вставляем содержимое
});
*/

//
function openPopup() {
    popup.classList.add('popup_opened'); //поп-ап откырвается (добавляем класс).
    nameInput.value = titleProfile.textContent; //Функция открытия модального окна заносит текущие данные пользователя в поля формы.
    jobInput.value = textProfile.textContent; //
}

function closePopup() {
    popup.classList.remove('popup_opened'); //поп-ап закрывается (удаляем класс)
}

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    titleProfile.textContent = nameInput.value; // Выберите элементы, куда должны быть вставлены значения полей
    textProfile.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
    closePopup(); //вызвали функцию closePopup внутри
}

//part2
function openPopupAddFoto() {
    popupAddFoto.classList.add('popup_opened'); //поп-ап откырвается (добавляем класс).
}

function closePopupAddFoto() {
    popupAddFoto.classList.remove('popup_opened');
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//добавляем кнопке редактировать слушатель
openPopupButton.addEventListener('click', function() {
    openPopup();

});
//добавляем кнопке закрыть слушатель
closePopupButton.addEventListener('click', function() {
    closePopup();
});
//добавляем нажатию на слой контейнер слушатель
backgroundPopupButton.addEventListener('click', function() {
    closePopup();
});
formPopupButton.addEventListener('click', function(event) {
    event.stopImmediatePropagation();
}); //добавляем стоп чтобы при нажатии на форму поп-ап не закрывался из Livecoding

//part2
addPlaceButton.addEventListener('click', function() {
    openPopupAddFoto();
});
//добавляем кнопке закрыть слушатель
closepopupAdd.addEventListener('click', function() {
    closePopupAddFoto();
});
