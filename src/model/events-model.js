import {mockEvents, destinations, offersByType} from '../mock/events';

export default class EventsModel {
  events = mockEvents;
  _destinations = destinations;
  _offersByType = offersByType;

  getEvents() {
    return this.events;
  }


  get destinations() {
    return this._destinations;
  }

  get offersByType() {
    return this._offersByType;
  }
}
