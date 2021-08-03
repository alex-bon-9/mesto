import {Card} from "./Card.js";
export class Section {  //У Section нет своей разметки. Он получает через функцию-колбэк и вставляет её в контейнер.
  constructor({renderer}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  // метод, отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента - renderer.
  renderer(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, insertElementAfter) { //принимает DOM-элемент и добавляет его в контейнер.
    this._container[insertElementAfter](element);
  }
}