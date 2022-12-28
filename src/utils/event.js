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

export {humanizeEventDate, humanizeEventTime, sortByDate, sortByPrice};

