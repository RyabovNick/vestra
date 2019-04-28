import Vue from 'vue';
import VeeValidate from 'vee-validate';
import './plugins/vuetify';
import App from './App';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VeeValidate);

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(route => route.meta.authNotRequired);
  console.log('authRequired: ', authRequired);
  console.log('store.getters.isAuthenticated: ', store.getters.isAuthenticated);
  // если страница не в свободном доступе и пользователь авторизован
  if (!authRequired && !store.getters.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
