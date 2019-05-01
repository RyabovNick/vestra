<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex
        v-if="groupSchedule[0] !== undefined && !loading"
        xs11
        sm8
        md5
        offset-md1
        justify-space-between
      >
        <!-- TODO: отображать дни, когда занятий нет -->
        <schedule :groupSchedule="groupSchedule"></schedule>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Schedule from '../components/Schedule';

export default {
  components: {
    Schedule,
  },
  data() {
    return {
      // groupSchedule
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    this.getGroupSchedule({ group: this.user.caf }).then(res => {
      this.loading = false;
    });
    // TODO - error
  },
  methods: {
    ...mapActions({
      getGroupSchedule: 'schedule/getGroupSchedule',
    }),
  },
  computed: {
    ...mapGetters({
      groupSchedule: 'schedule/groupSchedule',
      user: 'auth/currentUser',
    }),
  },
};
</script>
