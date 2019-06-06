<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center>
      <v-flex mb-4 xs11 justify-center>
        <h1 class="display-2 font-weight-bold mb-3">Описание возможностей</h1>
        <h2 class="display-1 mb-3">Мобильная версия</h2>
        <p>При первом входе в приложение вам будет предложено добавить его на главный экран, т.е. добавить иконку приложения, оно будет работать точно также, как нативное.</p>
        <img class="mobile-img mb-3" src="/img/instruction/2.png">
        <p>Также приложение можно добавить на главный экран и через меню браузера (на примере Chrome)</p>
        <img class="mobile-img mb-3" src="/img/instruction/1.png">
        <img class="mobile-img mb-3" src="/img/instruction/4.png">
        <img class="mobile-img mb-3" src="/img/instruction/5.png">
        <p>После этого вы можете увидеть иконку приложения на главном экране вашего мобильного телефона</p>
        <img class="mobile-img mb-3" src="/img/instruction/6.png">
        <p>При успешной авторизации в приложении вам будет задан вопрос о разрешении на отправку уведомлений - разрешите, если хотите получать push-уведомления об изменении расписания, от преподавателей и о многом другом!</p>
        <img class="mobile-img mb-3" src="/img/instruction/3.png">
        <p>После успешного входа в приложение откроется страница с вашим расписанием.</p>
        <img class="mobile-img mb-3" src="/img/instruction/10.png">
        <p>Оранжевым обозначены лекционные занятия. Из расписани можно нажать на преподавателя и узнать информацию о нём</p>
        <img class="mobile-img mb-3" src="/img/instruction/11.png">
        <p>Из расписания преподавателя можно нажать на группу и узнать информацию о ней (направление, расписание, состав группы)</p>
        <img class="mobile-img mb-3" src="/img/instruction/12.png">
        <p>Если вы не включили уведомления при входе или наоборот хотите отключить, а также почистить закэшированные данные, то необходимо нажать на замочек</p>
        <img class="mobile-img mb-3" src="/img/instruction/14.png">
        <p>Затем "Настройки сайта"</p>
        <img class="mobile-img mb-3" src="/img/instruction/8.png">
        <p>И выполнить нужные вам действия</p>
        <img class="mobile-img mb-3" src="/img/instruction/9.png">
        <p>Если вы разрешили получение уведомлений, то иногда их будете получать (на скриншоте пример)</p>
        <img class="mobile-img mb-3" src="/img/instruction/13.png">
        <h2 class="display-1 mb-3">Браузерная версия</h2>
        <p>Приложением можно пользоваться не только с телефона, но и с компьютера. Можно также разрешить получение уведомлений</p>
        <img class="mobile-img mb-3" src="/img/instruction/pc1.png">
        <p>Уведомления будут выглядеть так (появляются в левом/правом нижнем углу экрана):</p>
        <img class="mobile-img mb-3" src="/img/instruction/pc2.png">
        <p>Вы также можете управлять разрешениями</p>
        <img class="mobile-img mb-3" src="/img/instruction/pc3.png">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.mobile-img {
  width: 400px;
  max-width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
