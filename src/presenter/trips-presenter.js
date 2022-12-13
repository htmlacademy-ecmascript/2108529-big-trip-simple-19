import {render} from '../render';
import SortView from '../view/sort-view';
import TripsListView from '../view/trips-list-view';
import EventView from '../view/event-view';
import EditEventFormView from '../view/edit-event-form-view';
import {getRandomArrayElement} from '../utils';

export default class TripsPresenter {
  #tripsListContainer = null;
  #eventsModel = null;

  #tripsListComponent = new TripsListView();

  #events = [];

  constructor(tripsListContainer, eventsModel) {
    this.#tripsListContainer = tripsListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    render(new SortView, this.#tripsListContainer);
    render(this.#tripsListComponent, this.#tripsListContainer);
    render(new EditEventFormView(getRandomArrayElement(this.#events), this.#eventsModel.destinations, this.#eventsModel.offersByType), this.#tripsListComponent.element);
    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i], this.#eventsModel.destinations, this.#eventsModel.offersByType);
    }
  }

  #renderEvent(event, destinations, offersByType) {
    const destination = destinations.find((item) => event.destination === item.id);
    const offers =
      offersByType
        .find((item) => item.type === event.type).offers
        .filter((offer) => event.offers.includes(offer.id));

    render(new EventView(event, destination, offers), this.#tripsListComponent.element);
  }

}
