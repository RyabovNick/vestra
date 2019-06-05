import Home from './views/Home';
import Login from './views/Login';
import Personal from './views/Personal';
import Push from './views/Push';
import Schedule from './views/Schedule';
import MySchedule from './views/MySchedule';
import TeachersSchedule from './views/TeachersSchedule';
import Group from './views/Group';
import Teacher from './views/Teacher';
import Specialities from './views/Specialities';
import SpecialityPeople from './views/SpecialityPeople';
import Development from './views/Development.vue';

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
  {
    path: '/priem2018',
    name: 'priem2018',
    component: Specialities,
    meta: { authNotRequired: true },
  },
  {
    path: '/priem2018/:code',
    name: 'priem2018spec',
    component: SpecialityPeople,
    meta: { authNotRequired: true },
  },
  {
    path: '/development',
    name: 'development',
    component: Development,
  },
];

export default routes;
