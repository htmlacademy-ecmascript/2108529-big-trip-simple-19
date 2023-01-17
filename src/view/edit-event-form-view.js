import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function createAvailableOffersTemplate(offers, availableOffers) {

  const availableOffersElements = availableOffers.map((offer) => `<div class="event__offer-selector">
                         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name=${offer.title} ${offers.includes(offer.id) ? 'checked' : ''}>
                         <label class="event__offer-label" for="event-offer-${offer.id}"}>
                           <span class="event__offer-title">${offer.title}</span>
                           +€&nbsp;
                           <span class="event__offer-price">${offer.price}</span>
                         </label>
                       </div>`
  ).join('');
  return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${availableOffersElements}
                    </div>
                  </section>`;
}

function createDestinationTemplate(destination) {

  const destinationPhotosContainer = destination.pictures.length ?
    `                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                           ${destination.pictures.map((picture) => `<img class="event__photo" src=${picture.src} alt=${picture.description}>
                            `).join('')}
                      </div>
                    </div>` : '';
  return `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">${destination.name}</h3>
                    ${destination.description ? `<p class="event__destination-description">${destination.description}</p>` : ''}
                    ${destinationPhotosContainer}
                  </section>`;
}

function createEventTypesList(types, eventType) {
  return types.map((type) => (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
             value=${type} ${eventType === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
    </div>`
  )).join('');
}

function createEditPointTemplate(event, destination, availableOffers, isNewPoint, allOffers) {

  const {type, dateFrom, dateTo, basePrice, offers} = event;
  const availableOffersContainer = offers.length ? createAvailableOffersTemplate(offers, availableOffers) : '';

  const eventTypes = allOffers.map((offer) => offer.type);
  const eventTypesList = createEventTypesList(eventTypes, type);

  //Deciding whether to display the destination section
  const isDestinationDisplayed = destination.description || destination.pictures.length;
  const destinationTemplate = isDestinationDisplayed
    ? createDestinationTemplate(destination)
    : '';

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                            ${eventTypesList}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dayjs(dateFrom).format('YY/MM/DD')}>
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dayjs(dateTo).format('YY/MM/DD')}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${isNewPoint ? 'Cancel' : 'Delete'}</button>
                  ${isNewPoint ? '' : `<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>`}
                </header>
                <section class="event__details">
                  ${availableOffersContainer}
                  ${destinationTemplate}
                </section>
              </form>
            </li>`;
}

export default class EditEventFormView extends AbstractStatefulView {
  #allOffers = null;
  #destination = null;
  #isNewPoint = Boolean;
  #handleFormSubmit = () => {};
  #handleRollupButtonClick = () => {};

  constructor({event, destination, allOffers, isNewPoint, onFormSubmit, onRollupButtonClick}) {
    super();
    this.#destination = destination;
    this.#allOffers = allOffers;
    this.#isNewPoint = isNewPoint;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this._setState(EditEventFormView.parseEventToState(event, this.#allOffers));

    this._restoreHandlers();
  }

  static parseEventToState(event, allOffers) {
    const availableOffers = allOffers.find((item) => item.type === event.type).offers;
    return {
      ...event,
      availableOffers
    };
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#eventTypeChangeHandler);
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destination, this._state.availableOffers, this.#isNewPoint, this.#allOffers);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    console.log(evt.target.checked);
    const type = evt.target.value;
    const availableOffers = this.#allOffers.find((item) => item.type === type).offers;
    if (evt.target.className.includes('event__type-input')) {
      this.updateElement({type, availableOffers});
    }
  };
}
