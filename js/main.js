import { renderThumbnails } from './thumb.js';
import { fetchPhotos } from './api.js';
import { initializeFilters } from './filters.js';
import './validation.js';

fetchPhotos()
  .then((photos) => {
    renderThumbnails(photos);
    initializeFilters(photos);
  })
  .catch((error) => console.error('Ошибка загрузки фотографий:', error));
