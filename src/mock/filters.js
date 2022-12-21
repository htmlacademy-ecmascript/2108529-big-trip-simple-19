import {filter} from '../utils/filter';

function generateFilters(events) {
  return Object.entries(filter).map(([filterName, filterFunction]) => {
    return ({
      name: filterName,
      count: filterFunction(events).length
    });
  });
}

export {generateFilters};
