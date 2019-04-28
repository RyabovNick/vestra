/**
 * Получить, добавить, удалить токен из localStorage
 */
const ID_ACCESS_TOKEN = 'vestra-access-token';

export default {
  getToken() {
    return window.localStorage.getItem(ID_ACCESS_TOKEN);
  },

  saveToken(accessToken) {
    console.log('jwt', this.getToken());
    window.localStorage.setItem(ID_ACCESS_TOKEN, accessToken);
  },

  destroyToken() {
    window.localStorage.removeItem(ID_ACCESS_TOKEN);
  },
};
