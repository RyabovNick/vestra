import axios from 'axios';
import { GET_GROUPS, GET_GROUP_SCHEDULE } from './actions.type';
import { SET_GROUPS, SET_GROUP_SCHEDULE } from './mutations.type';

const state = {
  groups: null,
  groupSchedule: [],
  teachers: [],
};

const getters = {
  groups(state) {
    return state.groups;
  },
  groupSchedule(state) {
    return state.groupSchedule;
  },
  teachers(state) {
    return state.teachers;
  },
};

const actions = {
  [GET_GROUPS](context) {
    return new Promise((resolve, reject) => {
      axios
        .get('https://www.uni-dubna.ru/mobile/groups')
        .then(({ data }) => {
          context.commit(SET_GROUPS, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  [GET_GROUP_SCHEDULE](context, { group }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://www.uni-dubna.ru/mobile/schedule2?group=${group}`)
        .then(({ data }) => {
          context.commit(SET_GROUP_SCHEDULE, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};

const mutations = {
  [SET_GROUPS](state, data) {
    state.groups = data;
  },
  [SET_GROUP_SCHEDULE](state, data) {
    state.groupSchedule = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
