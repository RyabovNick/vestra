<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex xs11 justify-center>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Поиск преподавателя"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="teachers" :search="search">
            <template v-slot:items="props">
              <td>
                <router-link
                  class="teacher-link"
                  :to="{ name: 'teacher', params: {fio: props.item.Lecturer} }"
                >{{ props.item.Lecturer }}</router-link>
              </td>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      loadingCheck: false,
      search: '',
      checkedTeacher: '',
      // groupSchedule
      loading: false,
      headers: [
        {
          text: 'ФИО',
          align: 'left',
          sortable: false,
          value: 'Lecturer',
        },
      ],
    };
  },
  mounted() {
    this.getTeachers().then(res => {});
    // TODO - error
  },
  methods: {
    ...mapActions({
      getTeachers: 'schedule/getTeachers',
      getMySchedule: 'schedule/getMySchedule',
    }),
  },
  computed: {
    ...mapGetters({
      teachers: 'schedule/teachers',
    }),
  },
};
</script>

<style scoped>
.teacher-link {
  font-size: 1.6em;
  text-decoration: none;
}
</style>

