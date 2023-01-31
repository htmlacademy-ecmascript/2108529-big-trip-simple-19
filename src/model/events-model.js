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

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#events = this.#events.map((event) => event.id === updatedPoint.id ? updatedPoint : event);
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
  }

  async addEvent(updateType, update) {

    try {
      const response = await this.#pointsApiService.createEvent(update);
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
      await this.#pointsApiService.deleteEvent(update);
      this.#events.splice(index, 1);
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }

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
