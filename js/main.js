import { renderThumbnails } from './thumb.js';
import { getData } from './api.js';
import { initFilter } from './filters.js';
import { initEffects } from './effects.js';
import { initValidation } from './validation.js';

renderThumbnails();

initEffects();

initValidation();

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initFilter(photos);
  })
  .catch((error) => console.error('Ошибка загрузки фотографий:', error));
