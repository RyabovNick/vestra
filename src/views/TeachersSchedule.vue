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
          hide-details
          item-value="Lecturer"
          label="Выберите преподавателя"
          solo-inverted
          @change="change()"
        >
          <template slot="no-data"
            >Такого преподавателя нет :(
          </template>
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
        v-if="mySchedule[0] !== undefined && !loading && checkedTeacher"
        xs11
        sm8
        md5
        offset-md1
        justify-space-between
      >
        <!-- TODO: отображать дни, когда занятий нет -->
        <schedule :schedule="mySchedule"></schedule>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Schedule from '../components/TeachersSchedule';

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
      console.log('val: ', val);
      console.log(
        'val !== this.checkedTeacher.Lecturer: ',
        val !== this.checkedTeacher.Lecturer,
      );
      console.log('this.querySelections(val): ', this.querySelections(val));
      val && val !== this.checkedTeacher.Lecturer;
      this.querySelections(val);
    },
  },
  methods: {
    ...mapActions({
      getTeachers: 'schedule/getTeachers',
      getMySchedule: 'schedule/getMySchedule',
    }),
    querySelections(v) {
      this.loadingCheck = true;
      // Simulated ajax query
      setTimeout(() => {
        this.availableTeachers = this.teachers.filter(e => {
          return (
            (e.Lecturer || '').toLowerCase().indexOf((v || '').toLowerCase()) >
            -1
          );
        });
        this.loadingCheck = false;
        console.log(this.availableTeachers);
      }, 500);
    },
    change() {
      this.loading = true;
      // лениво делать отдельный actions
      this.getMySchedule({
        name: this.checkedTeacher.Lecturer,
        role: 'Teachers',
        group: null,
      }).then(res => {
        this.loading = false;
      });
    },
  },
  computed: {
    ...mapGetters({
      teachers: 'schedule/teachers',
      mySchedule: 'schedule/mySchedule',
    }),
  },
};
</script>
