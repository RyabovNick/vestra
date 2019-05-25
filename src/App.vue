<template>
  <v-app>
    <layout></layout>
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
};
</script>
