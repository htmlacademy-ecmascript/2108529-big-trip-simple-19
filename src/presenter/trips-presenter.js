import {render} from '../render';
import SortView from '../view/sort-view';
import TripsListView from '../view/trips-list-view';
import EventView from '../view/event-view';
import EditEventFormView from '../view/edit-event-form-view';

export default class TripsPresenter {
  tripsListComponent = new TripsListView();

  constructor(tripsListContainer) {
    this.tripsListContainer = tripsListContainer;
  }

  init() {
    render(new SortView, this.tripsListContainer);
    render(this.tripsListComponent, this.tripsListContainer);
    render(new EditEventFormView(), this.tripsListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.tripsListComponent.getElement());
    }
  }
}
