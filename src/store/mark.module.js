import axios from 'axios';
import {
  GET_CLASSMATES,
} from './actions.type';
import {
  POST_ATTENDANCE,
} from './mutations.type';

const marksService = process.env.VUE_APP_MARKS_SERVICE;

const state = {
  id_lesson: null,
  peoples: [],
};

const getters = {
  allPeoples: group => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${marksService}attendance/${group}`)
        .then(({
          data
        }) => {
          context.commit(GET_CLASSMATES, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}

const actions = {
  [GET_CLASSMATES](context, {
    group
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${marksService}attendance/${group}`)
        .then(({
          data
        }) => {
          context.commit(GET_CLASSMATES, data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },














}








const mutations = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
