<template>
  <div class="about">
<!-- <v-date-picker
  mode='range'
  v-model='selectedDate'
  show-caps>
</v-date-picker> -->
    <section>
      <h1>Список студентов группы 4221</h1>
      <input id="one" type="checkbox">
      <label for="one">
        <span></span>
       Точенова Алена Витальевна
        <ins>
          <i>Точенова Алена Витальевна</i>
        </ins>
      </label>

      <input id="two" type="checkbox">
      <label for="two">
        <span></span>
        Рзаев Николай Романович
        <ins>
          <i>Рзаев Николай Романович</i>
        </ins>
      </label>

      <input id="three" type="checkbox">
      <label for="three">
        <span></span>
        Тепляшина Дарья Сергеевна
        <ins>
          <i>Тепляшина Дарья Сергеевна</i>
        </ins>
      </label>

      <input id="four" type="checkbox">
      <label for="four">
        <span></span>
        Игнатьева Екатерина Владимировна
        <ins>
          <i>Игнатьева Екатерина Владимировна</i>
        </ins>
      </label>
      
      <input id="four3" type="checkbox">
      <label for="four3">
        <span></span>
       Артюшов Андрей Геннадьевич
        <ins>
          <i>Артюшов Андрей Геннадьевич</i>
        </ins>
      </label>
       <input id="four2" type="checkbox">
      <label for="four2">
        <span></span>
        Горбулина Виктория Сергеевна
        <ins>
          <i>Горбулина Виктория Сергеевна</i>
        </ins>
      </label>
          <input id="four1" type="checkbox">
      <label for="four1">
        <span></span>
        Зайцев Александр Алексеевич
        <ins>
          <i>Зайцев Александр Алексеевич</i>
        </ins>
      </label>
      <router-link to="/success">
      <button class="button button1"  >Сохранить</button></router-link>
    </section>

    <!-- <div id="datepicker"></div> -->
  </div>
</template>
<style>
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
  top: 0.6em;
  left: 0.2em;
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
export default {
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>