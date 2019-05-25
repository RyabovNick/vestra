<template>
  <v-container fluid fill-height>
    <v-layout wrap align-center justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex v-else xs12 sm8 md4>
        <v-card class="elevation-12 teacher-info">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Информация о преподавателе</v-toolbar-title>
          </v-toolbar>
          <v-card-text>ФИО: {{ teacherInfo[0].fio }}</v-card-text>
          <v-card-text
            v-if="teacherInfo[0].degree !== null"
          >Ученая степень: {{ teacherInfo[0].degree }}</v-card-text>
          <v-card-text
            v-if="teacherInfo[0].title !== null"
          >Ученое звание: {{ teacherInfo[0].title }}</v-card-text>
          <v-card-text
            v-if="teacherInfo[0].caf !== null"
          >{{ teacherInfo[0].caf }}</v-card-text>
          <v-card-text
            v-if="teacherInfo[0].position !== null"
          >Должность: {{ teacherInfo[0].position }}</v-card-text>
        </v-card>
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
      loading: true,
    };
  },
  mounted() {
    // TODO - error
    this.getTeacherInfo({ fio: this.$route.params.fio })
      .then(res => {
        this.loading = false;
      })
      .catch(err => {});

    this.getMySchedule({
      name: this.$route.params.fio,
      role: 'Teachers',
      group: null,
    }).then(res => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions({
      getTeacherInfo: 'schedule/getTeacherInfo',
      getMySchedule: 'schedule/getMySchedule',
    }),
    // TODO: выводить фоточку
    createBinary(img) {
      return (
        'data:image/gif;base64,' +
        btoa(
          new Uint8Array(img).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        )
      );
    },
  },
  computed: {
    ...mapGetters({
      teacherInfo: 'schedule/teacherInfo',
      mySchedule: 'schedule/mySchedule',
    }),
  },
};
</script>

<style scoped>
img {
  width: 150px;
  height: 150px;
}

.teacher-info {
  margin-bottom: 1em;
}
</style>
