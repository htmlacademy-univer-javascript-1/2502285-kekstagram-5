const DEBOUNCE_DELAY = 500;

const getRandomNumber = (min, max) => {
  const minValue = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxValue = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

const getRandomFromArray = (items) => items[getRandomNumber(0, items.length - 1)];

const debounce = (callback, delay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

export { getRandomFromArray, getRandomNumber, debounce};
