const popupEdit = document.querySelector('.popup_edit'); //сохранил попап в переменную popup
const openPopupButton = document.querySelector('.profile__edit-button'); //сохраняем  кнопку редактировать в переменную.
const closePopupButtons = document.querySelectorAll('.popup__close-button'); //сохраняем  кнопку закрыть в переменную.
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
const formSaveButton = formAddFoto.querySelector('.form__save-button');
const likeTemplateButton = document.querySelector('.element-template');
const likebutton = likeTemplateButton.querySelector('.element__like-button'); //кнопка лайка
const openImage = document.querySelector('.popup-open-photo');
const image = document.querySelector('.popup-open-photo__image');
const caption = document.querySelector('.popup-open-photo__caption');

const initialCards = [{
        name: 'Пермский край',
        link: './images/image1.jpg'
    },
    {
        name: 'Камчатка',
        link: './images/images2.jpg'
    },
    {
        name: 'Архангельская область',
        link: './images/image6.jpg'
    },
    {
        name: 'Крым',
        link: './images/image4.jpg'
    },
    {
        name: 'Забайкалье',
        link: './images/image5.jpg'
    },
    {
        name: 'Курильские острова',
        link: './images/image3.jpg'
    }
];

function openPopup(popup) {
  if (popup == popupEdit) {
    nameInput.value = titleProfile.textContent; //Функция открытия модального окна заносит текущие данные пользователя в поля формы.
    jobInput.value = textProfile.textContent; //
  }
	popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened'); //поп-ап закрывается (удаляем класс)
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  titleProfile.textContent = nameInput.value; // Выберите элементы, куда должны быть вставлены значения полей
  textProfile.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
  closePopup(popupEdit); //вызвали функцию closePopup внутри
}

function AddPhotoSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newCard = createCard({name:placeNameInput.value, link:linkInput.value});
  insertElementAfter.prepend(newCard);
  closePopup(popupAddFoto);
  formAddFoto.reset();
}

//функция создания карточки
function createCard(item) {
  const newElement = templateElement.querySelector('.element__item').cloneNode(true); //клонируем КАРТОЧКУ
  const elementTitle = newElement.querySelector('.element__group-title');
  const elementImage = newElement.querySelector('.element__image');
  const elementLike = newElement.querySelector('.element__like-button');
  const delButton = newElement.querySelector('.element__delete-button');

  elementTitle.textContent = item.name; //записать текст из массива в название
  elementImage.src = item.link; //записать картинку из массива в img
  elementImage.alt = item.name; //записать alt

  //здесь будут слушатели
  elementLike.addEventListener('click', function () {
    elementLike.classList.toggle('element__like-button_active');
  });

  delButton.addEventListener('click', function () {
    newElement.remove();
  });

  elementImage.addEventListener('click', () => previewImage(item.name, item.link));

  return newElement; //возвращается созданная карточка
}

//функция добавления карточек
function addCards() {
  initialCards.forEach((item) => {
      const cardElement = createCard(item);
      insertElementAfter.append(cardElement);
  });
}

//функция открытия попапа картинки
function previewImage(name, link) {
  caption.textContent = name;
  image.src = link;
  image.alt = name;
  openPopup(openImage)
}

formElement.addEventListener('submit', formSubmitHandler);
//добавляем кнопке редактировать слушатель
openPopupButton.addEventListener('click', function() {
    openPopup(popupEdit);
});
//добавляем кнопке закрыть слушатель для
closePopupButtons.forEach(function (button) {
  button.addEventListener('click', function() {
    closePopup(this.closest('.popup'));
  });
});
//добавляем нажатию на слой
backgroundPopupButton.addEventListener('click', function() {
    closePopup(popupEdit);
});
formPopupButton.addEventListener('click', function(event) {
    event.stopImmediatePropagation();
}); //добавляем стоп чтобы при нажатии на форму поп-ап не закрывался из Livecoding
addPlaceButton.addEventListener('click', function () {
  openPopup(popupAddFoto);
});
formAddFoto.addEventListener('submit', AddPhotoSubmit);

addCards();
