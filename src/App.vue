<template>
  <v-app>
    <layout v-if="hide"></layout>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Layout from './layouts/default';

export default {
  name: 'App',
  components: {
    Layout,
  },
  data() {
    return {
      //
    };
  },
  computed: {
    hide() {
      console.log(this.$route.path);
      return this.$route.path !== '/login';
    },
  },
};
</script>
