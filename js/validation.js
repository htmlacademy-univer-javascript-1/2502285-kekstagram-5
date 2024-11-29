import Pristine from '../vendor/pristine/pristine.min.js';

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const body = document.body;
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const showForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
};

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const isValid = hashtags.every((hashtag) => {
    const validRegex = /^#[a-zа-яё0-9]{1,19}$/;
    return validRegex.test(hashtag);
  });
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
