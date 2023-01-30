import dayjs from 'dayjs';
import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs(event.dateFrom).isAfter(dayjs()))
};

export {filter};
