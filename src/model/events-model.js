import {mockEvents, destinations, offersByType} from '../mock/events';
import Observable from '../framework/observable';

export default class EventsModel extends Observable {
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
