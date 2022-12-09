import {mockEvents} from '../mock/events';

export default class EventsModel {
  events = mockEvents;

  getEvents() {
    return this.events;
  }
}
