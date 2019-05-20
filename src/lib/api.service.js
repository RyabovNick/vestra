import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/lib/jwt.service';

const API_URL = process.env.VUE_APP_AUTH_SERVICE;
console.log('process.env: ', process.env);
console.log('API_URL: ', API_URL);
// const API_URL = 'https://college.uni-dubna.ru:8443/api/';

const ApiService = {
  /**
   * Use axios for req and set URL for API
   */
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  /**
   * Set Auth header for requests
   */
  setHeader() {
    Vue.axios.defaults.headers.common.authorization = `Token ${JwtService.getToken()}`;
  },

  /**
   * Query helper?
   * @param {*} resource
   * @param {*} params
   */
  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource) {
    return Vue.axios.get(`${resource}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource, params) {
    return Vue.axios.delete(`${resource}`, { data: params });
  },

  upload(resource, params) {
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return Vue.axios.post(`${resource}`, params, config).catch(error => {
      throw new Error(`Upload ${error}`);
    });
  },
};

export default ApiService;
