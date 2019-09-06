<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex v-else-if="teacherNotFound" xs11 sm8 md5 offset-md1 justify-center>
        <ul class="list-group">
          <li>
            <router-link to="/students">СиФ сложных сетей</router-link>
            <span class="badge">Лекция</span>
          </li>
          <li>
            <router-link to="/students">СиФ сложных сетей</router-link>
            <span class="badge1">Семинар</span>
          </li>
          <li>
            <router-link to="/students">ПРВ</router-link>
            <span class="badge">Семинар</span>
          </li>
          <li>
            <router-link to="/students">ПИ</router-link>
            <span class="badge">Семинар</span>
          </li>
          <li>
            <router-link to="/students">Параллельные и распределенные вычисления</router-link>
            <span class="badge">Лекция</span>
          </li>
          <li>
            <router-link to="/students">СБ</router-link>
            <span class="badge1">Семинар</span>
          </li>
          <li>
            <router-link to="/students">ПТ ПИПП</router-link>
            <span class="badge">Семинар</span>
          </li>
          <li>
            <router-link to="/students">Разработка прил.</router-link>
            <span class="badge">Семинар</span>
          </li>
          <li>
            <router-link to="/students">ТЯПМТ</router-link>
            <span class="badge">Семинар</span>
          </li>
          <li>
            <router-link to="/students">СИИ</router-link>
            <span class="badge">Семинар</span>
          </li>
        </ul>
      </v-flex>
      <v-flex v-else xs12 sm8 md4>
        <v-card class="elevation-12 teacher-info">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Информация о преподавателе</v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="teacherInfo[0].fio !== null">ФИО: {{ teacherInfo[0].fio }}</v-card-text>
          <v-card-text
            v-if="teacherInfo[0].degree !== null"
          >Ученая степень: {{ teacherInfo[0].degree }}</v-card-text>
          <v-card-text
            v-if="teacherInfo[0].title !== null"
          >Ученое звание: {{ teacherInfo[0].title }}</v-card-text>
          <v-card-text v-if="teacherInfo[0].caf !== null">{{ teacherInfo[0].caf }}</v-card-text>
          <v-card-text
            v-if="teacherInfo[0].position !== null"
          >Должность: {{ teacherInfo[0].position }}</v-card-text>
        </v-card>
      </v-flex>
      <!--
      <v-flex
        v-if="mySchedule[0] !== undefined && !loading"
        xs11
        sm8
        md5
        offset-md1
        justify-space-between
      >
        
        <schedule :schedule="mySchedule"></schedule>
      </v-flex>
      -->
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
      teacherNotFound: false, // check error
    };
  },
  mounted() {
    // TODO - error
    this.getTeacherInfo({ fio: this.$route.params.fio })
      .then(res => {
        this.loading = false;
      })
      .catch(err => {
        if (err.message == 404) {
          console.log(err);
          this.loading = false;
          this.teacherNotFound = true;
        }
      });

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
.list-group {
  list-style: none;
  margin: 0;
  padding: 0;

  border: 1px solid #efefef;
  border-radius: 0.5em;
  width: 100%;
  color: #333;
  font-weight: 600;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
}
.list-group li {
  border-top: 1px solid #cccccc7a;
  padding: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1em;
}
.list-group li:first-child {
  border-top: 0;
}
.list-group .badge {
  background-color: #333b99;
  color: #fff;
  font-weight: bold;
  font-size: 95%;
  border-radius: 10em;
  min-width: 6.5em;
  padding: 0.25em;
  text-align: center;
}
.list-group .badge1 {
  background-color: green;
  color: #fff;
  font-weight: bold;
  font-size: 95%;
  border-radius: 10em;
  min-width: 6.5em;
  padding: 0.25em;
  text-align: center;
}
a {
  text-decoration: none;
}
</style>
