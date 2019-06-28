<template>
  <v-container fluid fill-height>
    <v-layout v-if="applicantInfo === 'AdmissionCommitteeHasNotStarted'" wrap justify-center>
      <v-flex xs12 sm11 md7 lg5>
        <v-card class="no-data">Приёмная комиссия не работает</v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else wrap justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center class="loading-container">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex v-else xs12 sm11 md9 lg7 offset-lg1 justify-center>
        <v-card>
          <div class="no-data" v-if="applicantInfo.length === 0">Нет данных</div>
          <div v-else>
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{ applicantInfo[0].fio }}</v-toolbar-title>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="applicantInfo"
              :pagination.sync="pagination"
              rows-per-page-text="Записей на странице"
            >
              <template v-slot:items="props">
                <tr v-bind:class="{ credited: props.item.credited === 'true' }">
                  <td>
                    <router-link
                      :to="{ name: 'personalRating', params: {code: props.item.code, group: props.item.konkursGroup, id: $route.params.id } }"
                    >{{ props.item.konkursGroup }}</router-link>
                  </td>
                  <td>{{ props.item.sum }}</td>
                  <td>{{ props.item.indiv }}</td>
                  <td>{{ props.item.ege }}</td>
                  <td>{{ props.item.documentType }}</td>
                </tr>
              </template>
            </v-data-table>
          </div>
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
      loading: true,
      filter: '',
      pagination: {
        sortBy: 'sum',
        descending: true,
        rowsPerPage: 10,
      },
      headers: [
        {
          text: 'Конкурсная группа',
          align: 'left',
          sortable: true,
          value: 'konkursGroup',
        },
        {
          text: 'Сумма баллов',
          align: 'left',
          sortable: true,
          value: 'sum',
        },
        {
          text: 'Инд. достижения',
          align: 'left',
          sortable: true,
          value: 'indiv',
        },
        {
          text: 'ЕГЭ',
          align: 'left',
          sortable: true,
          value: 'ege',
        },
        {
          text: 'Вид документа',
          align: 'left',
          sortable: true,
          value: 'documentType',
        },
      ],
    };
  },
  mounted() {
    // TODO - error
    this.getApplicantInfo({ id: this.$route.params.id })
      .then(res => {
        this.loading = false;
      })
      .catch(err => {});
  },
  methods: {
    ...mapActions({
      getApplicantInfo: 'priem/getApplicantInfo',
    }),
  },
  computed: {
    ...mapGetters({
      applicantInfo: 'priem/applicantInfo',
    }),
  },
};
</script>

<style scoped>
.no-data {
  padding: 30px 50px;
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  color: #18224b;
}
.credited td {
  background: rgba(0, 220, 0, 0.74);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 60px auto;
}
</style>