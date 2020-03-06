<template>
  <v-app ref="contentStyle">
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :src="bg"
      absolute
      app
    >
      <v-list dense nav class="py-0">
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
          @click="changePage(item.title)"
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
      <v-app-bar-title>Pet Home</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-switch
        v-model="$vuetify.theme.dark"
        hide-details
        inset
        label="Theme Dark"
      ></v-switch>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <v-row justify="space-around">
          <v-col cols="12">
            <v-select v-model="color" :items="colors" label="Color"></v-select>
          </v-col>

          <v-switch v-model="drawer" class="ma-2" label="v-model"></v-switch>

          <v-switch
            v-model="miniVariant"
            class="ma-2"
            label="Mini variant"
          ></v-switch>

          <v-switch
            v-model="expandOnHover"
            class="ma-2"
            label="Expand on hover"
          ></v-switch>

          <v-switch
            v-model="background"
            class="ma-2"
            label="Background"
          ></v-switch>

          <v-switch v-model="right" class="ma-2" label="Right"></v-switch>
        </v-row>

        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {},
  beforeCreate: function() {
    const contentWidth = this.$refs.contentStyle.$el.clientWidth;
    console.log("contentWidth: " + contentWidth);
    if (contentWidth < 1264) {
      this.drawer = false;
    } else {
      this.drawer = true;
    }
  },
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

  data: () => ({
    //
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "Cart", icon: "mdi-cart" },
      { title: "Record", icon: "mdi-google-spreadsheet" },
      { title: "User", icon: "mdi-account" },
      { title: "Setting", icon: "mdi-cogs" },
      { title: "About", icon: "mdi-help-box" }
    ],
    color: "primary",
    colors: ["primary", "blue", "success", "red", "teal"],
    right: true,
    miniVariant: false,
    expandOnHover: false,
    background: false,
    menuIsClose: false
  }),
  methods: {
    changePage(page) {
      document.location.href = "/work#/" + page;
    },
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
    }
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  }
};
</script>
