import { generatePhotos } from './photos.js';
import { renderThumbnails } from './thumb.js';

const photoDescriptions = generatePhotos();
renderThumbnails(photoDescriptions);
