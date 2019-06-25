import axios from 'axios';
import {
  GET_SPECIALITIES,
  GET_SPECIALITY_INFO,
  GET_SPECIALITY_PEOPLE,

  GET_NEW_SPECIALITIES,
  GET_NEW_SPECIALITY_INFO,
  GET_NEW_SPECIALITY_PEOPLE,

  GET_APPLICANTS,
  GET_APPLICANT_INFO,
} from './actions.type';
import {
  SET_SPECIALITIES,
  SET_SPECIALITY_INFO,
  SET_SPECIALITY_PEOPLE,

  SET_NEW_SPECIALITIES,
  SET_NEW_SPECIALITY_INFO,
  SET_NEW_SPECIALITY_PEOPLE,

  SET_APPLICANTS,
  SET_APPLICANT_INFO,
} from './mutations.type';


const scheduleService = `${process.env.VUE_APP_SCHEDULE_SERVICE}priem/specialities`;
const scheduleService2 = `${process.env.VUE_APP_SCHEDULE_SERVICE}priem/newSpecialities`;
const applicantsPath = `${process.env.VUE_APP_SCHEDULE_SERVICE}priem/applicants`;

const state = {
  specialities: [],
  specialityInfo: [],
  specialityPeople: [],

  newSpecialities: [],
  newSpecialityInfo: [],
  newSpecialityPeople: [],

  applicants: [],
  applicantInfo: [],
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

  applicants(state) {
    return state.applicants;
  },
  applicantInfo(state) {
    return state.applicantInfo;
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

  [GET_APPLICANTS](context) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${applicantsPath}`)
        .then(({
          data
        }) => {
          context.commit(SET_APPLICANTS, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  [GET_APPLICANT_INFO](context, {
    id
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${applicantsPath}/info/${id}`)
        .then(({
          data
        }) => {
          context.commit(SET_APPLICANT_INFO, data);
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

  [SET_APPLICANTS](state, data) {
    state.applicants = data;
  },
  [SET_APPLICANT_INFO](state, data) {
    state.applicantInfo = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
