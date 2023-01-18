import dayjs from 'dayjs';

function humanizeEventDate(date) {
  return dayjs(date).format('MMM DD');
}

function humanizeEventTime(date) {
  return dayjs(date).format('HH:mm');
}

function sortByDate(eventA, eventB) {
  const dateEventA = eventA.dateFrom;
  const dateEventB = eventB.dateFrom;
  return dayjs(dateEventA).diff(dateEventB);
}

function sortByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {humanizeEventDate, humanizeEventTime, sortByDate, sortByPrice, updateItem};

