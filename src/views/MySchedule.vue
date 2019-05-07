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
        <!-- TODO: отображать дни, когда занятий нет -->
        <my-schedule :mySchedule="mySchedule" :role="user.role"></my-schedule>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MySchedule from '../components/MySchedule';

export default {
  components: {
    MySchedule,
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
      console.log('res: ', res);
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
