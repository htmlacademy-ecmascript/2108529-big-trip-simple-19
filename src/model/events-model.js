import {mockEvents, destinations, offersByType} from '../mock/events';

export default class EventsModel {
  #events = mockEvents;
  #destinations = destinations;
  #offersByType = offersByType;

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
  }
}
