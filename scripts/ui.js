export { ui, validateObject, profileEditorPopup, newPlacePopup };

const ui = {
  profileEditorPopup : document.querySelector('.popup_edit'), //сохранил попап редактир профиля в переменную
  openProfilePopupButton : document.querySelector('.profile__edit-button'), //сохраняем  кнопку редактировать в переменную.
  closePopupButtons : document.querySelectorAll('.popup__close-button'), //сохраняем  кнопку закрыть в переменную.
  clickOnTheFormButton : document.querySelector('.popup_edit').querySelector('.form'), //сохраняем  форму чтобы при клике на форму поп-ап не исчезал
  formEditProfile : document.querySelector('.form'), // сохраняем форму профиля
  nameInput : document.querySelector('.form__input_type_name'), //Находим поля формы в DOM
  jobInput : document.querySelector('.form__input_type_job'), //Находим поля формы в DOM
  titleProfile : document.querySelector('.profile__title'), //сохраняем заголовок профиля title
  textProfile : document.querySelector('.profile__text'), //сохраняем текст профиля
  templateElement : document.querySelector('.element-template').content, //находим содержимое темплейт
  insertElementAfter : document.querySelector('.element'), // после чего добавляем карточки
  newPlacePopup : document.querySelector('.popup_add-photo'), //сохранил попап Add-photo в переменную popup
  formAddFoto : document.querySelector('.popup_add-photo').querySelector('.form'), // сохраняем форму добавления фото
  placeNameInput : document.querySelector('.form__input_type_title'), //Находим поле формы - название
  linkInput : document.querySelector('.form__input_type_link'), //Находим поле формы - ссылка
  addPlaceButton : document.querySelector('.profile__add-button'), //сохраняем  кнопку добавить место в переменную.
  closepopupAdd : document.querySelector('.popup_add-photo').querySelector('.popup__close-button'), //кнопка закрыть попап с фото
  formSaveButton : document.querySelector('.popup_add-photo').querySelector('.form').querySelector('.form__save-button'),
  likeTemplateButton : document.querySelector('.element-template'),
  likebutton : document.querySelector('.element-template').querySelector('.element__like-button'), //кнопка лайка
  previewImagePopup : document.querySelector('.popup-open-photo'),
  previewImagePopupPicture : document.querySelector('.popup-open-photo__image'),
  previewImagePopupCaption : document.querySelector('.popup-open-photo__caption'),
  previewImagePopupOverlays : document.querySelectorAll('.popup')
};

const validateObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disable',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__error_visible',
  errorEmptyInputMessage: 'Вы пропустили это поле.',
  errorEmptyUrlMessage: 'Введите адрес сайта.',
  inputUrlClass: 'form__input_type_link'
};

const profileEditorPopup = document.querySelector('.popup_edit'); //сохранил попап редактир профиля в переменную
const newPlacePopup = document.querySelector('.popup_add-photo'); //сохранил попап Add-photo в переменную popup
