import AbstractView from '../framework/view/abstract-view';
import {humanizeEventDate, humanizeEventTime} from '../utils/event';

function createTripPointTemplate(event, destination, offers) {

  const {type, dateFrom, dateTo, basePrice} = event;

  const offersTemplate =
    offers.map((offer) => `
                      <li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`).join('');

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${humanizeEventDate(dateFrom)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${dateFrom}>${humanizeEventTime(dateFrom)}</time>
                    &mdash;
                    <time class="event__end-time" datetime=${dateTo}>${humanizeEventTime(dateTo)}</time>
                  </p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersTemplate}
                </ul>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class EventView extends AbstractView {
  #event = null;
  #destination = null;
  #offers = null;
  #handleRollupButtonClick = null;

  constructor({event, destination, offers, onRollupButtonClick}) {
    super();
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#handleRollupButtonClick = onRollupButtonClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);
  }

  get template() {
    return createTripPointTemplate(this.#event, this.#destination, this.#offers);
  }

  #rollupButtonClickHandler = () => {
    this.#handleRollupButtonClick();
  };

}
