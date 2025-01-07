const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const SCALE_UPDATE = 100;

const EFFECT_CONFIGS = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const elements = {
  scaleSmaller: document.querySelector('.scale__control--smaller'),
  scaleBigger: document.querySelector('.scale__control--bigger'),
  scaleValue: document.querySelector('.scale__control--value'),
  previewImage: document.querySelector('.img-upload__preview img'),
  effectLevel: document.querySelector('.effect-level__slider'),
  effectContainer: document.querySelector('.img-upload__effect-level'),
};

let activeEffect = EFFECT_CONFIGS.none;

function adjustScale(newScale) {
  elements.scaleValue.value = `${newScale}%`;
  elements.previewImage.style.transform = `scale(${newScale / SCALE_UPDATE})`;
}

function handleScaleSmaller() {
  const currentScale = parseInt(elements.scaleValue.value, 10);
  adjustScale(Math.max(currentScale - SCALE_STEP, MIN_SCALE));
}

function handleScaleBigger() {
  const currentScale = parseInt(elements.scaleValue.value, 10);
  adjustScale(Math.min(currentScale + SCALE_STEP, MAX_SCALE));
}

function resetEffects() {
  elements.effectContainer.classList.add('hidden');
  elements.previewImage.style.filter = '';
  activeEffect = EFFECT_CONFIGS.none;
  adjustScale(DEFAULT_SCALE);
}

function updateEffect() {
  const effectValue = elements.effectLevel.noUiSlider.get();
  elements.previewImage.style.filter = `${activeEffect.filter}(${effectValue}${activeEffect.unit})`;
}

function initializeEffect(effectName) {
  activeEffect = EFFECT_CONFIGS[effectName];
  if (effectName === 'none') {
    resetEffects();
  } else {
    elements.effectContainer.classList.remove('hidden');
    noUiSlider.create(elements.effectLevel, {
      range: { min: activeEffect.min, max: activeEffect.max },
      start: activeEffect.max,
      step: activeEffect.step,
      connect: 'lower',
    });
    elements.effectLevel.noUiSlider.on('update', updateEffect);
  }
}

function onEffectChange(event) {
  if (event.target.matches('.effects__radio')) {
    const selectedEffect = event.target.value;
    if (elements.effectLevel.noUiSlider) {
      elements.effectLevel.noUiSlider.destroy();
    }
    initializeEffect(selectedEffect);
  }
}

function initEffects() {
  elements.scaleSmaller.addEventListener('click', handleScaleSmaller);
  elements.scaleBigger.addEventListener('click', handleScaleBigger);
  document.querySelector('.effects__list').addEventListener('change', onEffectChange);
  resetEffects();
}

export { initEffects, resetEffects };
