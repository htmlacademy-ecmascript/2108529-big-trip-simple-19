import dayjs from 'dayjs';

function humanizeEventDate(date) {
  return dayjs(date).format('MMM DD');
}

function humanizeEventTime(date) {
  const dateArray = date.split('');
  const indexOfT = dateArray.indexOf('T');
  return dateArray.slice(indexOfT + 1, indexOfT + 6).join('');
}

export {humanizeEventDate, humanizeEventTime};

