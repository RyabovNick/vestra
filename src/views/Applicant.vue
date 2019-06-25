<template>
  <v-container fluid fill-height>
    <v-layout v-if="applicantInfo === 'AdmissionCommitteeHasNotStarted'" wrap justify-center>
      <v-flex xs12 sm11 md7 lg5>
        <v-card class="no-data">Приёмная комиссия не работает</v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else wrap justify-center>
      <v-flex xs12 sm11 md9 lg5 offset-lg1 justify-center>
        <v-card>
          <div class="no-data" v-if="applicantInfo.length === 0">Нет данных</div>
          <v-data-table
            v-else
            :headers="headers"
            :items="applicantInfo"
            :pagination.sync="pagination"
            rows-per-page-text="Записей на странице"
          >
            <template v-slot:items="props">
              <tr v-bind:class="{ credited: props.item.credited === 'true' }">
                <td>{{ props.item.fio }}</td>
                <td>{{ props.item.sum }}</td>
                <td>{{ props.item.konkursGroup }}</td>
                <td>{{ props.item.indiv }}</td>
                <td>{{ props.item.ege }}</td>
              </tr>
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
      loading: true,
      filter: '',
      pagination: {
        sortBy: 'sum',
        descending: true,
        rowsPerPage: 10,
      },
      headers: [
        {
          text: 'ФИО',
          align: 'left',
          sortable: false,
          value: 'fio',
        },
        {
          text: 'Сумма баллов',
          align: 'left',
          sortable: true,
          value: 'sum',
        },
        {
          text: 'Конкурсная группа',
          align: 'left',
          sortable: true,
          value: 'konkursGroup',
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
.v-card__text {
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
  padding-top: 8px;
  width: 100%;
}
.spec-info {
  margin-bottom: 1em;
}
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
.elevation-12 {
  cursor: pointer;
}
.elevation-12.active {
  background-color: #d5d5d5;
}
</style>