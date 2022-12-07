import {render} from './render';
import FilterView from './view/filter-view';
import TripsPresenter from './presenter/trips-presenter';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripsPresenter = new TripsPresenter(tripEventsContainer);

render(new FilterView(), filtersContainer);

tripsPresenter.init();
