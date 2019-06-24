import Vue from 'vue';
import VeeValidate from 'vee-validate';
import './plugins/vuetify';
import App from './App';
import router from './router';
import store from '@/store';
import './registerServiceWorker';
// eslint-disable-next-line import/no-unresolved
import * as firebase from 'firebase';
import ApiService from '@/lib/api.service';

Vue.config.productionTip = false;

const config = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
};

// для использования в store (auth.module.js)
Vue.prototype.$firebase = firebase.initializeApp(config);

Vue.use(VeeValidate);

ApiService.init();

router.beforeEach((to, from, next) => {
  const authRequired = !to.matched.some(route => route.meta.authNotRequired);

  const roleRequired = to.matched.some(route => route.meta.roleRequired);
  /**
   * Проверяем наличие подлинного ключа в любом случае:
   * Если он есть, то пускаем на все страницы, кроме /login
   * Если его нет, то проверяем нужен доступ на страницу?
   * Если нужен, то отправляем на странице login
   * Если не нужен, то даём посмотреть
   */
  store
    .dispatch('auth/checkAuth')
    .then(() => {
      // не даём ходить на страницу авторизации, если уже
      if (to.name === 'login') {
        next('/');
      }

      // проверка наличия необходимой роли
      if (roleRequired && store.state.auth.user.role === 'Students') {
        next('/');
      } else {
        next();
      }
    })
    .catch(() => {
      console.log('false1');
      if (authRequired) {
        next('/login');
      } else {
        next();
      }
    });
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
