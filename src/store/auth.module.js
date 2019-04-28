import ApiService from '@/lib/api.service';
import JwtService from '@/lib/jwt.service';
import { LOGIN, LOGOUT, CHECK_AUTH } from './actions.type';
import { SET_AUTH, PURGE_AUTH } from './mutations.type';

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
