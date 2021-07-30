import { initialCards } from '../utils/initial-cards.js';
import { validateObject, ui } from '../utils/ui.js';
import { Card} from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css'; 

const validateFormEdit = new FormValidator(validateObject, ui.formEditProfile);
validateFormEdit.enableValidation();
const validateFormAdd = new FormValidator(validateObject, ui.formAddFoto);
validateFormAdd.enableValidation();

const newElementProfileTitle = document.querySelector('.profile__title'),
    newElementProfileText = document.querySelector('.profile__text'),
    userInfo = new UserInfo(newElementProfileTitle, newElementProfileText);

const popupImage = new PopupWithImage('.popup-open-photo');

const section = new Section({ items:initialCards,
  renderer: (item) => {
  const card = createCard(item);
  section.addItem(card, 'append');
  },
}, '.element');
section.renderer();


const popupEditProfile = new PopupWithForm('.popup_edit', {
  handlerSubmit: (options) => {
      userInfo.setUserInfo(options);
      popupEditProfile.close();
  }
});

const popupAddCard = new PopupWithForm('.popup_add-photo', {
  handlerSubmit: (data) => {
      const element = createCard({
          name: data.title,
          link: data.link
      })
    section.addItem(element, 'prepend');
    popupAddCard.close();
  }
});

function openPropfilePopup() {
  const profileInfo = userInfo.getUserInfo();
  ui.nameInput.value = profileInfo.name;
  ui.jobInput.value = profileInfo.about;
  validateFormEdit.clearValidationInput();
  popupEditProfile.open();
}

function openAddPlacePopup() {
  validateFormAdd.clearValidationInput();
  ui.formAddFoto.reset();
  popupAddCard.open();
}

function createCard(item) {
  const card = new Card(item, {
    openPreviewImage: (name, link) => {
      popupImage.open({name, link});
    }
  }, '.element-template');
  const sampleCard = card.generateCard();
  return sampleCard;
};

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();

ui.openProfilePopupButton.addEventListener('click', openPropfilePopup);
ui.addPlaceButton.addEventListener('click', openAddPlacePopup);






