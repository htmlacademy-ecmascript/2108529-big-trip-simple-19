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

function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, getRandomAmountOfRandomArrayElements, capitalizeWord, updateItem};
