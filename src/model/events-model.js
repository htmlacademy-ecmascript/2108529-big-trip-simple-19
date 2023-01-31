import Observable from '../framework/observable';
import {UpdateType} from '../const.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;

  #events = [];
  #destinations = [];
  #offersByType = [];

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;

  }

  async init() {
    try {
      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);

      this.#destinations = await this.#eventsApiService.destinations;
      this.#offersByType = await this.#eventsApiService.offers;
    } catch (err) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  }

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = this.#events.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#eventsApiService.createEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);
      this.#events.splice(index, 1);
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }

    this._notify(updateType);
  }

  #adaptToClient(event) {
    event.basePrice = event['base_price'];
    event.dateFrom = event['date_from'];
    event.dateTo = event['date_to'];

    delete event['base_price'];
    delete event['date_from'];
    delete event['date_to'];
    return event;
  }

}
