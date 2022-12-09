import {createElement} from '../render';
import {offersByType} from '../mock/events';
import dayjs from 'dayjs';

function createTripPointTemplate(event) {

  const {type, destination, dateFrom, dateTo, basePrice, offers} = event;

  const eventTypeOffers = offersByType.find((offerType) => offerType.type === type);

  const offersTemplate = eventTypeOffers.offers
    .filter((offer) => offers.includes(offer.id))
    .map((offer) => `
                      <li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`).join('');

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dayjs(dateFrom).format('MMM')} ${dayjs(dateFrom).format('YY')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${dateFrom}>11:00</time>
                    &mdash;
                    <time class="event__end-time" datetime=${dateTo}>15:00</time>
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

export default class EventView {

  constructor(event) {
    this.event = event;
  }

  getTemplate() {
    return createTripPointTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
