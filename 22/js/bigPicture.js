const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let comments = [];
let renderedCommentsCount = 0;
const COMMENTS_PER_PAGE = 5;

function renderComments() {
  const fragment = document.createDocumentFragment();
  const commentsToRender = comments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_PER_PAGE);

  commentsToRender.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    fragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(fragment);
  renderedCommentsCount += commentsToRender.length;

  commentCountBlock.innerHTML = `${renderedCommentsCount} из ${comments.length} комментариев`;

  if (renderedCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function onCommentsLoaderClick() {
  renderComments();
}

function onEscKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

export function showBigPicture(photo) {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  commentsContainer.innerHTML = '';
  comments = photo.comments;
  renderedCommentsCount = 0;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  renderComments();

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

closeButton.addEventListener('click', closeBigPicture);
