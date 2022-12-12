import {render} from '../render';
import SortView from '../view/sort-view';
import TripsListView from '../view/trips-list-view';
import EventView from '../view/event-view';
import EditEventFormView from '../view/edit-event-form-view';
import {getRandomArrayElement} from '../utils';

export default class TripsPresenter {
  tripsListComponent = new TripsListView();

  constructor(tripsListContainer, eventsModel) {
    this.tripsListContainer = tripsListContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];

    render(new SortView, this.tripsListContainer);
    render(this.tripsListComponent, this.tripsListContainer);
    render(new EditEventFormView(getRandomArrayElement(this.events), this.eventsModel.destinations, this.eventsModel.offersByType), this.tripsListComponent.getElement());
    for (let i = 0; i < this.events.length; i++) {
      render(new EventView(this.events[i], this.eventsModel.destinations, this.eventsModel.offersByType), this.tripsListComponent.getElement());
    }
  }
}
