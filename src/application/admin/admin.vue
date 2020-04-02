<template>
  <v-app>
    <vue-scroll-progress-bar height="3px" />
    <v-navigation-drawer
      dark
      v-model="drawer"
      :color="primary"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <!-- -->
      <v-list nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar @click="toIntroduct">
            <img src="../../assets/icons/admin.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Pet Home</v-list-item-title>
            <v-list-item-subtitle>Best Store</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- 側邊欄 -->
        <v-list-item
          v-if="!loginSuccess"
          v-for="item in adminItems"
          :key="item.title"
          :to="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
      <v-app-bar-nav-icon @click="miniMenu"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      // 判斷側邊欄是否能見
      drawer: true,
      // 側邊欄 items
      adminItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Notify", icon: "mdi-bell" },
        { title: "Task", icon: "mdi-calendar-multiple-check" },
        { title: "Edit", icon: "mdi-grease-pencil" },
        { title: "About", icon: "mdi-forum" }
      ],
      miniVariant: false
    };
  },
  methods: {
    toIntroduct() {
      document.location.href = "/introduce";
    },
    miniMenu() {
      // open menu
      if (this.menuIsClose === true) {
        console.log("enter open");
        this.miniVariant = false;
        this.drawer = true;
        this.menuIsClose = false;
      } else {
        // close menu
        console.log("enter close");
        if (this.drawer === true) {
          this.miniVariant = true;
          // can't mini variant
          if (this.miniVariant === false) {
            // just close menu
            this.drawer = false;
          } else {
            this.drawer = true;
          }
          this.menuIsClose = true;
        } else {
          // menu is close, open it.
          this.miniVariant = false;
          this.drawer = true;
          this.menuIsClose = false;
        }
      }
      console.log("draw - " + this.drawer);
      console.log("miniVariant - " + this.miniVariant);
    }
  },
  computed: {}
};
</script>
