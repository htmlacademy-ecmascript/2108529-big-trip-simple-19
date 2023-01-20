import {render} from '../framework/render';
import {sortByDate, sortByPrice} from '../utils/event';
import {SortType, UpdateType, UserAction} from '../const.js';
import SortView from '../view/sort-view';
import TripsListView from '../view/trips-list-view';
import EventPresenter from './event-presenter';
import NoEventsView from '../view/no-events-view';

export default class TripsPresenter {
  #tripsListContainer = null;
  #eventsModel = null;

  #tripsListComponent = new TripsListView();
  #sortComponent = null;
  #noEventsComponent = new NoEventsView();

  #eventPresenterMap = new Map();

  #currentSortType = SortType.DAY;

  constructor(tripsListContainer, eventsModel) {
    this.#tripsListContainer = tripsListContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderEventsList();
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortByPrice);
      default:
        return [...this.#eventsModel.events].sort(sortByDate);
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {

    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenterMap.get(data.id).init(data, this.#eventsModel.destinations, this.#eventsModel.offersByType);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderEventsList();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsList();
        this.#renderEventsList();
        // будет создан презентер фильтров, тут его будем инициализировать
        break;
    }

  };

  #renderEvent(event, destinations, offersByType) {
    const eventPresenter = new EventPresenter({
      container: this.#tripsListComponent,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    });
    eventPresenter.init(event, destinations, offersByType);
    this.#eventPresenterMap.set(event.id, eventPresenter);
  }

  #handleModeChange = () => {
    this.#eventPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#rerenderEventsList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      handleSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripsListContainer);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#tripsListContainer);
  }

  #renderEvents() {
    this.events.forEach((event) =>
      this.#renderEvent(event, this.#eventsModel.destinations, this.#eventsModel.offersByType));
  }

  #renderEventsList() {
    if (this.events.length) {
      if (!this.#sortComponent) {
        this.#renderSort();
      }
      render(this.#tripsListComponent, this.#tripsListContainer);
      this.#renderEvents();
    } else {
      this.#renderNoEvents();
    }
  }

  #clearEventsList() {
    this.#eventPresenterMap.forEach((presenter) => presenter.destroy());
    this.#eventPresenterMap.clear();
  }

  #rerenderEventsList() {
    this.#clearEventsList();
    this.#renderEventsList();
  }
}
