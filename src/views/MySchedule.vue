<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
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
  data() {
    return {
      // groupSchedule
      loading: false,
    };
  },
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
      mySchedule: 'schedule/mySchedule',
      user: 'auth/currentUser',
    }),
  },
};
</script>
