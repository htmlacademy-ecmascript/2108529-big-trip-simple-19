import {render, replace} from '../framework/render';
import SortView from '../view/sort-view';
import TripsListView from '../view/trips-list-view';
import EventView from '../view/event-view';
import EditEventFormView from '../view/edit-event-form-view';
import NoEventsView from '../view/no-events-view';

export default class TripsPresenter {
  #tripsListContainer = null;
  #eventsModel = null;

  #tripsListComponent = new TripsListView();
  #sortComponent = new SortView();
  #noEventsComponent = new NoEventsView();

  #events = [];

  constructor(tripsListContainer, eventsModel) {
    this.#tripsListContainer = tripsListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    this.#renderEventsList();
  }

  #renderEvent(event, destinations, offersByType) {
    const destination = destinations.find((item) => event.destination === item.id);
    const availableOffers = offersByType.find((item) => item.type === event.type).offers;
    const offers =
      offersByType
        .find((item) => item.type === event.type).offers
        .filter((offer) => event.offers.includes(offer.id));

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView(
      {
        event,
        destination,
        offers,
        onRollupButtonClick: () => {
          replaceCardToForm.call(this);
          document.addEventListener('keydown', escKeyDownHandler);
        }
      }
    );

    const eventEditComponent = new EditEventFormView(
      {
        event,
        destination,
        availableOffers,
        isNewPoint: false,
        onFormSubmit: closeEventEditForm,
        onRollupButtonClick: closeEventEditForm
      }
    );

    function replaceCardToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToCard() {
      replace(eventComponent, eventEditComponent);
    }

    function closeEventEditForm() {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(eventComponent, this.#tripsListComponent.element);
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripsListContainer);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#tripsListContainer);
  }

  #renderEventsList() {
    if (this.#events.length) {
      this.#renderSort();
      render(this.#tripsListComponent, this.#tripsListContainer);
      for (let i = 0; i < this.#events.length; i++) {
        this.#renderEvent(this.#events[i], this.#eventsModel.destinations, this.#eventsModel.offersByType);
      }
    } else {
      this.#renderNoEvents();
    }
  }
}
