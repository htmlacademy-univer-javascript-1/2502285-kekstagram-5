const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_PHOTO_ID = 1;
const MAX_PHOTO_ID = 25;
const MIN_COMMENT_ID = 100;
const MAX_COMMENT_ID = 999;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const names = ['Артём', 'Иван', 'Ольга', 'Мария', 'Дмитрий', 'Александр', 'Елена', 'Сергей', 'Анна', 'Наталья'];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const generateRandomComment = (commentId) => {
  const message = getRandomNumber(1, 2) === 1 
    ? messages[getRandomNumber(0, messages.length - 1)]
    : ${messages[getRandomNumber(0, messages.length - 1)]} ${messages[getRandomNumber(0, messages.length - 1)]};

  return {
    id: commentId,
    avatar: img/avatar-${getRandomNumber(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg,
    message: message,
    name: names[getRandomNumber(0, names.length - 1)]
  };
};

const generateComments = () => {
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

const generatePhotos = () => {
  const photos = [];
  const usedPhotoIds = new Set();

  for (let i = MIN_PHOTO_ID; i <= MAX_PHOTO_ID; i++) {
    let id;
    do {
      id = getRandomNumber(MIN_PHOTO_ID, MAX_PHOTO_ID);
    } while (usedPhotoIds.has(id));
    usedPhotoIds.add(id);

    photos.push({
      id: id,
      url: photos/${id}.jpg,
      description: Описание фотографии номер ${id},
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateComments()
    });
  }
  
  return photos;
};

const photoDescriptions = generatePhotos();
console.log(photoDescriptions);
