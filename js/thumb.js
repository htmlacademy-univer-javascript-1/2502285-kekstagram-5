import { openBigPicture } from './big-picture.js';
import { getPhotos } from './helper.js';
import { initFilter } from './filters.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

const createThumbnailElement = (photo) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const { url, description, likes, comments, id } = photo;

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.id = id;

  thumbnail.addEventListener('click', () => {
    openBigPicture(photo);
  });

  return thumbnail;
};

const clearThumbnails = () => {
  const thumbnails = picturesContainer.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());
};

const appendThumbnails = (photos) => {
  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnailElement(photo);
    thumbnailsFragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(thumbnailsFragment);
};

const displayErrorMessage = (errorText) => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = errorText;

  const closeError = () => {
    errorElement.remove();
  };

  errorElement.querySelector('.error__button').addEventListener('click', closeError);
  errorElement.addEventListener('click', (evt) => {
    if (evt.target === errorElement) {
      closeError();
    }
  });

  bodyElement.append(errorElement);
};

const applyFiltersAndRender = (photos) => {
  clearThumbnails();
  appendThumbnails(photos);
};

const renderThumbnails = async () => {
  try {
    const photos = await getPhotos();

    appendThumbnails(photos);

    initFilter(photos, applyFiltersAndRender);
  } catch (error) {
    displayErrorMessage(error.message);
  }
};

export { renderThumbnails };
