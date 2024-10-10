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
    : `${messages[getRandomNumber(0, messages.length - 1)]} ${messages[getRandomNumber(0, messages.length - 1)]}`;

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: message,
    name: names[getRandomNumber(0, names.length - 1)]
  };
};

const generateComments = () => {
  const commentsCount = getRandomNumber(0, 30);
  const comments = [];
  const usedCommentIds = new Set();

  for (let i = 0; i < commentsCount; i++) {
    let commentId;
    do {
      commentId = getRandomNumber(100, 999); 
    } while (usedCommentIds.has(commentId));
    usedCommentIds.add(commentId);

    comments.push(generateRandomComment(commentId));
  }

  return comments;
};

const generatePhotos = () => {
  const photos = [];
  const usedPhotoIds = new Set();

  for (let i = 1; i <= 25; i++) {
    let id;
    do {
      id = getRandomNumber(1, 25);
    } while (usedPhotoIds.has(id));
    usedPhotoIds.add(id);

    photos.push({
      id: id,
      url: `photos/${id}.jpg`,
      description: `Описание фотографии номер ${id}`,
      likes: getRandomNumber(15, 200),
      comments: generateComments()
    });
  }

  return photos;
};

const photoDescriptions = generatePhotos();
console.log(photoDescriptions);
