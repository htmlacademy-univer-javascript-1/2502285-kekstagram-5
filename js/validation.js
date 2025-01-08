import { resetEffects } from './effects.js';
import { sendData } from './api.js';

const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const ErrorMessages = {
  TAGS_EXCEEDED: 'Не более 5 хэштегов',
  TAGS_DUPLICATED: 'Хэштеги не должны повторяться',
  INVALID_TAG: 'Неверный формат хэштега',
  COMMENT_TOO_LONG: 'Комментарий не должен быть длиннее 140 символов',
};

const elements = {
  form: document.querySelector('.img-upload__form'),
  inputFile: null,
  overlay: null,
  hashtagsInput: null,
  descriptionInput: null,
  closeButton: null,
  submitButton: null,
  previewImage: null,
};

function initFormElements() {
  elements.inputFile = elements.form.querySelector('.img-upload__input');
  elements.overlay = elements.form.querySelector('.img-upload__overlay');
  elements.hashtagsInput = elements.form.querySelector('.text__hashtags');
  elements.descriptionInput = elements.form.querySelector('.text__description');
  elements.closeButton = elements.form.querySelector('.img-upload__cancel');
  elements.submitButton = elements.form.querySelector('.img-upload__submit');
  elements.previewImage = elements.form.querySelector('.img-upload__preview img');
}

const pristine = new Pristine(elements.form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

function parseHashtags(input) {
  return input.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function validateTagCount(input) {
  return parseHashtags(input).length <= MAX_HASHTAGS;
}

function validateTagFormat(input) {
  const hashtags = parseHashtags(input);
  return hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/.test(tag));
}

function validateTagUniqueness(input) {
  const hashtags = parseHashtags(input);
  return new Set(hashtags).size === hashtags.length;
}

function validateCommentLength(input) {
  return input.length <= MAX_DESCRIPTION_LENGTH;
}

function closeForm() {
  elements.form.reset();
  pristine.reset();
  elements.overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetEffects();
  document.removeEventListener('keydown', onFormKeydown);
}

function openForm() {
  elements.overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
}

function handleFormSubmit(event) {
  event.preventDefault();
  if (!pristine.validate()) {
    return;
  }

  elements.submitButton.disabled = true;

  const formData = new FormData(elements.form);
  sendData(formData)
    .then(() => {
      closeForm();
      displaySuccessMessage();
    })
    .catch(() => {
      displayErrorMessage('Ошибка отправки формы!');
    })
    .finally(() => {
      elements.submitButton.disabled = false;
    });
}

function onFormKeydown(evt) {
  if (evt.key === 'Escape' && !document.activeElement.classList.contains('text__hashtags') &&
      !document.activeElement.classList.contains('text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

function displaySuccessMessage() {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  const successElement = successTemplate.querySelector('.success');
  document.body.appendChild(successElement);

  const successButton = successElement.querySelector('.success__button');

  function onSuccessMessageKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successElement.remove();
      document.removeEventListener('keydown', onSuccessMessageKeydown);
      document.removeEventListener('click', onSuccessMessageOverlayClick);
    }
  }

  function onSuccessMessageOverlayClick(evt) {
    if (evt.target === successElement) {
      successElement.remove();
      document.removeEventListener('keydown', onSuccessMessageKeydown);
      document.removeEventListener('click', onSuccessMessageOverlayClick);
    }
  }

  successButton.addEventListener('click', () => {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessMessageKeydown);
    document.removeEventListener('click', onSuccessMessageOverlayClick);
  });

  document.addEventListener('keydown', onSuccessMessageKeydown);
  document.addEventListener('click', onSuccessMessageOverlayClick);
}

function displayErrorMessage(message) {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');
  errorElement.querySelector('.error__title').textContent = message;
  document.body.appendChild(errorElement);

  const errorButton = errorElement.querySelector('.error__button');

  function onErrorMessageKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorElement.remove();
      document.removeEventListener('keydown', onErrorMessageKeydown);
      document.removeEventListener('click', onErrorMessageOverlayClick);
    }
  }

  function onErrorMessageOverlayClick(evt) {
    if (evt.target === errorElement) {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorMessageKeydown);
      document.removeEventListener('click', onErrorMessageOverlayClick);
    }
  }

  errorButton.addEventListener('click', () => {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorMessageKeydown);
    document.removeEventListener('click', onErrorMessageOverlayClick);
  });

  document.addEventListener('keydown', onErrorMessageKeydown);
  document.addEventListener('click', onErrorMessageOverlayClick);
}

function initValidation() {
  initFormElements();

  elements.inputFile.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    if (file) {
      elements.previewImage.src = URL.createObjectURL(file);
      openForm();
    }
  });

  elements.closeButton.addEventListener('click', closeForm);
  elements.form.addEventListener('submit', handleFormSubmit);

  pristine.addValidator(elements.hashtagsInput, validateTagCount, ErrorMessages.TAGS_EXCEEDED);
  pristine.addValidator(elements.hashtagsInput, validateTagFormat, ErrorMessages.INVALID_TAG);
  pristine.addValidator(elements.hashtagsInput, validateTagUniqueness, ErrorMessages.TAGS_DUPLICATED);
  pristine.addValidator(elements.descriptionInput, validateCommentLength, ErrorMessages.COMMENT_TOO_LONG);
}

export { initValidation };
