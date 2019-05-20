<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex v-else xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Информация о преподавателе</v-toolbar-title>
          </v-toolbar>
          <img :src="createBinary(teacherInfo[0].photo.data)" aspect-ratio="2.75">
          <v-card-text>ФИО: {{ teacherInfo[0].fio }}</v-card-text>
          <v-card-text>Ученая степень: {{ teacherInfo[0].degree }}</v-card-text>
          <v-card-text>Ученое звание: {{ teacherInfo[0].title }}</v-card-text>
          <v-card-text>Кафедра: {{ teacherInfo[0].caf }}</v-card-text>
          <v-card-text>Должность: {{ teacherInfo[0].position }}</v-card-text>
        </v-card>
        <!-- <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Список группы</v-toolbar-title>
          </v-toolbar>
          <v-card-text v-for="(item, i) in groupInfo" :key="i">{{i+1}}. {{ item.fio }}</v-card-text>
        </v-card>-->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
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
  },
  methods: {
    ...mapActions({
      getTeacherInfo: 'schedule/getTeacherInfo',
    }),
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
    }),
  },
};
</script>

<style scoped>
img {
  width: 150px;
  height: 150px;
}
</style>
