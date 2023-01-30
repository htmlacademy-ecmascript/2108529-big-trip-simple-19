import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {render, replace, remove} from '../framework/render';
import {UserAction, UpdateType} from '../const.js';
import {humanizeEventDate} from '../utils/event';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #tripsListComponent = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #destinations = null;
  #destination = null;
  #allOffers = null;
  #availableOffers = null;
  #offers = null;

  #handleModeChange = null;
  #handleDataChange = null;
  #mode = Mode.DEFAULT;

  constructor({container, onModeChange, onDataChange}) {
    this.#tripsListComponent = container;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(event, destinations, offersByType) {
    const prevEventComponent = this.#eventComponent;

    this.#event = event;
    this.#allOffers = offersByType;
    this.#destinations = destinations;
    this.#destination = this.#destinations.find((item) => this.#event.destination === item.id);
    this.#availableOffers = offersByType.find((item) => item.type === this.#event.type).offers;
    this.#offers = this.#availableOffers.filter((offer) => this.#event.offers.includes(offer.id));

    this.#eventComponent = new EventView(
      {
        event: this.#event,
        destination: this.#destination,
        offers: this.#offers,
        onRollupButtonClick: this.#openEventEditForm,
      }
    );

    this.#eventEditComponent = new EditEventView(
      {
        event: this.#event,
        destinations: this.#destinations,
        allOffers: this.#allOffers,
        onFormSubmit: this.#handleFormSubmit,
        onRollupButtonClick: this.#closeEventEditForm,
        onDeleteButtonClick: this.#handleDeleteClick
      }
    );

    if (prevEventComponent === null) {
      render(this.#eventComponent, this.#tripsListComponent.element);
      return;
    }

    replace(this.#eventComponent, prevEventComponent);
    remove(prevEventComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
      this.#eventEditComponent.reset(this.#event, this.#allOffers, this.#destinations);
    }
  };

  #openEventEditForm = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceCardToForm = () => {
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
    replace(this.#eventEditComponent, this.#eventComponent);
  };

  #replaceFormToCard = () => {
    this.#mode = Mode.DEFAULT;
    replace(this.#eventComponent, this.#eventEditComponent);
  };

  #closeEventEditForm = () => {
    this.#replaceFormToCard();
    this.#eventEditComponent.reset(this.#event, this.#allOffers, this.#destinations);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeEventEditForm();
    }
  };

  #handleFormSubmit = (event, sourcedEvent) => {
    this.#replaceFormToCard();
    /*
* изменяются 4 вещи:
* 1. тип точки - ничего не меняется, чисто patch
* 2. локация - ничего не меняется, чисто patch
* 3. даты поездки - могут меняться фильтры и положение события в списке по сортировке
* 4. цена - может меняться положение точки в списке при сортировке
* поэтому 1 и 2 - patch
* 3 - major
* 4 - minor
* значит нужно определять, что было изменено, чем новый стейт в момент сохранения отличается от старого
* */

    let updateType;
    if (humanizeEventDate(event.dateFrom) !== humanizeEventDate(sourcedEvent.dateFrom)) {
      updateType = UpdateType.MAJOR;
    } else if (event.basePrice !== sourcedEvent.basePrice) {
      updateType = UpdateType.MINOR;
    } else {
      updateType = UpdateType.PATCH;
    }

    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      updateType,
      event
    );
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MAJOR,
      event
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

}
