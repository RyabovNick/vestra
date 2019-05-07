import axios from 'axios';
import { GET_GROUPS, GET_GROUP_SCHEDULE, GET_MY_SCHEDULE } from './actions.type';
import { SET_GROUPS, SET_GROUP_SCHEDULE, SET_MY_SCHEDULE } from './mutations.type';

const state = {
  groups: null,
  groupSchedule: [],
  mySchedule: [],
  teachers: [],
};

const getters = {
  groups(state) {
    return state.groups;
  },
  groupSchedule(state) {
    return state.groupSchedule;
  },
  mySchedule(state) {
    return state.mySchedule;
  },
  teachers(state) {
    return state.teachers;
  },
};

const actions = {
  [GET_GROUPS](context) {
    return new Promise((resolve, reject) => {
      axios
        .get('http://localhost:3000/api/groups')
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
        .get(`http://localhost:3000/api/groups/${group}`)
        .then(({ data }) => {
          context.commit(SET_GROUP_SCHEDULE, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  [GET_MY_SCHEDULE](context, { name, role, group }) {
    let url =
      role === 'Teachers'
        ? `http://localhost:3000/api/teachers/${name}`
        : `http://localhost:3000/api/groups/${group}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(({ data }) => {
          context.commit(SET_MY_SCHEDULE, data);
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
  [SET_MY_SCHEDULE](state, data) {
    state.mySchedule = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
