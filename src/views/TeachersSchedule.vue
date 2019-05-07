<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex xs11 sm8 md3 justify-center>
        <v-autocomplete
          v-model="checkedTeacher"
          :loading="loadingCheck"
          :items="availableTeachers"
          :search-input.sync="search"
          cache-items
          class="mx-3"
          flat
          hide-no-data
          hide-details
          label="Выберите преподавателя"
          solo-inverted
        >
          <template slot="selection" slot-scope="data">{{
            data.item.Lecturer
          }}</template>
          <template slot="item" slot-scope="data">{{
            data.item.Lecturer
          }}</template>
        </v-autocomplete>
      </v-flex>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex
        v-if="groupSchedule[0] !== undefined && !loading && checkedGroup"
        xs11
        sm8
        md5
        offset-md1
        justify-space-between
      >
        <!-- TODO: отображать дни, когда занятий нет -->
        <schedule :schedule="groupSchedule"></schedule>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Schedule from '../components/StudentsSchedule';

export default {
  components: {
    Schedule,
  },
  data() {
    return {
      loadingCheck: false,
      search: null,
      availableTeachers: [],
      checkedTeacher: '',
      // groupSchedule
      loading: false,
    };
  },
  mounted() {
    this.getTeachers().then(res => {
      this.availableTeachers = res;
    });
    // TODO - error
  },
  watch: {
    search(val) {
      val && val !== this.checkedTeacher && this.querySelections(val);
    },
  },
  methods: {
    ...mapActions({
      getTeachers: 'schedule/getTeachers',
      getGroupSchedule: 'schedule/getGroupSchedule',
    }),
    showSchedule() {
      this.loading = true;
      if (this.checkedGroup !== null)
        this.getGroupSchedule({ group: this.checkedGroup }).then(res => {
          this.loading = false;
        });
    },
    querySelections(v) {
      this.loadingCheck = true;
      // Simulated ajax query
      setTimeout(() => {
        this.availableTeachers = this.teachers.filter(e => {
          console.log(
            '(e.Lecturer || ).toLowerCase(): ',
            (e.Lecturer || '').toLowerCase().indexOf((v || '').toLowerCase()),
          );
          return (
            (e.Lecturer || '').toLowerCase().indexOf((v || '').toLowerCase()) >
            -1
          );
        });
        this.loadingCheck = false;
        console.log(this.availableTeachers);
      }, 50);
    },
  },
  computed: {
    ...mapGetters({
      teachers: 'schedule/teachers',
      groupSchedule: 'schedule/groupSchedule',
    }),
  },
};
</script>
