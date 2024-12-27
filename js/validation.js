import Pristine from '../vendor/pristine/pristine.min.js';
import { resetEffects } from './effects.js';
import { sendPhotoData } from './api.js';

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const body = document.body;
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const previewImage = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const updateScale = (newScale) => {
  scaleControlValue.value = `${newScale}%`;
  previewImage.style.transform = `scale(${newScale / 100})`;
};

scaleControlBigger.addEventListener('click', () => {
  const currentScale = parseInt(scaleControlValue.value, 10);
  const newScale = Math.min(currentScale + SCALE_STEP, MAX_SCALE);
  updateScale(newScale);
});

scaleControlSmaller.addEventListener('click', () => {
  const currentScale = parseInt(scaleControlValue.value, 10);
  const newScale = Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  updateScale(newScale);
});

const showForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  updateScale(DEFAULT_SCALE);
  resetEffects();
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
  previewImage.src = 'img/upload-default-image.jpg';
  previewImage.style.transform = '';
  resetEffects();
};

const onFileChange = () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
    });
    reader.readAsDataURL(file);
    showForm();
  }
};

const validateHashtags = (value) => {
  if (!value || !value.trim()) {
    return true;
  }
  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const validRegex = /^#[a-zа-яё0-9]{1,19}$/;
  const isValid = hashtags.every((hashtag) => validRegex.test(hashtag));
  const unique = new Set(hashtags).size === hashtags.length;
  return hashtags.length <= 5 && isValid && unique;
};

const validateComment = (value) => value.length <= 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error',
});

pristine.addValidator(hashtagInput, validateHashtags, 'Некорректные хэш-теги');
pristine.addValidator(commentInput, validateComment, 'Комментарий не может быть длиннее 140 символов');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(form);
    try {
      await sendPhotoData(formData);
      closeForm();
      alert('Фотография успешно загружена!');
    } catch (error) {
      alert('Ошибка загрузки файла. Попробуйте ещё раз.');
    }
  }
});

const stopEscPropagation = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

hashtagInput.addEventListener('keydown', stopEscPropagation);
commentInput.addEventListener('keydown', stopEscPropagation);
fileInput.addEventListener('change', onFileChange);
cancelButton.addEventListener('click', closeForm);
