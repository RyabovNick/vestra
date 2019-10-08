import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.module';
import schedule from './schedule.module';
import priem from './priem.module';
import mark from './mark.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    schedule,
    priem,
    mark,
  },
});
