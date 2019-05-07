<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex xs11 sm8 md3 justify-center>
        <v-select
          :items="groups"
          v-model="checkedCaf"
          label="Выберите факультет"
          @change="checkedGroups()"
          item-value="caf"
        >
          <template slot="selection" slot-scope="data">{{
            data.item.caf
          }}</template>
          <template slot="item" slot-scope="data">{{ data.item.caf }}</template>
        </v-select>
        <v-select
          :items="courses"
          v-model="checkedCourse"
          label="Выберите курс"
          @change="checkedGroups()"
        ></v-select>
        <v-select
          :items="availableGroups"
          v-model="checkedGroup"
          label="Выберите группу"
          @change="showSchedule()"
          item-value="group"
        >
          <template slot="selection" slot-scope="data">{{
            data.item.group
          }}</template>
          <template slot="item" slot-scope="data">{{
            data.item.group
          }}</template>
        </v-select>
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
      // groups
      cafs: ['', 'ИСАУ', 'ФЕИН', 'ФСГН', 'ФЭУ'],
      checkedCaf: '',
      courses: [1, 2, 3, 4, 5, 6],
      checkedCourse: 1,
      availableGroups: null,
      checkedGroup: 1011,
      // groupSchedule
      loading: false,
    };
  },
  mounted() {
    this.getGroups().then(res => {});
    // TODO - error
  },
  methods: {
    ...mapActions({
      getGroups: 'schedule/getGroups',
      getGroupSchedule: 'schedule/getGroupSchedule',
    }),
    checkedGroups() {
      this.checkedGroup = null;
      let checkedCaf = this.groups.filter((item, i) => {
        return item.caf == this.checkedCaf;
      });
      this.availableGroups =
        checkedCaf[0].courses[this.checkedCourse - 1].groups;
    },
    showSchedule() {
      this.loading = true;
      if (this.checkedGroup !== null)
        this.getGroupSchedule({ group: this.checkedGroup }).then(res => {
          this.loading = false;
        });
    },
  },
  computed: {
    ...mapGetters({
      groups: 'schedule/groups',
      groupSchedule: 'schedule/groupSchedule',
    }),
  },
};
</script>
