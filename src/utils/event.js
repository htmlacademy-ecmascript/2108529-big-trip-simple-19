import dayjs from 'dayjs';

function humanizeEventDate(date) {
  return dayjs(date).format('MMM DD');
}

function humanizeEventTime(date) {
  return dayjs(date).format('HH:mm');
}

export {humanizeEventDate, humanizeEventTime};

