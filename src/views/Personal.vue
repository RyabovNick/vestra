<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Персональная информация</v-toolbar-title>
          </v-toolbar>
          {{ user }}
          <v-card-text
            v-for="(item, i) in userFields"
            :key="i"
          >{{ item.name }}: {{$store.state.auth.user[item.value]}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data: () => ({
    userFields: [
      { name: 'ФИО', value: 'fio' },
      {
        name: 'Роль',
        value: 'role',
      },
      {
        name: 'Кафедра',
        value: 'caf',
      },
    ],
  }),
  methods: {
    ...mapGetters({
      user: 'auth/currentUser',
    }),
  },
};
</script>

<style>
</style>
