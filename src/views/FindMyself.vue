<template>
  <v-container fluid fill-height>
    <v-layout v-if="applicants === 'AdmissionCommitteeHasNotStarted'" wrap justify-center>
      <v-flex xs12 sm11 md7 lg5>
        <v-card class="no-data">Приёмная комиссия не работает</v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else wrap justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex xs11 justify-center>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Найти себя"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="applicants"
            :search="search"
            rows-per-page-text="Записей на странице"
          >
            <template v-slot:items="props">
              <td>
                <router-link
                  class="applicants-link"
                  :to="{ name: 'applicant', params: {id: props.item.id} }"
                >{{ props.item.fio }}</router-link>
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
      loading: false,
      headers: [
        {
          text: 'ФИО',
          align: 'left',
          sortable: false,
          value: 'fio',
        },
      ],
    };
  },
  mounted() {
    this.getApplicants().then(res => {});
    // TODO - error
  },
  methods: {
    ...mapActions({
      getApplicants: 'priem/getApplicants',
    }),
  },
  computed: {
    ...mapGetters({
      applicants: 'priem/applicants',
    }),
  },
};
</script>

<style scoped>
.applicants-link {
  font-size: 1.6em;
  text-decoration: none;
}
.no-data {
  padding: 30px 50px;
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  color: #18224b;
}
</style>

