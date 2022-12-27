import EventView from '../view/event-view';
import EditEventFormView from '../view/edit-event-form-view';
import {render, replace} from '../framework/render';


export default class EventPresenter {
  #tripsListComponent = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #destination = null;
  #availableOffers = null;
  #offers = null;

  constructor(tripsListComponent) {
    this.#tripsListComponent = tripsListComponent;
  }

  init(event, destinations, offersByType) {
    this.#event = event;

    this.#destination = destinations.find((item) => event.destination === item.id);
    this.#availableOffers = offersByType.find((item) => item.type === event.type).offers;
    this.#offers =
      offersByType
        .find((item) => item.type === event.type).offers
        .filter((offer) => event.offers.includes(offer.id));

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

  #replaceCardToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
  };

  #replaceFormToCard = () => {
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

}
