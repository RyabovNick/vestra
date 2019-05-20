import Home from './views/Home';
import Login from './views/Login';
import Personal from './views/Personal';
import Push from './views/Push';
import Schedule from './views/Schedule';
import MySchedule from './views/MySchedule';
import TeachersSchedule from './views/TeachersSchedule.vue';
import Group from './views/Group.vue';
import Teacher from './views/Teacher.vue';

export const routes = [
  {
    path: '/index.html',
    component: Home,
    alias: '/',
  },
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
  {
    path: '/myschedule',
    name: 'myschedule',
    component: MySchedule,
  },
  {
    path: '/teachersschedule',
    name: 'teachersschedule',
    component: TeachersSchedule,
  },
  {
    path: '/group/:group',
    name: 'group',
    component: Group,
  },
  {
    path: '/teacher/:fio',
    name: 'teacher',
    component: Teacher,
  },
];

export default routes;
