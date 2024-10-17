import { getRandomNumber } from './helpers.js';
import { MIN_PHOTO_ID, MAX_PHOTO_ID, MIN_LIKES, MAX_LIKES } from './data.js';
import { generateComments } from './comments.js';

export const generatePhotos = () => {
  const photos = [];
  const usedPhotoIds = new Set();

  for (let i = MIN_PHOTO_ID; i <= MAX_PHOTO_ID; i++) {
    let id;
    do {
      id = getRandomNumber(MIN_PHOTO_ID, MAX_PHOTO_ID);
    } while (usedPhotoIds.has(id));
    usedPhotoIds.add(id);

    photos.push({
      id: id,
      url: `photos/${id}.jpg`,
      description: `Описание фотографии номер ${id}`,
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateComments()
    });
  }
  
  return photos;
};
