<template>
  <v-container fluid fill-height>
    
    <v-layout wrap justify-center>
      <v-flex v-if="loading" xs12 sm8 md5 offset-md1 justify-center class="loading-container">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex v-else xs12 sm11 md11 lg9 offset-lg1 justify-center>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ this.$route.params.group }}</v-toolbar-title>
          </v-toolbar>
          <div class="no-data" v-if="newSpecialityPeople.length === 0">Нет данных</div>
          <div v-else>
            <v-data-table
              :headers="headers"
              :items="newSpecialityPeople"
              :pagination.sync="pagination"
              rows-per-page-text="Записей на странице"
            >
              <template v-slot:items="props">
                <tr
                  v-if="props.item.konkursGroup == $route.params.group"
                  v-bind:class="{ credited: props.item.credited === 'true', selected: props.item.id === $route.params.id}"
                >
                  <td>{{props.item.num}}</td>
                  <td>
                    <router-link
                      :to="{ name: 'applicant', params: {id: props.item.id} }"
                    >{{ props.item.fio }}</router-link>
                  </td>
                  <td>{{ props.item.sum }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'currentYearPeople', params: {code: props.item.code} }"
                    >{{ props.item.konkursGroup }} ({{ props.item.code}})</router-link>
                  </td>
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
      filter: '',
      loading: true,
      pagination: {
        sortBy: 'sum',
        descending: true,
        rowsPerPage: -1,
      },
      headers: [
        {
          text: '№',
          align: 'left',
          sortable: false,
          value: 'num',
        },
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
    this.getNewSpecialityPeople({ code: this.$route.params.code })
      .then(res => {
        this.loading = false;
      })
      .catch(err => {});
  },
  methods: {
    ...mapActions({
      getNewSpecialityPeople: 'priem/getNewSpecialityPeople',
    }),
  },
  computed: {
    ...mapGetters({
      newSpecialityPeople: 'priem/newSpecialityPeople',
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
.selected td {
  background: rgba(24, 34, 75, 0.45);
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 60px auto;
}
</style>