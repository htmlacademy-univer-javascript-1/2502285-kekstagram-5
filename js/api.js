const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const GET_PHOTOS_URL = `${API_URL}/data`;
const POST_PHOTO_URL = API_URL;

export const fetchPhotos = async () => {
  try {
    const response = await fetch(GET_PHOTOS_URL);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
};

export const sendPhotoData = async (formData) => {
  try {
    const response = await fetch(POST_PHOTO_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    throw error;
  }
};
