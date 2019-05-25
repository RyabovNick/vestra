<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 personal-info">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Персональная информация</v-toolbar-title>
          </v-toolbar>
          <v-card-text
            v-for="(item, i) in userFields"
            :key="i"
          >{{ item.name }}: {{user[item.value]}}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex
        v-if="mySchedule[0] !== undefined && !loading"
        xs11
        sm8
        md5
        offset-md1
        justify-space-between
      >
        <teachers-schedule
          v-if="user.role === 'Teachers'"
          :schedule="mySchedule"
        ></teachers-schedule>
        <students-schedule v-else :schedule="mySchedule"></students-schedule>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TeachersSchedule from '../components/TeachersSchedule';
import StudentsSchedule from '../components/StudentsSchedule';

export default {
  components: {
    TeachersSchedule,
    StudentsSchedule,
  },
  data: () => ({
    loading: false,
    userFields: [
      { name: 'ФИО', value: 'fio' },
      {
        name: 'Роль',
        value: 'role',
      },
      {
        name: 'Группа',
        value: 'caf',
      },
    ],
  }),
  mounted() {
    this.loading = true;
    this.getMySchedule({
      name: this.user.fio,
      role: this.user.role,
      group: this.user.caf,
    }).then(res => {
      this.loading = false;
    });
    // TODO - error
  },
  methods: {
    ...mapActions({
      getMySchedule: 'schedule/getMySchedule',
    }),
  },
  computed: {
    ...mapGetters({
      user: 'auth/currentUser',
      mySchedule: 'schedule/mySchedule',
    }),
  },
};
</script>

<style>
.v-toolbar__title {
  padding-left: 1em;
}

.personal-info {
  margin-bottom: 1em;
}
</style>
