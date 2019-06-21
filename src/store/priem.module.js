import axios from 'axios';
import {
  GET_SPECIALITIES,
  GET_SPECIALITY_INFO,
  GET_SPECIALITY_PEOPLE,
  GET_SPECIALITY_APPLICANTS,
} from './actions.type';
import {
  SET_SPECIALITIES,
  SET_SPECIALITY_INFO,
  SET_SPECIALITY_PEOPLE,
  SET_SPECIALITY_APPLICANTS,
} from './mutations.type';


const scheduleService = `${process.env.VUE_APP_SCHEDULE_SERVICE}priem/specialities`;

const state = {
  specialities: [],
  specialityInfo: [],
  specialityPeople: [],
  specialityApplicants: [],
};

const getters = {
  specialities(state) {
    return state.specialities;
  },
  specialityInfo(state) {
    return state.specialityInfo;
  },
  specialityPeople(state) {
    return state.specialityPeople;
  },
  specialityApplicants(state) {
    return state.specialityApplicants;
  },
};

const actions = {
  [GET_SPECIALITIES](context) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${scheduleService}`)
        .then(({
          data
        }) => {
          context.commit(SET_SPECIALITIES, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  [GET_SPECIALITY_INFO](context, {
    code
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${scheduleService}/info/${code}`)
        // .get(`http://localhost:3013/api/priem/specialities/info/${code}`)
        .then(({
          data
        }) => {
          context.commit(SET_SPECIALITY_INFO, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  [GET_SPECIALITY_PEOPLE](context, {
    code
  }) {
    return new Promise((resolve, reject) => {
      console.log(`${scheduleService}/people/${code}`);
      axios
        .get(`${scheduleService}/people/${code}`)
        .then(({
          data
        }) => {
          context.commit(SET_SPECIALITY_PEOPLE, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  [GET_SPECIALITY_APPLICANTS](context, {
    code
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${scheduleService}/applicants/${code}`)
        .then(({
          data
        }) => {
          context.commit(SET_SPECIALITY_APPLICANTS, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};

const mutations = {
  [SET_SPECIALITIES](state, data) {
    state.specialities = data;
  },
  [SET_SPECIALITY_INFO](state, data) {
    state.specialityInfo = data;
  },
  [SET_SPECIALITY_PEOPLE](state, data) {
    state.specialityPeople = data;
  },
  [SET_SPECIALITY_APPLICANTS](state, data) {
    state.specialityApplicants = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
