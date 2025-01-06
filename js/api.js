const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = async () => {
  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных');
    }
    return await response.json();
  } catch (error) {
    console.error('Не удалось загрузить данные:', error.message);
    throw error;
  }
};

const sendData = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error('Ошибка при отправке данных');
    }
  } catch (error) {
    console.error('Не удалось отправить данные:', error.message);
    throw error;
  }
};

export { getData, sendData };

