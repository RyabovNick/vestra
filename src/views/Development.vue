<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex xs11 justify-center>
        <h1>Выполнение бакалаврских и магистерских работ в приложении Vestra</h1>
        <p></p>
        <pre class="prettyprint lang-js">
          class Foo
          {
            internal Foo()
            {
              for (int i = 0; i = 42; ++i);
            }
          }
        </pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sourcecode: `
      logout() {
        this.userLogout().then(() => {
          this.$router.push({ name: 'login' });
        });
      }
      `,
    };
  },
  mounted() {
    let script = document.createElement('script');
    script.setAttribute(
      'src',
      'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js',
    );
    document.head.appendChild(script);
  },
};
</script>

<style scoped>
.container.fluid {
  max-width: 1000px;
}
.prettyprint {
  background-color: #ffffff !important;
}
</style>
