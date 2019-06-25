<template>
  <v-container fluid fill-height>
    <v-layout
      v-if="newSpecialityInfo === 'AdmissionCommitteeHasNotStarted' || newSpecialityPeople === 'AdmissionCommitteeHasNotStarted'"
      wrap
      justify-center
    >
      <v-flex xs12 sm11 md7 lg5>
        <v-card class="no-data">Приёмная комиссия не работает</v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else wrap justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex v-else xs12 sm11 md7 lg5>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Cпециальность {{$route.params.code}} (2019 год)</v-toolbar-title>
        </v-toolbar>
        <v-card
          class="elevation-12 spec-info"
          v-for="(item,i) in newSpecialityInfo"
          :key="i"
          v-on:click="
          pagination.rowsPerPage = -1;
          filter = (filter === item.group ? '' : item.group);"
          v-bind:class="{ active: filter === item.group }"
        >
          <v-card-text>
            <b>Конкурсная группа:</b>
            {{item.group}}
          </v-card-text>
          <v-card-text>
            <b>Форма обучения:</b>
            {{item.form}}
          </v-card-text>
          <v-card-text>
            <b>Уровень подготовки:</b>
            {{item.level}}
          </v-card-text>
          <v-card-text>
            <b>Основание поступления:</b>
            {{item.osnov}}
          </v-card-text>
          <v-card-text>
            <b>Специальность:</b>
            {{item.spec}}
          </v-card-text>
          <v-card-text>
            <b>Количество мест:</b>
            {{item.places}}
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm11 md9 lg5 offset-lg1 justify-center>
        <v-card>
          <div class="no-data" v-if="newSpecialityPeople.length === 0">Нет данных</div>
          <v-data-table
            v-else
            :headers="headers"
            :items="newSpecialityPeople"
            :pagination.sync="pagination"
            rows-per-page-text="Записей на странице"
          >
            <template v-slot:items="props">
              <tr
                v-if="props.item.konkursGroup === filter || filter.length === 0"
                v-bind:class="{ credited: props.item.credited === 'true'}"
              >
                <td>
                  <router-link
                    :to="{ name: 'applicant', params: {id: props.item.id} }"
                  >{{ props.item.fio }}</router-link>
                </td>
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
    this.getNewSpecialityInfo({ code: this.$route.params.code })
      .then(res => {
        console.log('newSpecialityInfo: ', this.newSpecialityInfo);
        this.loading = false;
        this.getNewSpecialityPeople({
          code: this.$route.params.code,
        }).then(res => {
          this.loading = false;
        });
      })
      .catch(err => {});
  },
  methods: {
    ...mapActions({
      getNewSpecialityInfo: 'priem/getNewSpecialityInfo',
      getNewSpecialityPeople: 'priem/getNewSpecialityPeople',
    }),
  },
  computed: {
    ...mapGetters({
      newSpecialityInfo: 'priem/newSpecialityInfo',
      newSpecialityPeople: 'priem/newSpecialityPeople',
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
