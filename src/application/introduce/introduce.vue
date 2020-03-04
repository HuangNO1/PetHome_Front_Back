<template>
  <v-app>
    <v-app-bar class="indigo" app>
      <!-- -->
      <v-avatar @click="Sign" class="icon" size="108">
        <img
          alt="Avatar"
          src="../../assets/icons/webapp/apple-touch-icon-152x152.png"
        />
      </v-avatar>
      <span class="display-1 white--text" style="margin-left: 5rem;"
        >Pet Home</span
      >
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content
      style="display: flex; text-align: center;"
      class="indigo"
      padless="true"
    >
      <!-- Provides the application the proper gutter -->
      <v-carousel
        cycle
        height="100%"
        interval="3000"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(slide, i) in slides" :src="slide.src" :key="i">
          <div class="display-3 white--text descriptText">
            <strong>{{ slide.descript }}</strong>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-content>

    <v-footer fixed="true" padless="true" app>
      <v-card flat tile width="100%" class="indigo lighten-1 text-center">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          <v-avatar size="36" style="margin-right: 1rem;">
            <img
              alt="Avatar"
              src="../../assets/icons/webapp/apple-touch-icon-152x152.png"
            />
          </v-avatar>
          {{ new Date().getFullYear() }} — <strong>Pet Home</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {},

  data: () => ({
    colors: [
      "indigo",
      "warning",
      "pink darken-2",
      "red lighten-1",
      "deep-purple accent-4"
    ],
    slides: [
      {
        src: require("../../assets/carousel/bird_fix.png"),
        descript: "Pet Home is the best pet store"
      },
      {
        src: require("../../assets/carousel/cat_fix.png"),
        descript: "We value the mind and body of animals"
      },
      {
        src: require("../../assets/carousel/dog_fix.png"),
        descript: "We only provide high quality services"
      },
      {
        src: require("../../assets/carousel/fish_fix.png"),
        descript: "Observe credit to customers"
      },
      {
        src: require("../../assets/carousel/fox_fix.png"),
        descript: "Pet Home are your best choice"
      }
    ],
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"]
  }),
  methods: {
    Sign() {
      document.location.href = "/sign#/Login";
    }
  },
  computed: {}
};
</script>
<style>
.icon {
  display: absolute;
  top: 3rem;
  left: 3rem;
}

.descriptText {
  margin-top: 20%;
  text-stroke: 1px #008cff;
  text-shadow: black 0.1em 0.1em 0.2em;
}
</style>
