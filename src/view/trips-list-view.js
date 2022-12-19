import AbstractView from '../framework/view/abstract-view';

function createTripsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripsListView extends AbstractView {
  get template() {
    return createTripsListTemplate();
  }
}
