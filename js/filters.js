import { debounce } from './utils.js';

const DISPLAY_COUNT = 10;

const FilterOptions = {
  ALL: 'filter-default',
  RANDOMIZED: 'filter-random',
  MOST_COMMENTED: 'filter-discussed',
};

const filterPanel = document.querySelector('.img-filters');
let activeFilter = FilterOptions.ALL;
let imageCollection = [];
let selectedButton = null;

const shuffleItems = (list) => {
  const array = list.slice();
  for (let index = array.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
  return array;
};

const sortByPopularity = (first, second) =>
  second.comments.length - first.comments.length;

const processPictures = () => {
  const result = imageCollection.slice();

  switch (activeFilter) {
    case FilterOptions.RANDOMIZED:
      return shuffleItems(result).slice(0, DISPLAY_COUNT);
    case FilterOptions.MOST_COMMENTED:
      return result.sort(sortByPopularity);
    default:
      return result;
  }
};

const handleFilterSwitch = (callback) => {
  filterPanel.addEventListener('click', (event) => {
    const target = event.target;

    if (!target.classList.contains('img-filters__button')) {
      return;
    }

    if (target.id === activeFilter) {
      return;
    }

    if (selectedButton) {
      selectedButton.classList.remove('img-filters__button--active');
    }

    target.classList.add('img-filters__button--active');
    selectedButton = target;
    activeFilter = target.id;

    callback(processPictures());
  });
};

const initFilter = (pictures, renderCallback) => {
  filterPanel.classList.remove('img-filters--inactive');
  imageCollection = pictures.slice();
  selectedButton = filterPanel.querySelector('.img-filters__button--active');
  handleFilterSwitch(debounce(renderCallback));
};

export { initFilter, processPictures };
