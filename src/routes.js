import Home from './views/Home';
import Login from './views/Login';
import Personal from './views/Personal';
import Push from './views/Push';
import Schedule from './views/Schedule';
import MySchedule from './views/MySchedule';
import TeachersSchedule from './views/TeachersSchedule';
import Group from './views/Group';
import Teacher from './views/Teacher';

export const routes = [
  {
    path: '/index.html',
    component: Home,
    alias: '/',
    meta: { authNotRequired: true },
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { authNotRequired: true },
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
    meta: { authNotRequired: true },
  },
  {
    path: '/myschedule',
    name: 'myschedule',
    component: MySchedule,
  },
  {
    path: '/teachersschedule',
    name: 'teachersschedule',
    component: TeachersSchedule,
    meta: { authNotRequired: true },
  },
  {
    path: '/group/:group',
    name: 'group',
    component: Group,
    meta: { authNotRequired: true },
  },
  {
    path: '/teacher/:fio',
    name: 'teacher',
    component: Teacher,
    meta: { authNotRequired: true },
  },
];

export default routes;
