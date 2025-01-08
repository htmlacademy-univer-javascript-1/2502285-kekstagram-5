const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const canselButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialFooterText = bigPicture.querySelector('.social__footer-text');
const commentFragment = document.createDocumentFragment();

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const isEscapeKey = (evt) => evt.key === 'Escape';

const createComment = (comment) => {
  const newComment = document.createElement('li');
  const imgComment = document.createElement('img');
  const textComment = document.createElement('p');

  newComment.classList.add('social__comment');
  imgComment.classList.add('social__picture');
  textComment.classList.add('social__text');

  imgComment.src = comment.avatar;
  imgComment.alt = comment.name;
  textComment.textContent = comment.message;

  newComment.appendChild(imgComment);
  newComment.appendChild(textComment);
  commentFragment.appendChild(newComment);
};

const renderComments = () => {
  commentList.innerHTML = '';
  commentCount.innerHTML = '';
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentCount.innerHTML = `${commentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;
  currentComments.slice(0, commentsCount).forEach(createComment);
  commentList.appendChild(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCount = COMMENTS_STEP;
  currentComments = [];
  socialFooterText.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCanselbuttonClick = () => {
  hideBigPicture();
};

const openBigPicture = (data) => {
  const { url, comments, likes, description } = data;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;

  currentComments = comments.slice();
  renderComments();

  commentsLoader.addEventListener('click', onLoadCommentsButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

canselButton.addEventListener('click', onCanselbuttonClick);

export { openBigPicture };
