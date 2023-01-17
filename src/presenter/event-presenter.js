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
  #destination = null;
  #availableOffers = null;
  #offers = null;

  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor(tripsListComponent, handleModeChange) {
    this.#tripsListComponent = tripsListComponent;
    this.#handleModeChange = handleModeChange;
  }

  init(event, destinations, offersByType) {
    this.#event = event;

    this.#destination = destinations.find((item) => this.#event.destination === item.id);
    this.#availableOffers = offersByType.find((item) => item.type === this.#event.type).offers;
    this.#offers = this.#availableOffers.filter((offer) => this.#event.offers.includes(offer.id));

    this.#eventComponent = new EventView(
      {
        event: this.#event,
        destination: this.#destination,
        offers: this.#offers,
        onRollupButtonClick: () => {
          this.#replaceCardToForm();
          document.addEventListener('keydown', this.#escKeyDownHandler);
        }
      }
    );

    this.#eventEditComponent = new EditEventFormView(
      {
        event: this.#event,
        destination: this.#destination,
        availableOffers: this.#availableOffers,
        isNewPoint: false,
        onFormSubmit: this.#handleFormSubmit,
        onRollupButtonClick: this.#closeEventEditForm
      }
    );

    render(this.#eventComponent, this.#tripsListComponent.element);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
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
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeEventEditForm();
    }
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

}
