import noUiSlider from '../vendor/nouislider/nouislider.js';

const DEFAULT_EFFECT = 'none';
const EFFECTS = {
  none: { filter: '', min: 0, max: 0, step: 0 },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1 },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1 },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1 },
};

const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadioButtons = document.querySelectorAll('.effects__radio');
const previewImage = document.querySelector('.img-upload__preview img');

let currentEffect = DEFAULT_EFFECT;

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
  }
};

effectSliderElement.noUiSlider.on('update', (_, handle, values) => {
  const value = values[handle];
  effectLevelValue.value = value;
  if (currentEffect !== 'none') {
    const effectSettings = EFFECTS[currentEffect];
    previewImage.style.filter = `${effectSettings.filter}(${value}${effectSettings.unit || ''})`;
  }
});

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

export const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  previewImage.style.filter = '';
  effectSliderContainer.classList.add('hidden');
};
