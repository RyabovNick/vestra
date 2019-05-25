<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      disable-resize-watcher
      app
      width="240"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children && item.access"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in prepareChild(item.children)"
              :key="i"
            >
              <router-link class="v-list__tile" :to="child.link">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ child.text }}</v-list-tile-title>
                </v-list-tile-content>
              </router-link>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
            v-else-if="!item.children && item.access"
            :key="item.text"
          >
            <router-link class="v-list__tile" :to="item.link">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list-tile>
        </template>
        <template>
          <v-list-tile v-if="isAuthenticated" @click="logout()">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Выход</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary"
      dark
      app
      fixed
    >
      <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn icon large @click="$router.go(-1)">
          <v-icon title="Назад">arrow_back</v-icon>
        </v-btn>
        <router-link class="btn btn--flat btn--router head-name" to="/">
          <span class="hidden-sm-and-down">Vestra</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if="!isAuthenticated" class="toolbar__items">
        <router-link class="btn btn--flat btn--router enter-link" to="/login">
          <div class="btn__content">
            <span>Войти</span>
          </div>
        </router-link>
      </div>
      <div
        v-else
        v-for="(item, index) in toolbar"
        :key="index"
        class="toolbar__items"
      >
        <router-link class="btn btn--flat btn--router" :to="item.link">
          <div class="btn__content">
            <span class="hidden-sm-and-down">{{ item.text }}</span>
            <i aria-hidden="true" class="icon icon--right material-icons">
              {{
              item.icon
              }}
            </i>
          </div>
        </router-link>
      </div>
      <!-- <v-btn @click="logout" icon large>
        <v-icon title="Выход">exit_to_app</v-icon>
      </v-btn>-->
    </v-toolbar>
    <v-content>
      <v-container fluid></v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      dialog: false,
      drawer: false,
      // access означает нужно ли показывать пользователю эту страницу в меню
      items: [
        { icon: 'home', text: 'Главная', link: '/', access: true },
        {
          icon: 'perm_identity',
          text: 'Личный кабинет',
          link: '/personal',
          access: false,
        },
        {
          icon: 'message',
          text: 'Отправить сообщение',
          link: '/push',
          access: false,
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Расписание',
          access: true,
          model: false,
          children: [
            { text: 'Моё расписание', link: '/myschedule', access: false },
            {
              text: 'Расписание групп',
              link: '/schedule',
              access: true,
            },
            {
              text: 'Преподаватели',
              link: '/teachersschedule',
              access: true,
            },
          ],
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Абитуриентам',
          access: true,
          model: false,
          children: [
            { text: 'Все поданные заявки', link: '/abitur/all', access: true },
            {
              text: 'Найти себя',
              link: '/abitur/search',
              access: true,
            },
            {
              text: 'Проходной балл 2018',
              link: '/abitur/2018',
              access: true,
            },
          ],
        },
      ],
      toolbar: [{ icon: 'schedule', text: 'Расписание', link: '/personal' }],
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
  methods: {
    ...mapActions({
      userLogout: 'auth/logout',
    }),
    logout() {
      this.userLogout().then(() => {
        this.$router.push({ name: 'login' });
      });
    },
    // вернуть только доступные для пользователя ссылки
    prepareChild(childen) {
      return childen.filter(item => item.access === true);
    },
  },
  watch: {
    // мониторим изменение state isAuthenticated
    // меняем отображение меню
    isAuthenticated(newV, oldV) {
      this.items[1].access = newV;
      this.items[2].access = newV;
    },
  },
};
</script>
<style>
.btn {
  min-width: 3.2em;
  font-size: 16px;
}
.btn .icon--right {
  margin-left: 0px;
}
.head-name {
  text-decoration: none;
}
.enter-link {
  text-decoration: none;
  color: #ffffff;
  font-size: 1.4em;
  font-family: 'Consolas', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin-right: 15px;
}
.hidden-sm-and-down {
  color: #ffffff;
  font-size: 27px;
  font-family: 'Consolas', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin-right: 5px;
}
.list__tile a {
  color: inherit;
  text-decoration-line: inherit;
}
.v-list__tile a {
  padding: 0;
  text-decoration-line: inherit;
}
.application--wrap {
  min-height: 0;
}
.toolbar .content {
  padding: 0;
}
.v-toolbar__content {
  padding-left: 0px;
}
.toolbar__items a {
  color: #ffffff;
}
.btn__content i {
  vertical-align: bottom;
}
.container {
  padding: 0;
}
@media only screen and (min-width: 1170px) {
  .hidden-sm-and-down {
    display: inline-block;
  }
  .toolbar__items {
    margin-right: 2em;
  }
}
@media only screen and (min-width: 270px) {
  .v-toolbar__title .hidden-sm-and-down {
    display: initial !important;
  }
}
@media only screen and (max-width: 1170px) {
  .hidden-sm-and-down {
    display: none !important;
  }
  .toolbar__items {
    margin-right: 2em;
  }
}
.footer {
  position: relative;
  width: 100%;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
