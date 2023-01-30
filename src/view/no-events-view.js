import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

function createNoEventsTemplate(filterType) {

  const noEventsMessage = {
    [FilterType.ALL]: 'Click New Event to create your first point',
    [FilterType.FUTURE]: 'There are new future events now'
  };

  return `<p class="trip-events__msg">${noEventsMessage[filterType]}</p>`;
}

export default class NoEventsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createNoEventsTemplate(this.#filterType);
  }

}
