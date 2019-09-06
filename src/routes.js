import Home from './views/Home';
import Login from './views/Login';
import Personal from './views/Personal';
import Marks from './views/Marks';
import Push from './views/Push';
import Schedule from './views/Schedule';
import MySchedule from './views/MySchedule';
import TeachersSchedule from './views/TeachersSchedule';
import Group from './views/Group';
import Teacher from './views/Teacher';
import NewSpecialities from './views/NewSpecialities';
import NewSpecialityPeople from './views/NewSpecialityPeople';
import FindMyself from './views/FindMyself';
import Specialities from './views/Specialities';
import SpecialityPeople from './views/SpecialityPeople';
import Applicant from './views/Applicant';
import PersonalRating from './views/PersonalRating';
import Development from './views/Development';
import AuthService from './views/AuthService';
import ScheduleService from './views/ScheduleService';
import PushService from './views/PushService';
import Students from './views/Students';
import Success from './views/success';

export const routes = [{
    path: '/index.html',
    component: Home,
    alias: '/',
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ './views/About.vue'),
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal,
  },
  {
    path: '/marks',
    name: 'marks',
    component: Marks,
  },
  
  {
    path: '/push',
    name: 'push',
    component: Push,
    meta: {
      roleRequired: true,
    },
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule,
    meta: {
      authNotRequired: true,
    },
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
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/group/:group',
    name: 'group',
    component: Group,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/teacher/:fio',
    name: 'teacher',
    component: Teacher,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/abitur/all',
    name: 'currentYear',
    component: NewSpecialities,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/abitur/all/:code',
    name: 'currentYearPeople',
    component: NewSpecialityPeople,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/abitur/search',
    name: 'findMyself',
    component: FindMyself,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/abitur/search/info/:id',
    name: 'applicant',
    component: Applicant,
    meta: {
      authNotRequired: true
    },
  },
  {
    path: '/abitur/all/:code/:group/:id',
    name: 'personalRating',
    component: PersonalRating,
    meta: {
      authNotRequired: true
    },
  },
  {
    path: '/lastYear',
    name: 'lastYear',
    component: Specialities,
    meta: {
      authNotRequired: true
    },
  },
  {
    path: '/lastYear/:code',
    name: 'lastYearPeople',
    component: SpecialityPeople,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/development',
    name: 'development',
    component: Development,
  },
  {
    path: '/development/auth',
    name: 'authService',
    component: AuthService,
  },
  {
    path: '/development/schedule',
    name: 'scheduleService',
    component: ScheduleService,
  },
  {
    path: '/development/push',
    name: 'pushService',
    component: PushService,
  },
  {
    path: '/students',
    name: 'students',
    component: Students,
  },
  {
    path: '/success',
    name: 'success',
    component: Success,
  }
];

export default routes;
