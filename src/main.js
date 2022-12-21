import {render} from './framework/render';
import {generateFilters} from './mock/filters';
import FilterView from './view/filter-view';
import TripsPresenter from './presenter/trips-presenter';
import EventsModel from './model/events-model';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const tripsPresenter = new TripsPresenter(tripEventsContainer, eventsModel);

const filtersMockData = generateFilters(eventsModel.events);
render(new FilterView(filtersMockData), filtersContainer);

tripsPresenter.init();
