import {render} from './render';
import FilterView from './view/filter-view';
import TripsPresenter from './presenter/trips-presenter';
import EventsModel from './model/events-model';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel;
const tripsPresenter = new TripsPresenter(tripEventsContainer, eventsModel);

render(new FilterView(), filtersContainer);

tripsPresenter.init();
