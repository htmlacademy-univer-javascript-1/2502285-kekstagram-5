import { renderThumbnails } from './thumb.js';
import { fetchPhotos } from './api.js';
import './validation.js';

fetchPhotos()
  .then(renderThumbnails)
  .catch((error) => console.error('Ошибка загрузки фотографий:', error));

