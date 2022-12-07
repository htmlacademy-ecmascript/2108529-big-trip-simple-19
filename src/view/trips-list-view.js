import {createElement} from '../render';

function createTripsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripsListView {
  getTemplate() {
    return createTripsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
