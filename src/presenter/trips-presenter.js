import {render} from '../render';
import SortView from '../view/sort-view';
import TripsListView from '../view/trips-list-view';
import EventView from '../view/event-view';
import EditEventFormView from '../view/edit-event-form-view';

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
    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i], this.#eventsModel.destinations, this.#eventsModel.offersByType);
    }
  }

  #renderEvent(event, destinations, offersByType) {
    const destination = destinations.find((item) => event.destination === item.id);
    const availableOffers = offersByType.find((item) => item.type === event.type).offers;
    const offers =
      offersByType
        .find((item) => item.type === event.type).offers
        .filter((offer) => event.offers.includes(offer.id));

    const eventComponent = new EventView(event, destination, offers);
    const eventEditComponent = new EditEventFormView(event, destination, availableOffers);

    const replaceCardToForm = () => {
      this.#tripsListComponent.element.replaceChild(eventEditComponent.element, eventComponent.element);
    };

    const replaceFormToCard = () => {
      this.#tripsListComponent.element.replaceChild(eventComponent.element, eventEditComponent.element);
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => replaceCardToForm());

    eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
    });

    render(eventComponent, this.#tripsListComponent.element);
  }

}
