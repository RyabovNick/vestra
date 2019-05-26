<template>
  <v-container fluid fill-height>
    <v-layout wrap align-center justify-center>
      <v-flex v-if="loading" xs11 sm8 md5 offset-md1 justify-center>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex v-else xs12 sm11 md7 lg6>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Cпециальность {{$route.params.code}} (2018 год)</v-toolbar-title>
        </v-toolbar>
        <v-card
          class="elevation-12 spec-info"
          v-for="(item,i) in specialityInfo"
          :key="i"
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
      <v-flex xs12 sm11 md9 lg6 justify-center>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="specialityPeople"
            :pagination.sync="pagination"
            rows-per-page-text="Записей на странице"
          >
            <template v-slot:items="props">
              <td>{{ props.item.fio }}</td>
              <td>{{ props.item.sum }}</td>
              <td>{{ props.item.konkursGroup }}</td>
              <td>{{ props.item.indiv }}</td>
              <td>{{ props.item.ege }}</td>
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
    this.getSpecialityInfo({ code: this.$route.params.code })
      .then(res => {
        console.log('specialityInfo: ', this.specialityInfo);
        this.loading = false;
        this.getSpecialityPeople({
          code: this.$route.params.code,
        }).then(res => {
          this.loading = false;
        });
      })
      .catch(err => {});
  },
  methods: {
    ...mapActions({
      getSpecialityInfo: 'priem/getSpecialityInfo',
      getSpecialityPeople: 'priem/getSpecialityPeople',
    }),
  },
  computed: {
    ...mapGetters({
      specialityInfo: 'priem/specialityInfo',
      specialityPeople: 'priem/specialityPeople',
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
</style>
