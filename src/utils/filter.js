import dayjs from 'dayjs';
import {filterTypes} from '../const';

const filter = {
  [filterTypes.ALL]: (events) => events,
  [filterTypes.FUTURE]: (events) => events.filter((event) => dayjs(event.dateFrom).isAfter(dayjs()))
};

export {filter};
