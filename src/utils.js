function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomAmountOfRandomArrayElements(array) {
  const result = [];
  for (let i = 0; i < Math.ceil(Math.random() * array.length); i++) {
    const item = getRandomArrayElement(array);
    if (!result.includes(item)) {
      result.push(item);
      continue;
    }
    i -= 1;
  }
  return result;
}


export {getRandomArrayElement, getRandomAmountOfRandomArrayElements};
