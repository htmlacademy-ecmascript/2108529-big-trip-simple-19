import {createElement} from '../render';

function createTripsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripsListView {
  #element = null;

  get template() {
    return createTripsListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
