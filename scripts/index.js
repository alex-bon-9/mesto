import { initialCards } from './initial-cards.js';
import { validateObject, ui } from './ui.js';
import { Card} from './Card.js';
import { FormValidator } from './FormValidator.js';

const validateFormEdit = new FormValidator(validateObject, ui.formEditProfile);
validateFormEdit.enableValidation();
const validateFormAdd = new FormValidator(validateObject, ui.formAddFoto);
validateFormAdd.enableValidation();


function openPopup(popup) {
	popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupPressEsc);
}

function closePopupPressEsc(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// function closePopupOnClick () {
//   ui.previewImagePopupOverlays.forEach((popup) => {
//     popup.addEventListener('click', function(evt) {
//       if (evt.target.classList.contains('popup'))
//         closePopup(popup);
//       })
//   })
// }

function openPropfilePopup() {
  ui.nameInput.value = ui.titleProfile.textContent;
  ui.jobInput.value = ui.textProfile.textContent;
  validateFormEdit.clearValidationInput();
  openPopup(ui.profileEditorPopup);
}

function openAddPlacePopup() {
  validateFormAdd.clearValidationInput();
  ui.formAddFoto.reset();
  openPopup(ui.newPlacePopup);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  ui.titleProfile.textContent = ui.nameInput.value;
  ui.textProfile.textContent = ui.jobInput.value;
  // validateFormEdit.clearValidationInput();
  closePopup(ui.profileEditorPopup);
}


function addPhotoSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({name:ui.placeNameInput.value, link:ui.linkInput.value});
  ui.insertElementAfter.prepend(newCard);
  closePopup(ui.newPlacePopup);
  ui.formAddFoto.reset();
}

function createCard(item) {
  const card = new Card(item, ui.templateElement, openPreviewImage);
  const sampleCard = card.generateCard();

  return sampleCard;
}

function renderCards() {
  initialCards.forEach((item) => {
    const sampleCard = createCard(item);

    ui.insertElementAfter.append(sampleCard);
  });
}

 function openPreviewImage(name, link) {
  ui.previewImagePopupCaption.textContent = name;
  ui.previewImagePopupPicture.src = link;
  ui.previewImagePopupPicture.alt = name;
  openPopup(ui.previewImagePopup)
}

// document.addEventListener('click', closePopupOnClick); v1.0
// closePopupOnClick(); v1.1


ui.formEditProfile.addEventListener('submit', handleProfileSubmit);

ui.openProfilePopupButton.addEventListener('click', openPropfilePopup);

// ui.closePopupButtons.forEach(function (button) {
//   button.addEventListener('click', function() {
//     closePopup(this.closest('.popup'));
//   });
// });

// объединили обработчики Оверлея и Крестиков:
const popups = document.querySelectorAll('.popup');

  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
    })
  })

ui.addPlaceButton.addEventListener('click', openAddPlacePopup);
ui.formAddFoto.addEventListener('submit', addPhotoSubmit);


renderCards();

