import ApiService from '@/lib/api.service';
import JwtService from '@/lib/jwt.service';
import { LOGIN, LOGOUT, CHECK_AUTH, SUBSCRIBE } from './actions.type';
import { SET_AUTH, PURGE_AUTH } from './mutations.type';
import axios from 'axios';

const state = {
  errors: null,
  user: [],
  isAuthenticated: false,
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  [LOGIN](context, { username, password }) {
    return new Promise((resolve, reject) => {
      ApiService.post('login', { username, password })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
          JwtService.saveToken(data.user.token);
          context.dispatch(SUBSCRIBE);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [CHECK_AUTH](context) {
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get('tokenValidation')
          .then(res => {
            context.commit(SET_AUTH, res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        context.commit(PURGE_AUTH);
        reject(new Error('Token does not exist'));
      }
    });
  },
  [SUBSCRIBE]() {
    console.log('In subscribe');
    try {
      /* используем глобальную переменную, созданную в 
      main.js */
      // eslint-disable-next-line no-underscore-dangle
      const messaging = this._vm.$firebase.messaging();
      messaging.usePublicVapidKey(process.env.VUE_APP_publicVapidKey);

      messaging
        .requestPermission()
        .then(() => {
          // Get Token
          messaging.getToken().then(token => {
            // отправить токен на сервер
            // и группу, чтобы подписать на данный топик
            axios
              .post('https://college.uni-dubna.ru:8451/api/subscribe', {
                token,
                common: true,
              })
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });

            console.log(token);
          });

          // Refresh token monitoring
          messaging.onTokenRefresh(() => {
            messaging
              .getToken()
              .then(refreshedToken => {
                console.log('Token refreshed', refreshedToken);
                // Indicate that the new Instance ID token has not yet been sent to the
                // app server.
                // Send Instance ID token to app server.
              })
              .catch(err => {
                console.log('Unable to retrieve refreshed token ', err);
              });
          });
        })
        .catch(err => {
          console.log('Unable to get permission to notify.', err);
        });
    } catch (err) {
      console.log('err: ', err);
      console.log("Firebase API doesn't support :(");
    }
  },
};

const mutations = {
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = null;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = [];
    state.errors = null;
    JwtService.destroyToken();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
