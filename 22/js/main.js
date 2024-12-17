import { renderThumbnails } from './thumb.js';
import { fetchPhotos } from './api.js';
import { initFilters } from './filters.js';
import './validation.js';

fetchPhotos()
  .then((photos) => {
    renderThumbnails(photos);
    initFilters(photos);
  })
  .catch((error) => console.error('Ошибка загрузки фотографий:', error));

