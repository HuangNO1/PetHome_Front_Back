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
            <!--<v-list-item-subtitle>Best Store</v-list-item-subtitle>-->
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
        <v-list-item @click.stop="signOutDialog = true">
          <v-list-item-icon>
            <v-icon class="red--text">mdi-door-open</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="red--text">Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
      <v-app-bar-nav-icon @click="miniMenu"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <v-badge
          bordered
          bottom
          color="success"
          dot
          offset-x="20"
          offset-y="10"
        >
          <v-avatar size="36" style="margin-right: 1rem;">
            <img
              alt="Avatar"
              src="https://avatars0.githubusercontent.com/u/48636976?s=460&v=4"
            />
          </v-avatar>
        </v-badge>
        Administrator
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- comfirm Sign Out Dialog-->
    <v-dialog v-model="signOutDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline red white--text lighten-1" primary-title>
          <p>WARRING</p>
        </v-card-title>

        <v-card-text class="title" style="padding: 1rem;">
          Are you sure you want to sign out?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="signOutDialog = false">
            <span>Cancel</span>
          </v-btn>
          <v-btn color="error" text @click="signOut">
            <span>Sure</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      signOutDialog: false,
      // 判斷側邊欄是否能見
      drawer: true,
      // 側邊欄 items
      adminItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Notify", icon: "mdi-bell" },
        { title: "Task", icon: "mdi-calendar-multiple-check" },
        { title: "Edit", icon: "mdi-grease-pencil" },
        { title: "Manage", icon: "mdi-account-cog" },
        { title: "About", icon: "mdi-forum" },
      ],
      miniVariant: false,
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
    },
    signOut() {
      // 刪除 cookie
      Cookies.remove("userID");
      Cookies.remove("userEmail");
      Cookies.remove("userUsername");
      Cookies.remove("userPhone");
      Cookies.remove("userCash");
      Cookies.remove("userDescription");
      Cookies.remove("userAddress");
      Cookies.remove("userBGColor");
      Cookies.remove("userBGUrl");
      Cookies.remove("userAvatar");
      Cookies.remove("userPower");
      Cookies.remove("userPassword");
      document.location.href = "/introduce";
    },
  },
  computed: {},
};
</script>
