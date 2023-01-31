import Observable from '../framework/observable';
import {UpdateType} from '../const.js';

export default class EventsModel extends Observable {
  #pointsApiService = null;

  #events = [];
  #destinations = [];
  #offersByType = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#events = points.map(this.#adaptToClient);

      this.#destinations = await this.#pointsApiService.destinations;
      this.#offersByType = await this.#pointsApiService.offers;
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

  #adaptToClient(point) {
    point.basePrice = point['base_price'];
    point.dateFrom = point['date_from'];
    point.dateTo = point['date_to'];

    delete point['base_price'];
    delete point['date_from'];
    delete point['date_to'];

    return point;
  }

}
