// import { initialCards } from '../utils/initial-cards.js';
import { validateObject, ui, confirmDeletePopup, updateAvatar } from '../utils/ui.js';
import { Card} from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmDelete } from '../components/PopupWithConfirmDelete.js';
import './index.css'; 

const validateFormEdit = new FormValidator(validateObject, ui.formProfileEdit);
// const validateFormEdit = new FormValidator(validateObject, ui.formEditProfile); было
validateFormEdit.enableValidation();
const validateFormAdd = new FormValidator(validateObject, ui.formAddFoto);
validateFormAdd.enableValidation();
const validateFormUpdateAvatar = new FormValidator(validateObject, updateAvatar);
validateFormUpdateAvatar.enableValidation();

const newElementProfileTitle = document.querySelector('.profile__title'),
    newElementProfileText = document.querySelector('.profile__text'),
    newAvatar = document.querySelector('.profile__avatar'),
    userInfo = new UserInfo(newElementProfileTitle, newElementProfileText, newAvatar);

const popupImage = new PopupWithImage(ui.previewImagePopup);

//ПопАп редактирования профиля
const popupEditProfile = new PopupWithForm(ui.profileEditorPopup, {
  handlerSubmit: (data) => {
    api.editUserData(data.name, data.job)
      .then(result => {
        userInfo.setUserInfo(result.name, result.about);
        popupEditProfile.close();
    })
      .catch((err) => {
        console.log(err); // здесь можно еще подумать и подредактировать (метод кэтч и файнали -- сохранить)
    })
  }
});

//попАп добавления карточки
const popupAddCard = new PopupWithForm(ui.newPlacePopup, {
  handlerSubmit: (data) => {
    api.addCard(data.title, data.link) //было до - data.title переименовал на data.name
      .then(result => {
        const element = createCard(result)
        section.addItem(element, 'prepend');
        })
      .catch((err) => {
        console.log(err);
      })
    popupAddCard.close();
    }
});

const popupUpdateAvatar = new PopupWithForm(updateAvatar, {
  handlerSubmit: ({link}) => {
    api.updateAvatar(link)
      .then(({avatar}) => {
        userInfo.setUserAvatar(avatar);
        popupUpdateAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})

//Попап удаления карточки
const popupDelete = new  PopupWithConfirmDelete(confirmDeletePopup, {
  submitHandler: (cardId) => {
      api.cardDelete(cardId)
        .then((data) => {
          popupDelete.cardElement.remove()
          popupDelete.close();
        })
        .catch((err) => {
          console.log(err);
        })
  }
})

function openPopupAvatar() {
  validateFormUpdateAvatar.clearValidationInput();
  popupUpdateAvatar.open();
}

function openPropfilePopup() {
  const profileInfo = userInfo.getUserInfo();
  ui.nameInput.value = profileInfo.name;
  ui.jobInput.value = profileInfo.about;
  validateFormEdit.clearValidationInput();
  popupEditProfile.open();
}

function openAddPlacePopup() {
  validateFormAdd.clearValidationInput();
  popupAddCard.open();
  // ui.formAddFoto.reset();
}

const section = new Section({
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card, 'append');
  },
}, '.element');

function createCard(item) {
  const userId = userInfo.getUserId()
  const card = new Card(item, {
    openPreviewImage: (name, link) => {
      popupImage.open({name, link});
    },
    handleDeleteCard: (cardId, elem) => {
      popupDelete.open(cardId, elem);
    },
    handleCardLike: (cardId) => {
      api.setLike(cardId)
        .then(({likes}) => {
          card._likes = likes;
          card.updateLikesCounter();
        })
        .catch((err) => {
          console.log(err);
        })
    },
    handleCardDislike: (cardId) => {
      api.removeLike(cardId)
        .then(({likes}) => {
          card._likes = likes;
          card.updateLikesCounter();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, '.element-template', userId)
  return card.generateCard(); 
};

//вызов API сервера
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'd7ba4792-c046-407e-bd03-0f3f72508d52',
    'Content-Type': 'application/json'
  }
})

Promise.all([
  api.getUserInfo()
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data._id)
      userInfo.setUserAvatar(data.avatar);
    })
    .catch((err) => {
      console.log(err);
    }),
  api.getInitialCards()
    .then(data => {
      section.renderer(data)
    })
    .catch((err) => {
      console.log(err);
    })
])
  .catch(error => console.log(error))


ui.openProfilePopupButton.addEventListener('click', openPropfilePopup);
ui.addPlaceButton.addEventListener('click', openAddPlacePopup);
ui.avatarEditingButton.addEventListener('click', openPopupAvatar);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
popupDelete.setEventListeners();
popupUpdateAvatar.setEventListeners();
