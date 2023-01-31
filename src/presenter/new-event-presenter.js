import EditEventView from '../view/edit-event-view';
import {render, remove, RenderPosition} from '../framework/render';
import {UserAction, UpdateType} from '../const.js';
import {nanoid} from 'nanoid';

export default class NewEventPresenter {
  #tripsListComponent = null;

  #eventEditComponent = null;

  #destinations = null;
  #allOffers = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({container, onDataChange, onDestroy}) {
    this.#tripsListComponent = container;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({destinations, offersByType}) {

    this.#destinations = destinations;
    this.#allOffers = offersByType;

    this.#eventEditComponent = new EditEventView(
      {
        event: null,
        destinations: this.#destinations,
        allOffers: this.#allOffers,
        onFormSubmit: this.#handleFormSubmit,
        onDeleteButtonClick: this.#handleDeleteClick,
        isNewPoint: true,
        onEscKeyDown: this.#escKeyDownHandler
      }
    );

    render(this.#eventEditComponent, this.#tripsListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      {...event, id: nanoid()}
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  setSaving() {
    this.#eventEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  destroy() {

    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);

    remove(this.#eventEditComponent);
  }

}
