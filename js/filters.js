import { renderThumbnails } from './thumb.js';
import { debounce } from './utils.js';

const imgFilters = document.querySelector('.img-filters');

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let currentPhotos = [];
let filteredPhotos = [];

const clearThumbnails = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const applyFilter = (filter) => {
  switch (filter) {
    case 'filter-random':
      filteredPhotos = [...currentPhotos]
        .sort(() => Math.random() - 0.5)
        .slice(0, RANDOM_PHOTOS_COUNT);
      break;
    case 'filter-discussed':
      filteredPhotos = [...currentPhotos].sort(
        (a, b) => b.comments.length - a.comments.length
      );
      break;
    default:
      filteredPhotos = [...currentPhotos];
      break;
  }
  clearThumbnails();
  renderThumbnails(filteredPhotos);
};

const onFilterClick = debounce((evt) => {
  if (evt.target.tagName === 'BUTTON') {
    const activeButton = imgFilters.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    applyFilter(evt.target.id);
  }
}, DEBOUNCE_DELAY);

export const initializeFilters = (photos) => {
  currentPhotos = photos;
  filteredPhotos = [...photos];
  renderThumbnails(filteredPhotos);
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', onFilterClick);
};
