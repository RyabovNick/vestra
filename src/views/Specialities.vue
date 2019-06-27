<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex v-if="loading" xs12 sm8 md5 offset-md1 justify-center class="loading-container">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex v-else xs11 justify-center>
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
            :items="specialities"
            :search="search"
            :pagination.sync="pagination"
            rows-per-page-text="Записей на странице"
          >
            <template v-slot:items="props">
              <td>
                <router-link
                  class="spec-link"
                  :to="{ name: 'lastYearPeople', params: {code: props.item.code} }"
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
      loading: true,
      pagination: {
        rowsPerPage: -1,
      },
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
    this.getSpecialities()
      .then(res => {
        this.loading = false;
      })
      .catch(err => {});
    // TODO - error
  },
  methods: {
    ...mapActions({
      getSpecialities: 'priem/getSpecialities',
    }),
  },
  computed: {
    ...mapGetters({
      specialities: 'priem/specialities',
    }),
  },
};
</script>

<style scoped>
.spec-link {
  font-size: 1.6em;
  text-decoration: none;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 60px auto;
}
</style>

