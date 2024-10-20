import { getRandomNumber } from './helpers.js';
import {
  MIN_AVATAR_ID,
  MAX_AVATAR_ID,
  names,
  messages,
  MIN_COMMENT_ID,
  MAX_COMMENT_ID,
  MIN_COMMENTS,
  MAX_COMMENTS,
} from './data.js';

export const generateRandomComment = (commentId) => {
  const message =
    getRandomNumber(1, 2) === 1
      ? messages[getRandomNumber(0, messages.length - 1)]
      : `${messages[getRandomNumber(0, messages.length - 1)]} ${messages[getRandomNumber(0, messages.length - 1)]}`;

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomNumber(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
    message: message,
    name: names[getRandomNumber(0, names.length - 1)],
  };
};

export const generateComments = () => {
  const commentsCount = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];
  const usedCommentIds = new Set();

  for (let i = 0; i < commentsCount; i++) {
    let commentId;
    do {
      commentId = getRandomNumber(MIN_COMMENT_ID, MAX_COMMENT_ID);
    } while (usedCommentIds.has(commentId));
    usedCommentIds.add(commentId);

    comments.push(generateRandomComment(commentId));
  }

  return comments;
};
