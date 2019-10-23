<template>
  <div class="about">
    <!-- <v-date-picker
  mode='range'
  v-model='selectedDate'
  show-caps>
    </v-date-picker>-->
    <section>
      <h1>Список студентов</h1>

      <div v-for="item in people.peoples" :key="item.oneCcode">
        <input :id="item.oneCcode" type="checkbox" v-model="item.mark" />
        <label :for="item.oneCcode">
          <span></span>
          {{item.Fio}}
        </label>
      </div>

      <!-- <router-link to="/success"> -->

      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <div class="text-xs-center">
              <v-btn color="success" dark v-on:click="save" v-on="on" large>Сохранить</v-btn>
            </div>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>
            <v-card-text>Данные успешно сохранены</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">ОК</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!-- </router-link> -->
    </section>

    <!-- <div id="datepicker"></div> -->
  </div>
</template>

<style>
@media (max-width: 500px) {
  input[type='checkbox']:checked + label > span:before {
    content: '';
    position: absolute;
    top: 0.7em !important;
    left: 0.2em;
    border-right: 2px solid transparent !important;
    border-bottom: 2px solid transparent !important;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    -webkit-animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1)
      forwards;
    animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1) forwards;
    font-size: 18px;
  }
  label {
    font-size: 0.7em;
  }
}
.btn_green {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  width: 100%;
}
.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  width: 100%;
}

.button1 {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.about {
  display: flex;
  background: #fafafa;
  justify-content: center;
  align-items: center;
  font: 24px/1.4 'RobotoDraft', sans-serif;
}

section {
  display: flex;
  flex-direction: column;
  padding: 0.5em;
}

h1 {
  font-weight: 400;
  font-size: 1.2em;
  cursor: default;
  margin: 0 0 0.5em 0;
  color: #333;
}

input[type='checkbox'] {
  height: 0;
  width: 0;
}

input[type='checkbox'] + label {
  position: relative;
  display: flex;
  margin: 0.6em 0;
  align-items: center;
  color: #333;
  transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
}
input[type='checkbox'] + label > ins {
  position: absolute;
  display: block;
  bottom: 0;
  left: 2em;
  height: 0;
  width: 100%;
  overflow: hidden;
  text-decoration: none;
  transition: height 300ms cubic-bezier(0.4, 0, 0.23, 1);
}
input[type='checkbox'] + label > ins > i {
  position: absolute;
  bottom: 0;
  font-style: normal;
  color: #333b99;
}
input[type='checkbox'] + label > span {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
  width: 1em;
  height: 1em;
  background: transparent;
  border: 2px solid #9e9e9e;
  border-radius: 2px;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
}

input[type='checkbox'] + label:hover,
input[type='checkbox']:focus + label {
  color: #333;
}
input[type='checkbox'] + label:hover > span,
input[type='checkbox']:focus + label > span {
  background: rgba(255, 255, 255, 0.1);
}
input[type='checkbox']:checked + label > ins {
  height: 100%;
}

input[type='checkbox']:checked + label > span {
  border: 0.5em solid #cecece;
  animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);
}
input[type='checkbox']:checked + label > span:before {
  content: '';
  position: absolute;
  top: 0.71em;
  left: 0.23em;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  transform: rotate(45deg);
  transform-origin: 0% 100%;
  animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1) forwards;
}

@keyframes shrink-bounce {
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes checkbox-check {
  0% {
    width: 0;
    height: 0;
    border-color: #212121;
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  33% {
    width: 0.2em;
    height: 0;
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  100% {
    width: 0.2em;
    height: 0.5em;
    border-color: #212121;
    transform: translate3d(0, -0.5em, 0) rotate(45deg);
  }
}
</style>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

const marksService = process.env.VUE_APP_MARKS_SERVICE;
export default {
  methods: {
    allPeoples: function(group) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${marksService}attendance/getClassmates/${group}`)
          .then(({ data }) => {
            console.log('data: ', data);
            return data;
          })
          .catch(err => {
            return reject(err);
          });
      });
    },
  },

  data() {
    return {
      date: new Date(),
      people: [],
      id_lesson: null,
      dialog: false,
    };
  },
  mounted() {
    this.allPeoples(this.user.group);
  },
  methods: {
    allPeoples: function(group) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${marksService}attendance/getClassmates/${group}`)
          .then(({ data }) => {
            console.log('data: ', data);
            this.people = data;
            this.id_lesson = data.id_lesson;
          })
          .catch(err => {
            return reject(err);
          });
      });
    },
    save: function() {
      console.log('save called');
      //return new Promise((resolve, reject) => {
      axios
        .post(`${marksService}attendance/add`, {
          peoples: this.people.peoples,
          id_lesson: this.id_lesson,
        })
        .catch(err => {
          return reject(err);
        });
      //});
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/currentUser',
    }),
  },
};
</script>