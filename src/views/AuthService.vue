<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex xs11 justify-center>
        <h1>Сервис авторизации</h1>
        <h4>https://vestra.uni-dubna.ru:8445</h4>
        <p>В своих работах вы можете использовать авторизацию пользователей через учётные записи доменов free (студенты, преподаватели, доступ из КК) и unidomain (сотрудники университета)</p>
        <hr>
        <p>/api/login</p>
        <p>Ожидает на вход данные в таком виде:</p>
        <pre class="prettyprint lang-json">
          {
            "username": "your_username",
            "password": "tour_password"
          }
        </pre>
        <p>Если всё ОК, то возвращается ответ 200 и данные в таком виде:</p>
        <pre class="prettyprint lang-json">
          {
            "user": {
              "username": "ivanov.i.i",
              "fio": "Иванов Иван Иванович",
              "role": "Students",
              "caf": "Системный анализ и управления",
              "oneCcode": "100088236",
              "token": "your_token_here"
            }
          }
        </pre>
        <p>Если ошибка:</p>
        <pre class="prettyprint lang-json">
          {
            "msg": "error_message"
          }
        </pre>
        <p>Возвращенный пользователю токен записывается в authorization header на клиенте и проверяется каждый раз при запросе.</p>
        <hr>
        <p>/api/tokenValidation</p>
        <p>В headers должна быть такая запись: Bearer yourftokenmustbehere</p>
        <pre class="prettyprint lang-json">
          {
            "username": "User",
            "fio": "Иванов Иван Иванович",
            "role": "Teachers",
            "caf": "Кафедра системного анализа и управления",
            "oneCcode": "100086561",
            "exp": 1561281394,
            "iat": 1556097394
          }
        </pre>
        <p>Примечание: caf, если человек является студентом - номер группы</p>
        <p>Если токен истёк</p>
        <pre class="prettyprint lang-json">
          {
            "errors": {
              "message": "jwt expired",
              "error": {}
            }
          }
        </pre>
        <p>Если токен подписан неверно:</p>
        <pre class="prettyprint lang-json">
          {
            "errors": {
              "message": "invalid signature",
              "error": {}
            }
          }
        </pre>
        <p>Если у него неправильная структура:</p>
        <pre class="prettyprint lang-json">
          {
            "errors": {
              "message": "Unexpected token \b in JSON at position 123",
              "error": {}
            }
          }
        </pre>
        <p>Т.е. если в ответном сообщени от сервера есть 'errors' - доступ не давать. В остальном случае, проверять роль.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
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
