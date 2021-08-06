export class Api {
    constructor({address, headers}) { 
        this._address = address;
        this._headers = headers;
        // constructor(options) { возможно поменять надо будет и тогда все далее по тексту
        //     this._headers = options.headers;
        //     this._url = options.url;
    }

//Получили инфу с сервера о профиле 
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

//Получили карточки с сервера
    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

//Изменили информацию на сервер о профиле (добавили)
    editUserData(name, about) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse)
    }

    addCard(name, link) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse)
    }

    cardDelete(cardId) {
        return fetch(`${this._address}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResponse)
    }


    setLike(cardId) {
        return fetch(`${this._address}/cards/likes/${cardId}`,
            {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._checkResponse)
    }

    removeLike(cardId) {
        return fetch(`${this._address}/cards/likes/${cardId}`,
            {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResponse)
    }

    updateAvatar(link) {
        // console.log(link)
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
            .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}
