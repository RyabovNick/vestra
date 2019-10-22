/*
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
    async [GET_CLASSMATES](context, {
      group
    }) {

      try {
        const result = await axios.get(`${marksService}attendance/${group}`)
        context.commit(GET_CLASSMATES, result);
        return result
      } catch (err) {
        throw new Error()
      }
    }
  },
const mutations = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};


*/
