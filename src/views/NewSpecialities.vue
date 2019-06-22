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
              label="Поиск специальности"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="newSpecialities"
            :search="search"
            rows-per-page-text="Записей на странице"
          >
            <template v-slot:items="props">
              <td>
                <router-link
                  class="spec-link"
                  :to="{ name: 'currentYearPeople', params: {code: props.item.code, year: '2019'} }"
                >{{ props.item.spec }} ({{ props.item.code}})</router-link>
              </td>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
              >По запросу "{{ search }}" ничего не найдено.</v-alert>
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
      // groupSchedule
      loading: false,
      headers: [
        {
          text: 'Название специальности',
          align: 'left',
          sortable: false,
          value: 'spec',
        },
      ],
    };
  },
  mounted() {
    this.getNewSpecialities().then(res => {});
    // TODO - error
  },
  methods: {
    ...mapActions({
      getNewSpecialities: 'priem/getNewSpecialities',
    }),
  },
  computed: {
    ...mapGetters({
      newSpecialities: 'priem/newSpecialities',
    }),
  },
};
</script>

<style scoped>
.spec-link {
  font-size: 1.6em;
  text-decoration: none;
}
</style>

