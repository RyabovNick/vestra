/**
 * Получить, добавить, удалить токен из localStorage
 */
const ID_ACCESS_TOKEN = 'vestra-access-token';
const ID_REFRESH_TOKEN = 'vestra-refresh-token';

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

  getRefreshToken() {
    return window.localStorage.getItem(ID_REFRESH_TOKEN);
  },

  saveRefreshToken(refreshToken) {
    window.localStorage.setItem(ID_REFRESH_TOKEN, refreshToken);
  },
};
