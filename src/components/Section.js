export class Section { //У Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
  constructor({ items, renderer }, containerSelector) { //items — это массив данных, которые нужно добавить на страницу при инициализации класса.
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);//селектор контейнера, в который нужно добавлять созданные элементы.
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице.
  }

  renderer () {     // метод, отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента - renderer
    this._renderedItems.forEach((item) => { // для каждого эл-та массива
      this._renderer(item);
    });
  }


  addItem (element, insertElementAfter) {//принимает DOM-элемент и добавляет его в контейнер.
    this._container[insertElementAfter](element);
  }
}
