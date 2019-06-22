import axios from 'axios';
import {
  GET_SPECIALITIES,
  GET_SPECIALITY_INFO,
  GET_SPECIALITY_PEOPLE,
  
  GET_NEW_SPECIALITIES,
  GET_NEW_SPECIALITY_INFO,
  GET_NEW_SPECIALITY_PEOPLE,
} from './actions.type';
import {
  SET_SPECIALITIES,
  SET_SPECIALITY_INFO,
  SET_SPECIALITY_PEOPLE,
  
  SET_NEW_SPECIALITIES,
  SET_NEW_SPECIALITY_INFO,
  SET_NEW_SPECIALITY_PEOPLE,
} from './mutations.type';


const scheduleService = `${process.env.VUE_APP_SCHEDULE_SERVICE}priem/specialities`;
const scheduleService2 = `${process.env.VUE_APP_SCHEDULE_SERVICE}priem/newSpecialities`;

const state = {
  specialities: [],
  specialityInfo: [],
  specialityPeople: [],
  
  newSpecialities: [],
  newSpecialityInfo: [],
  newSpecialityPeople: [],
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
  
  newSpecialities(state) {
    return state.newSpecialities;
  },
  newSpecialityInfo(state) {
    return state.newSpecialityInfo;
  },
  newSpecialityPeople(state) {
    return state.newSpecialityPeople;
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
  
  [GET_NEW_SPECIALITIES](context) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${scheduleService2}`)
        .then(({
          data
        }) => {
          context.commit(SET_NEW_SPECIALITIES, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  [GET_NEW_SPECIALITY_INFO](context, {
    code
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${scheduleService2}/info/${code}`)
        .then(({
          data
        }) => {
          context.commit(SET_NEW_SPECIALITY_INFO, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  [GET_NEW_SPECIALITY_PEOPLE](context, {
    code
  }) {
    return new Promise((resolve, reject) => {
      console.log(`${scheduleService2}/people/${code}`);
      axios
        .get(`${scheduleService2}/people/${code}`)
        .then(({
          data
        }) => {
          context.commit(SET_NEW_SPECIALITY_PEOPLE, data);
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
  
  [SET_NEW_SPECIALITIES](state, data) {
    state.newSpecialities = data;
  },
  [SET_NEW_SPECIALITY_INFO](state, data) {
    state.newSpecialityInfo = data;
  },
  [SET_NEW_SPECIALITY_PEOPLE](state, data) {
    state.newSpecialityPeople = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
