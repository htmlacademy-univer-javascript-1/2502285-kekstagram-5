export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), timeoutDelay);
  };
};
