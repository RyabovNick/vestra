<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Персональная информация</v-toolbar-title>
          </v-toolbar>
          <v-card-text
            v-for="(item, i) in userFields"
            :key="i"
          >{{ item.name }}: {{user[item.value]}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters({
      user: 'auth/currentUser',
    }),
  },
};
</script>

<style>
.v-toolbar__title {
  padding-left: 1em;
}
</style>
