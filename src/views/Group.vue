<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex v-else xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Информация о группе</v-toolbar-title>
          </v-toolbar>
          <v-card-text>Факультет: {{ groupInfo[0].faculty }}</v-card-text>
          <v-card-text>Направление: {{ groupInfo[0].dir }}</v-card-text>
          <v-card-text>Профиль: {{ groupInfo[0].profile }}</v-card-text>
          <v-card-text>Группа: {{ groupInfo[0].group }}</v-card-text>
          <v-card-text>Уровень подготовки: {{ groupInfo[0].level }}</v-card-text>
        </v-card>
        <schedule class="schedule" :schedule="groupSchedule"></schedule>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Список группы</v-toolbar-title>
          </v-toolbar>
          <v-card-text v-for="(item, i) in groupInfo" :key="i">{{i+1}}. {{ item.fio }}</v-card-text>
        </v-card>
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
      loading: true,
    };
  },
  mounted() {
    // TODO - error
    console.log('this.$route.params.group: ', this.$route.params.group);
    this.getGroupInfo({ group: this.$route.params.group })
      .then(res => {
        console.log('res: ', res);
        this.loading = false;
      })
      .catch(err => {});
    this.getGroupSchedule({ group: this.$route.params.group }).then(res => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions({
      getGroupInfo: 'schedule/getGroupInfo',
      getGroupSchedule: 'schedule/getGroupSchedule',
    }),
  },
  computed: {
    ...mapGetters({
      groupInfo: 'schedule/groupInfo',
      groupSchedule: 'schedule/groupSchedule',
    }),
  },
};
</script>

<style scoped>
.schedule {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
