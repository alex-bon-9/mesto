export class Card {

  constructor({name, link, owner, _id, likes}, {
    openPreviewImage,
    handleCardDislike,
    handleCardLike,
    handleDeleteCard,
  }, templateSelector, userId) {
    this._name = name;
    this._image = link;
    this._userId = userId;
    this._owner = owner._id;
    this._template = document.querySelector(templateSelector);
    this._likeButton = '.element__like-button'; 
    this._imageElement = '.element__image'; 
    this._cardDelete = '.element__delete-button';
    this._cardTitle = '.element__group-title';
    this._likes = likes;
    this._handleCardLike = handleCardLike;
    this._handleCardDislike = handleCardDislike;
    this._element = this._getTempalte();
    this._idElement = _id;
    this._openPreviewImage = openPreviewImage;
    this._openPopupConfirmDelete = handleDeleteCard;
    this._cardElement = this._element.querySelector(this._imageElement);
    this._cardLikeElement = this._element.querySelector(this._likeButton);
  }

  _getTempalte() {
    // const newElement = document.querySelector(this._template).content.querySelector('.element__item').cloneNode(true);
    // return newElement; //если не будет разницы по итогу оставить этот вариант
    const newElement = this._template.content.children[0].cloneNode(true);
    return newElement;
  }

  _setCardListeners() {
    this._cardElement.addEventListener("click", () => this._openPreviewImage(this._name, this._image));
    this._cardLikeElement.addEventListener("click", () => {
      const state = this._element.querySelector(this._likeButton).classList.contains('element__like-button_active');

      if (state) {
        this._removelike();
      } else {
        this._addlike();
      }
    });
    this._element.querySelector(this._cardDelete).addEventListener("click", () => this._deleteCard());
  }

  generateCard() {
    this._setCardListeners();
    this.updateLikesCounter();
    this._cardElement.src = this._image;
    this._cardElement.alt = this._name;
    this._element.querySelector(this._cardTitle).textContent = this._name;
    if (this._userId !== this._owner) {
        this._element.querySelector(this._cardDelete).classList.add('element__delete-button_invisible');
    }

    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._element.querySelector(this._likeButton).classList.toggle('element__like-button_active');
        return;
      }
    })

    return this._element;
  }

  updateLikesCounter() {
    this._element.querySelector('.element__like-counter').textContent = this._likes.length;
  }

  _addlike() {
    this._handleCardLike(this._idElement);
    this._element.querySelector(this._likeButton).classList.toggle('element__like-button_active');
  }

  _removelike() {
    this._handleCardDislike(this._idElement);
    this._element.querySelector(this._likeButton).classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._openPopupConfirmDelete(this._idElement, this._element);
  }
}
