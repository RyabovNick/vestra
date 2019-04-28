<template>
  <v-app>
    <layout/>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Layout from "./layouts/default.vue";

export default {
  name: "App",
  components: {
    Layout
  },
  data() {
    return {
      //
    };
  }
};
</script>
