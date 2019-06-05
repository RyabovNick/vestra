<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex xs11 justify-center>
        <h1>Сервис расписания</h1>
        <h4>https://vestra.uni-dubna.ru:8447</h4>
        <p>/api/groups</p>
        <p>Возвращает список групп для каждого курса</p>
        <pre class="prettyprint lang-json">
          [
            {
              "caf": "Институт системного анализа и управления",
              "courses": [
                {
                  "course": "1",
                  "groups": [{ "group": "1011" }, { "group": "1012" }]
                },
                {
                  "course": "2",
                  "groups": [{ "group": "2011" }, { "group": "2012" }]
                },
                {
                  "course": "3",
                  "groups": [{ "group": "3011" }, { "group": "3012" }]
                },
                {
                  "course": "4",
                  "groups": [{ "group": "4011" }, { "group": "4012" }]
                },
                {
                  "course": "5",
                  "groups": [{ "group": "5011" }, { "group": "5012" }]
                }
              ]
            }
          ]
        </pre>
        <p>/api/teachers</p>
        <p>Возвращает список преподавателей</p>
        <pre class="prettyprint lang-json">
          [
            { "ID": "000000001", "Lecturer": "Абадеев Эдуард Матвеевич" },
            { "ID": "000000002", "Lecturer": "Авакова Татьяна Федоровна" },
            { "ID": "000000003", "Lecturer": "Авдеев Михаил Васильевич" },
            { "ID": "000000715", "Lecturer": "Авдеева Елена Сергеевна" },
            { "ID": "000000005", "Lecturer": "Аверкин Алексей Николаевич" },
            { "ID": "000000006", "Lecturer": "Авраменко Екатерина Владимировна" },
            { "ID": "000000008", "Lecturer": "Алейников Валерий Евгеньевич" }
          ]
        </pre>
        <p>/api/groups/2281</p>
        <p>Возвращает расписание заданной группы</p>
        <pre class="prettyprint lang-json">
          [
            { "Day": 1, "Lesson_ID": null, "Subject_Type": null, "full_lesson": null },
            {
              "Day": 2,
              "lessons": [
                {
                  "Day": 2,
                  "Lesson_ID": 2,
                  "Subject_Type": "Лекционные занятия",
                  "full_lesson": "1-120 МЛиТА Прогулова Татьяна Борисовна"
                },
                {
                  "Day": 2,
                  "Lesson_ID": 3,
                  "Subject_Type": "Семинарские занятия",
                  "full_lesson": "1-427 БД Рябов Никита Владимирович"
                },
                {
                  "Day": 2,
                  "Lesson_ID": 4,
                  "Subject_Type": "Семинарские занятия",
                  "full_lesson": "1-318 МЛиТА Прогулова Татьяна Борисовна"
                }
              ]
            }
          ]
        </pre>
        <p>/api/teachers/Токарева%20Надежда%20Александровна</p>
        <p>Возвращает расписание преподавателя</p>
        <pre class="prettyprint lang-json">
          [
            {
              "Day": 1,
              "Lesson": null,
              "Lecturer": null,
              "Subject_Type": null,
              "Groups": null
            },
            {
              "Day": 2,
              "lessons": [
                {
                  "Day": 2,
                  "Lesson": 3,
                  "Lecturer": "Токарева Надежда Александровна",
                  "Subject_Type": "Семинарские занятия",
                  "Groups": "1-414 ЧМ -  2251"
                }
              ]
            },
            {
              "Day": 3,
              "lessons": [
                {
                  "Day": 3,
                  "Lesson": 3,
                  "Lecturer": "Токарева Надежда Александровна",
                  "Subject_Type": "Семинарские занятия",
                  "Groups": "1-414 ЧМ -  2253"
                },
                {
                  "Day": 3,
                  "Lesson": 4,
                  "Lecturer": "Токарева Надежда Александровна",
                  "Subject_Type": "Семинарские занятия",
                  "Groups": "1-414 ЧМ -  2252"
                }
              ]
            }
          ]
        </pre>
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
