<template>
  <v-app ref="contentStyle">
    <vue-scroll-progress-bar @complete="handleComplete" height="3px" />
    <v-navigation-drawer
      v-model="drawer"
      :color="this.$store.state.theme.navTheme"
      :mini-variant="miniVariant"
      :src="this.$store.state.theme.navImage"
      fixed
      app
    >
      <v-list nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="../../assets/icons/work.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Pet Home</v-list-item-title>
            <v-list-item-subtitle>Best Store</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item
          v-for="item in items"
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
      <v-spacer></v-spacer>
      <v-app-bar-title
        ><v-avatar size="36" style="margin-right: 1rem;">
          <img alt="Avatar" src="../../assets/icons/work.png" /> </v-avatar
        >Pet Home</v-app-bar-title
      >
      <v-spacer></v-spacer>

      <v-menu
        transition="slide-x-reverse-transition"
        offset-y="true"
        open-on-hover="true"
        bottom
        left
      >
        <template v-slot:activator="{ on }">
          <span class="ml-2" v-on="on">Hi, {{ username }}!</span>
          <v-card
            class="portrait"
            img="../../assets/icons/webapp/android-touch-icon.png"
            height="36"
            width="36"
            v-on="on"
          >
            <img
              style="height: 36px; width: 36px;"
              src="../../assets/icons/webapp/android-touch-icon.png"
            />
          </v-card>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in menuItem" :key="i" :to="item.url">
            <v-list-item-title
              ><v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item>
          <v-divider></v-divider>
          <!-- Sign Out-->
          <v-list-item @click.stop="signOutDialog = true">
            <v-list-item-title class="red--text">
              <v-icon color="red">mdi-arrow-right-bold-circle</v-icon>
              Sign Out
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-switch
              v-model="$vuetify.theme.dark"
              hide-details
              inset
              label="DARK"
            ></v-switch>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- comfirm Sign Out Dialog-->
    <v-dialog v-model="signOutDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline red white--text lighten-2" primary-title>
          <p>WARRING</p>
        </v-card-title>

        <v-card-text class="white title black--text" style="padding: 1rem;">
          Are you sure you want to sign out?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="white">
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="signOut">
            <span>Sure</span>
          </v-btn>
          <v-btn color="primary" text @click="signOutDialog = false">
            <span>Cancel</span>
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
const data = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : {
      todo: []
    };

// import HelloWorld from "./components/HelloWorld";
import { mapState, mapMutations } from "vuex";
import { UPDATE_NAV_THEME } from "./store/mutations-types/theme";

export default {
  name: "App",

  components: {},
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    }
  },

  data: vm => ({
    initialDark: vm.$vuetify ? vm.$vuetify.theme.dark : false
  }),

  beforeDestroy() {
    if (!this.$vuetify) return;

    this.$vuetify.theme.dark = this.initialDark;
  },
  created() {
    if (this.navTheme === "") {
      this.$store.commit(UPDATE_NAV_THEME, "teal");
    }
    // document.location.href = "/work#/Home";
    if (document.location.href === "/work#/") {
      document.location.href = "/work#/Home";
    }
  },
  data: () => ({
    //
    username: "Rem",
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "Cart", icon: "mdi-cart" },
      { title: "Record", icon: "mdi-google-spreadsheet" },
      { title: "User", icon: "mdi-account" },
      { title: "Setting", icon: "mdi-cogs" },
      { title: "About", icon: "mdi-forum" }
    ],
    right: true,
    miniVariant: false,
    background: false,
    menuIsClose: false,
    menuItem: [
      { title: "Account", icon: "mdi-account", url: "User" },
      { title: "Cart", icon: "mdi-cart", url: "Cart" },
      { title: "Setting", icon: "mdi-cogs", url: "Setting" }
    ],
    signOutDialog: false
  }),
  methods: {
    miniMenu() {
      const contentWidth = this.$refs.contentStyle.$el.clientWidth;
      console.log("contentWidth: " + contentWidth);
      console.log(
        "click Menu => " +
          "miniVariant: " +
          this.miniVariant +
          ", drawer: " +
          this.drawer +
          ", menuIsClose: " +
          this.menuIsClose
      );
      // open menu
      if (this.menuIsClose === true) {
        console.log("enter open");
        this.miniVariant = false;
        this.drawer = true;
        this.menuIsClose = false;
        console.log(
          "open Menu 1=> " +
            "miniVariant: " +
            this.miniVariant +
            ", drawer: " +
            this.drawer +
            ", menuIsClose: " +
            this.menuIsClose
        );
      } else {
        // close menu
        console.log("enter close");
        if (this.drawer === true) {
          this.miniVariant = true;
          // can't mini variant
          console.log(
            "close Menu 1=> " +
              "miniVariant: " +
              this.miniVariant +
              ", drawer: " +
              this.drawer +
              ", menuIsClose: " +
              this.menuIsClose
          );
          if (this.miniVariant === false) {
            // just close menu
            this.drawer = false;
            console.log(
              "close Menu 2=> " +
                "miniVariant: " +
                this.miniVariant +
                ", drawer: " +
                this.drawer +
                ", menuIsClose: " +
                this.menuIsClose
            );
          } else {
            this.drawer = true;
            console.log(
              "close Menu 3=> " +
                "miniVariant: " +
                this.miniVariant +
                ", drawer: " +
                this.drawer +
                ", menuIsClose: " +
                this.menuIsClose
            );
          }
          this.menuIsClose = true;
        } else {
          // menu is close, open it.
          this.miniVariant = false;
          this.drawer = true;
          this.menuIsClose = false;
          console.log(
            "open Menu 2=> " +
              "miniVariant: " +
              this.miniVariant +
              ", drawer: " +
              this.drawer +
              ", menuIsClose: " +
              this.menuIsClose
          );
        }
      }
      console.log("draw - " + this.drawer);
      console.log("miniVariant - " + this.miniVariant);
    },
    signOut() {
      document.location.href = "/introduce";
    }
  },
  computed: {
    ...mapState({
      navTheme: state => {
        return state.theme.navTheme;
      }
    })
  }
};
</script>
