import Pristine from '../vendor/pristine/pristine.min.js';
import noUiSlider from '../vendor/nouislider/nouislider.js';

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

const effectsRadioButtons = form.querySelectorAll('.effects__radio');
const effectLevelValue = form.querySelector('.effect-level__value');
const effectSliderContainer = form.querySelector('.img-upload__effect-level');
const effectSliderElement = form.querySelector('.effect-level__slider');

const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const DEFAULT_EFFECT = 'none';
const EFFECTS = {
  none: { filter: '', min: 0, max: 0, step: 0 },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1 },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1 },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1 },
};

let currentEffect = DEFAULT_EFFECT;

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

const applyEffect = (effect) => {
  const effectSettings = EFFECTS[effect];
  if (effect === 'none') {
    previewImage.style.filter = '';
    effectSliderContainer.classList.add('hidden');
  } else {
    effectSliderContainer.classList.remove('hidden');
    effectSliderElement.noUiSlider.updateOptions({
      range: { min: effectSettings.min, max: effectSettings.max },
      start: effectSettings.max,
      step: effectSettings.step,
    });
    effectSliderElement.noUiSlider.on('update', (_, handle, values) => {
      const value = values[handle];
      effectLevelValue.value = value;
      previewImage.style.filter = `${effectSettings.filter}(${value}${effectSettings.unit || ''})`;
    });
  }
};

noUiSlider.create(effectSliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});
effectSliderContainer.classList.add('hidden');

effectsRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', () => {
    currentEffect = radioButton.value;
    applyEffect(currentEffect);
  });
});

const showForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  updateScale(DEFAULT_SCALE);
  applyEffect(DEFAULT_EFFECT);
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
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

fileInput.addEventListener('change', showForm);
cancelButton.addEventListener('click', closeForm);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});

const stopEscPropagation = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

hashtagInput.addEventListener('keydown', stopEscPropagation);
commentInput.addEventListener('keydown', stopEscPropagation);
