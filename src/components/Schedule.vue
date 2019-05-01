<template>
  <v-container>
    <v-card v-for="(lesson, i) in groupSchedule" :key="i">
      <v-list two-line subheader>
        <v-subheader>{{dayRu(lesson.Day)[0].ruName}}</v-subheader>

        <v-list-tile avatar v-for="(pair, i) in lesson.Pairs" :key="i">
          <v-list-tile-content>
            <v-list-tile-sub-title>{{lessons[pair.PairNumber-1].name}}</v-list-tile-sub-title>
            <v-list-tile-title
              v-bind:class="[pair.LessonType === 'СЕМ' ? 'sem' : 'lec']"
            >{{pair.Lesson}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Schedule',
  props: {
    groupSchedule: {},
  },
  data() {
    return {
      days: [
        { enName: 'Monday', ruName: 'Понедельник' },
        { enName: 'Tuesday', ruName: 'Вторник' },
        { enName: 'Wednesday', ruName: 'Среда' },
        { enName: 'Thursday', ruName: 'Четверг' },
        { enName: 'Friday', ruName: 'Пятница' },
        { enName: 'Saturday', ruName: 'Суббота' },
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
    dayRu(day) {
      let dayRu = this.days.filter(item => {
        return item.enName === day;
      });
      return dayRu;
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
</style>
