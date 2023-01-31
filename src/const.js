const FilterType = {
  ALL: 'everything',
  FUTURE: 'future'
};

const SortType = {
  DAY: 'sort-day',
  PRICE: 'sort-price'
};

const eventEditDateFormat = 'd/m/y H:i';

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {FilterType, SortType, eventEditDateFormat, UserAction, UpdateType};
