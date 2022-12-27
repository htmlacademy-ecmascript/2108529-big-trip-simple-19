import {render} from '../framework/render';
import SortView from '../view/sort-view';
import TripsListView from '../view/trips-list-view';
import EventPresenter from './event-presenter';
import NoEventsView from '../view/no-events-view';

export default class TripsPresenter {
  #tripsListContainer = null;
  #eventsModel = null;

  #tripsListComponent = new TripsListView();
  #sortComponent = new SortView();
  #noEventsComponent = new NoEventsView();

  #events = [];
  #eventPresenterMap = new Map();

  constructor(tripsListContainer, eventsModel) {
    this.#tripsListContainer = tripsListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#renderEventsList();
  }

  #renderEvent(event, destinations, offersByType) {
    const eventPresenter = new EventPresenter(this.#tripsListComponent, this.#handleModeChange);
    eventPresenter.init(event, destinations, offersByType);
    this.#eventPresenterMap.set(event.id, eventPresenter);
  }

  #handleModeChange = () => {
    this.#eventPresenterMap.forEach((presenter) => presenter.resetView());
  };

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
