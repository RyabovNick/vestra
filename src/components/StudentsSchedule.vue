<template>
  <v-container>
    <v-card v-for="(lesson, i) in schedule" :key="i">
      <v-list v-if="lesson.Lesson_ID === null" two-line subheader>
        <v-subheader>{{ days[lesson.Day - 1] }}</v-subheader>

        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>Выходной</v-list-tile-sub-title>
            <v-list-tile-title>Занятий нет</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-else two-line subheader>
        <v-subheader>{{ days[lesson.Day - 1] }}</v-subheader>

        <v-list-tile avatar v-for="(pair, i) in lesson.lessons" :key="i">
          <v-list-tile-content>
            <v-list-tile-sub-title>
              {{
              lessons[pair.Lesson_ID - 1].name
              }}
            </v-list-tile-sub-title>
            <!--  -->
            <v-list-tile-content
              v-if="pair.dif_weeks == 1 && pair.lecturer_fw != null && pair.lecturer_sw != null"
              v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
            >
              {{ pair.cab_fw }} {{ pair.subject_fw }}
              <router-link
                class="teacher-link"
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'teacher', params: {fio: pair.lecturer_fw} }"
              >{{ fioChanger(pair.lecturer_fw) }}</router-link>
              &nbsp;/&nbsp;
              {{ pair.cab_sw }} {{ pair.subject_sw }}
              <router-link
                class="teacher-link"
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'teacher', params: {fio: pair.lecturer_sw} }"
              >{{ fioChanger(pair.lecturer_sw) }}</router-link>
            </v-list-tile-content>
            <v-list-tile-content v-else>
              <router-link
                class="teacher-link"
                v-if="pair.lecturer_fw == null"
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'teacher', params: {fio: pair.lecturer_sw} }"
              >
                /&nbsp;{{ pair.cab_sw }}&nbsp;
                {{ pair.subject_sw}}&nbsp;{{ fioChanger(pair.lecturer_sw) }}
              </router-link>
              <router-link
                class="teacher-link"
                v-else-if="pair.lecturer_sw == null"
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'teacher', params: {fio: pair.lecturer_fw} }"
              >
                {{ pair.cab_fw }}&nbsp;{{ pair.subject_fw}}
                {{ fioChanger(pair.lecturer_fw) }}&nbsp;/
              </router-link>
              <router-link
                class="teacher-link"
                v-else
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'teacher', params: {fio: pair.lecturer_fw} }"
              >{{ pair.cab_fw }}&nbsp;{{ pair.subject_fw}}&nbsp;{{ fioChanger(pair.lecturer_fw) }}</router-link>
            </v-list-tile-content>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'StudentsSchedule',
  props: {
    schedule: {},
  },
  data() {
    return {
      days: [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
      ],
      lessons: [
        {
          id: 1,
          name: '1 пара, 9:00 - 10:30',
        },
        {
          id: 2,
          name: '2 пара, 10:40 - 12:10',
        },
        {
          id: 3,
          name: '3 пара, 12:50 - 14:20',
        },
        {
          id: 4,
          name: '4 пара, 14:30 - 16:00',
        },
        {
          id: 5,
          name: '5 пара, 16:10 - 17:40',
        },
        {
          id: 6,
          name: '6 пара, 17:50 - 19:20',
        },
      ],
    };
  },
  methods: {
    /**
     * Преобразует Петрова Ирина Федоровна
     * В Петрова И. Ф.
     */
    fioChanger(fio) {
      if (fio === 'Преподаватель университета') return '';
      // для преподов а-ля Буланов С.В.
      try {
        fio = fio.replace('.', ' ');

        const surnameRegExp = new RegExp('[а-яА-Я]+', 'g');
        const ioRegExp = new RegExp(' ([А-Я])', 'g');

        const surname = surnameRegExp.exec(fio);
        const io = fio.match(ioRegExp);
        const newFio = `${surname}${io[0]}.${io[1]}.`;
        return newFio;
      } catch (err) {
        return fio;
      }
    },
  },
};
</script>

<style scoped>
.v-subheader {
  justify-content: center;
  font-size: 1.25em;
}

.sem {
  color: black;
}

.lec {
  color: #dc7d43;
}

.v-sheet {
  border-radius: 20px;
}

.v-card {
  box-shadow: 5px 5px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  text-decoration: none;
  margin-bottom: 5px;
}

.teacher-link {
  display: contents;
}
</style>
