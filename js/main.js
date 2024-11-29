import { generatePhotos } from './photos.js';
import { renderThumbnails } from './thumb.js';
import './validation.js';

const photoDescriptions = generatePhotos();
renderThumbnails(photoDescriptions);
