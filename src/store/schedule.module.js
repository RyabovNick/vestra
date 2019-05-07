import axios from 'axios';
import { GET_GROUPS, GET_GROUP_SCHEDULE, GET_MY_SCHEDULE, GET_TEACHERS } from './actions.type';
import { SET_GROUPS, SET_GROUP_SCHEDULE, SET_MY_SCHEDULE, SET_TEACHERS } from './mutations.type';

const scheduleService = process.env.VUE_APP_SCHEDULE_SERVICE;

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
        .get(`${scheduleService}groups`)
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
        .get(`${scheduleService}groups/${group}`)
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
        ? `${scheduleService}teachers/${name}`
        : `${scheduleService}groups/${group}`;
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
  [GET_TEACHERS](context) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${scheduleService}teachers`)
        .then(({ data }) => {
          context.commit(SET_TEACHERS, data);
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
  [SET_TEACHERS](state, data) {
    state.teachers = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
