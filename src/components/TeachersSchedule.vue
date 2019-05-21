<template>
  <v-container>
    <v-card v-for="(lesson, i) in schedule" :key="i">
      <v-list v-if="lesson.Lesson === null" two-line subheader>
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
              lessons[pair.Lesson - 1].name
              }}
            </v-list-tile-sub-title>
            <!-- занятия на каждой неделе -->
            <v-list-tile-content
              v-if="pair.dif_weeks == 0"
              v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
            >
              {{ pair.Cab_fw }} {{ pair.Subject_fw }} -
              <router-link
                class="group-link"
                v-for="(group, i) in pair.Groups_short_fw.replace(' ', '').split(', ')"
                :key="i"
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'group', params: {group: group} }"
              >
                <span
                  v-if="i === pair.Groups_short_fw.replace(' ', '').split(', ').length - 1"
                >{{ group }}</span>
                <span v-else>{{ group }},&nbsp;</span>
              </router-link>
            </v-list-tile-content>
            <!-- занятия через неделю, нет на нечётной -->
            <v-list-tile-content
              v-if="pair.dif_weeks == 1 && pair.Subject_fw == null"
              v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
            >
              / {{ pair.Cab_sw }} {{ pair.Subject_sw }} -
              <router-link
                class="group-link"
                v-for="(group, i) in pair.Groups_short_sw.replace(' ', '').split(', ')"
                :key="i"
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'group', params: {group: group} }"
              >
                <span
                  v-if="i === pair.Groups_short_sw.replace(' ', '').split(', ').length - 1"
                >{{ group }}</span>
                <span v-else>{{ group }},&nbsp;</span>
              </router-link>
            </v-list-tile-content>
            <!-- Занятия через неделю, нет на чётной -->
            <v-list-tile-content
              v-if="pair.dif_weeks == 1 && pair.Subject_sw == null"
              v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
            >
              {{ pair.Cab_fw }} {{ pair.Subject_fw }} -
              <router-link
                class="group-link"
                v-for="(group, i) in pair.Groups_short_fw.replace(' ', '').split(', ')"
                :key="i"
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'group', params: {group: group} }"
              >
                <span
                  v-if="i === pair.Groups_short_fw.replace(' ', '').split(', ').length - 1"
                >{{ group }}</span>
                <span v-else>{{ group }},&nbsp;</span>
              </router-link>&nbsp;/
            </v-list-tile-content>
            <!-- Разные занятия на каждой неделе -->
            <v-list-tile-content
              v-if="pair.dif_weeks == 1 && pair.Subject_sw != null && pair.Subject_fw != null"
              v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
            >
              {{ pair.Cab_fw }} {{ pair.Subject_fw }} -
              <router-link
                class="group-link"
                v-for="(group, i) in pair.Groups_short_fw.replace(' ', '').split(', ')"
                :key="i"
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'group', params: {group: group} }"
              >
                <span
                  v-if="i === pair.Groups_short_fw.replace(' ', '').split(', ').length - 1"
                >{{ group }}</span>
                <span v-else>{{ group }},&nbsp;</span>
              </router-link>
              &nbsp;/&nbsp;
              {{ pair.Cab_sw }} {{ pair.Subject_sw }} -
              <router-link
                class="group-link"
                v-for="(group, i) in pair.Groups_short_sw.replace(' ', '').split(', ')"
                :key="i"
                v-bind:class="[
                pair.Subject_Type === 'Семинарские занятия' ? 'sem' : 'lec',
              ]"
                :to="{ name: 'group', params: {group: group} }"
              >
                <span
                  v-if="i === pair.Groups_short_sw.replace(' ', '').split(', ').length - 1"
                >{{ group }}</span>
                <span v-else>{{ group }},&nbsp;</span>
              </router-link>
            </v-list-tile-content>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'TeachersSchedule',
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

.group-link {
  display: contents;
}

.group-link span {
  display: contents;
}
</style>
