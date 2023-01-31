import EventsPresenter from './presenter/events-presenter';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewEventButtonView from './view/new-event-button-view';
import {render} from './framework/render';
import EventsApiService from './events-api-service';

const AUTHORIZATION = 'Basic m5xk2lfHNk1234vf';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const filtersContainer = document.querySelector('.trip-controls__filters');
const topContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
const tripsPresenter = new EventsPresenter({
  tripEventsContainer,
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});
const filterPresenter = new FilterPresenter({
  filtersContainer,
  filterModel,
  eventsModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: onNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function onNewEventButtonClick() {
  tripsPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

filterPresenter.init();
tripsPresenter.init();
eventsModel.init().finally(() => {
  render(newEventButtonComponent, topContainer);
});
