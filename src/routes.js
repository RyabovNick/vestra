import Home from './views/Home';
import Login from './views/Login';
import Personal from './views/Personal';
import Push from './views/Push';
import Schedule from './views/Schedule';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { authNotRequired: true },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal,
  },
  {
    path: '/push',
    name: 'push',
    component: Push,
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule,
  },
];

export default routes;
