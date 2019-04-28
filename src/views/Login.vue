<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Вход</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert :value="alert" :color="color" :icon="icon" outline>{{ msg }}</v-alert>
            <form>
              <v-text-field
                v-model="name"
                v-validate="'required'"
                prepend-icon="person"
                name="name"
                label="Логин"
                :error-messages="errors.collect('name')"
                data-vv-name="name"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                v-validate="'required'"
                id="password"
                prepend-icon="lock"
                name="password"
                label="Пароль"
                :error-messages="errors.collect('password')"
                type="password"
                required
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Войти</v-btn>
              </v-card-actions>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  $_veeValidate: {
    validator: 'new',
  },

  data: () => ({
    // form
    name: '',
    password: '',
    dictionary: {
      custom: {
        name: {
          required: () => 'Логин не может быть пустым',
        },
        password: {
          required: () => 'Пароль не может быть пустым',
        },
      },
    },
    // alert
    alert: false,
    color: 'error',
    icon: 'warning',
    msg: '',
  }),

  mounted() {
    this.$validator.localize('ru', this.dictionary);
  },

  methods: {
    submit() {
      this.$validator.validate().then(res => {
        if (res) {
          // send request to server
          this.msg =
            'Неправильный логин или пароль, пожалуйста, проверьте введённые данные';
          this.alert = true;
        }
      });
    },
    ...mapActions({
      login: 'auth/login',
    }),
  },
};
</script>

<style scoped>
.v-toolbar__title {
  padding-left: 1em;
}

.container.fill-height {
  position: fixed;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
