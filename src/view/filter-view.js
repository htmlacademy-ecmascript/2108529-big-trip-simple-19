import AbstractView from '../framework/view/abstract-view';

function createFiltersTemplate(filters, currentFilter) {
  return filters.map((filter) =>
    `<div class="trip-filters__filter">
        <input id='filter-${filter.type}' class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filter.type} ${filter.type === currentFilter ? 'checked' : ''} ${filter.count > 0 ? '' : 'disabled'}>
        <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
    </div>`
  ).join('');
}

function createFilterTemplate(filters, currentFilter) {

  const filtersTemplate = createFiltersTemplate(filters, currentFilter);

  return `
    <form class="trip-filters" action="#" method="get">
        ${filtersTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
