import {render, remove} from '../framework/render';
import {sortByDate, sortByPrice} from '../utils/event';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import SortView from '../view/sort-view';
import TripsListView from '../view/trips-list-view';
import EventPresenter from './event-presenter';
import NoEventsView from '../view/no-events-view';
import {filter} from '../utils/filter';
import NewEventPresenter from './new-event-presenter';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripsPresenter {
  #tripsListContainer = null;
  #eventsModel = null;
  #filterModel = null;

  #tripsListComponent = new TripsListView();
  #sortComponent = null;
  #noEventsComponent = null;
  #loadingComponent = new LoadingView();

  #eventPresenterMap = new Map();
  #newEventPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.ALL;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({tripEventsContainer, eventsModel, filterModel, onNewEventDestroy}) {
    this.#tripsListContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      container: this.#tripsListComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderEventsList();
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
      default:
        return filteredEvents.sort(sortByDate);
    }
  }

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#newEventPresenter.init({
      destinations: this.#eventsModel.destinations,
      offersByType: this.#eventsModel.offersByType,
    });
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenterMap.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch(err) {
          this.#eventPresenterMap.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenterMap.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch(err) {
          this.#eventPresenterMap.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEventsList();
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
    this.#newEventPresenter.destroy();
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
    this.#noEventsComponent = new NoEventsView({
      filterType: this.#filterType
    });

    render(this.#noEventsComponent, this.#tripsListContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripsListContainer);
  }

  #renderEvents() {
    this.events.forEach((event) =>
      this.#renderEvent(event, this.#eventsModel.destinations, this.#eventsModel.offersByType));
  }

  #renderEventsList() {
    if (this.#isLoading) {
      return this.#renderLoading();
    }

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
    this.#newEventPresenter.destroy();
    this.#eventPresenterMap.forEach((presenter) => presenter.destroy());
    this.#eventPresenterMap.clear();
    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
  }

  #rerenderEventsList() {
    this.#clearEventsList();
    this.#renderEventsList();
  }
}
