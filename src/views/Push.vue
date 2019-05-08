<template>
  <v-app>
    <v-form>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm12 md6>
            <v-text-field v-model="title" label="Заголовок"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-text-field v-model="content" label="Содержание"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-text-field v-model="logo" label="Логотип"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-text-field v-model="date_news" label="Дата"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-text-field v-model="topic" label="Топик"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-btn color="primary" dark class="mb-2" @click="sendPush()"
              >Добавить</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      content: '',
      logo: 'test',
      date_news: '2019-04-29',
      topic: 'all',
    };
  },
  methods: {
    // тут ещё добавить от кого сообщение
    sendPush() {
      axios
        .post('https://college.uni-dubna.ru:8451/api/push', {
          title: this.title,
          content: this.content,
          logo: this.logo,
          date_news: this.date_news,
          topic: this.topic,
        })
        .then(res => {
          console.log('res: ', res);
        })
        .catch(err => {
          console.log('err: ', err);
        });
    },
  },
};
</script>

<style>
</style>
