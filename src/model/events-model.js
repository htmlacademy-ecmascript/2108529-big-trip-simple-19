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

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = this.#events.map((event) => event.id === update.id ? update : event);

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [update, ...this.#events];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events.splice(index, 1);

    this._notify(updateType);
  }

}
