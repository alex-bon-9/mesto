const popupEdit = document.querySelector('.popup_edit'); //сохранил попап в переменную popup
const openProfilePopupButton = document.querySelector('.profile__edit-button'); //сохраняем  кнопку редактировать в переменную.
const closePopupButtons = document.querySelectorAll('.popup__close-button'); //сохраняем  кнопку закрыть в переменную.
const clickOnTheFormButton = popupEdit.querySelector('.form'); //сохраняем  форму чтобы при клике на форму поп-ап не исчезал
const formEditProfile = document.querySelector('.form'); // сохраняем форму профиля
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
const overlays = document.querySelectorAll('.popup');


function openPopup(popup) {
	popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened'); //поп-ап закрывается (удаляем класс)
    document.removeEventListener('keydown', closePopupPressEsc);
}

function closePopupPressEsc(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopupOnClick () {
//добавляем нажатию на слой
  overlays.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('popup'))
        closePopup(popup);
      })
  })
}

function openPropfilePopup() {
  nameInput.value = titleProfile.textContent; //Функция открытия модального окна заносит текущие данные пользователя в поля формы.
  jobInput.value = textProfile.textContent;
  clearValidationInput(validateObject);
  openPopup(popupEdit) //вызываем функцию для открытия попапа
}

function openAddPlacePopup() {
  formAddFoto.reset();
  clearValidationInput(validateObject);
  openPopup(popupAddFoto);
}

function handleProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  titleProfile.textContent = nameInput.value; // Выберите элементы, куда должны быть вставлены значения полей
  textProfile.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
  clearValidationInput(validateObject);
  closePopup(popupEdit); //вызвали функцию closePopup внутри
}


function addPhotoSubmit(evt) {
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

document.addEventListener('click', closePopupOnClick);
//слушатель отправки формы профиля
formEditProfile.addEventListener('submit', handleProfileSubmit);
//добавляем кнопке редактировать слушатель
openProfilePopupButton.addEventListener('click', openPropfilePopup);
//добавляем кнопке закрыть слушатель для
closePopupButtons.forEach(function (button) {
  button.addEventListener('click', function() {
    closePopup(this.closest('.popup'));
  });
});

addPlaceButton.addEventListener('click', openAddPlacePopup);
formAddFoto.addEventListener('submit', addPhotoSubmit);

addCards();

