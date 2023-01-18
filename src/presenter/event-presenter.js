import EventView from '../view/event-view';
import EditEventFormView from '../view/edit-event-form-view';
import {render, replace, remove} from '../framework/render';

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

    this.#eventEditComponent = new EditEventFormView(
      {
        event: this.#event,
        destinations: this.#destinations,
        allOffers: this.#allOffers,
        isNewPoint: false,
        onFormSubmit: this.#handleFormSubmit,
        onRollupButtonClick: this.#closeEventEditForm
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
      this.#eventEditComponent.reset(this.#event);
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

  #handleFormSubmit = (event) => {
    this.#replaceFormToCard();
    this.#handleDataChange(event);
  };

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

}
