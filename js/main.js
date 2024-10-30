import { generatePhotos } from './photos.js';

const photoDescriptions = generatePhotos();
console.log(photoDescriptions);

import { renderThumbnails } from './renderThumbnails.js';

document.addEventListener('DOMContentLoaded', () => {
  renderThumbnails();
});
