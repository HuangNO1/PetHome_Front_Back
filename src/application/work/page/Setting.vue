<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="12">
        <v-select
          v-model="color"
          :items="colors"
          label="Color"
          @change="updateTheme"
        ></v-select>
      </v-col>

      <v-switch
        v-model="background"
        class="ma-2"
        label="Background"
        @change="bg"
      ></v-switch>
    </v-row>
    <h1>{{ navTheme }}</h1>
    <h1>{{ navImage }}</h1>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import {
  UPDATE_NAV_THEME,
  UPDATE_NAV_IMAGE
} from "../store/mutations-types/theme";

export default {
  created() {
    if (this.navTheme === "") {
      this.$store.commit(UPDATE_NAV_THEME, this.color);
    } else {
      this.color = this.navTheme;
    }
    if (this.background !== "") {
      this.background = true;
      this.$store.commit(UPDATE_NAV_THEME, "primary");
    }
  },
  data() {
    return {
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      background: false
    };
  },
  methods: {
    // ...mapMutations(["updateTheme"]),
    updateTheme() {
      console.log("change theme: " + this.color);
      this.$store.commit(UPDATE_NAV_THEME, this.color);
    },
    bg() {
      console.log(image);
      console.log(this.background);
      let image = this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
      console.log(image);
      this.$store.commit(UPDATE_NAV_IMAGE, image);
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      navTheme: state => {
        return state.theme.navTheme;
      },
      navImage: state => {
        return state.theme.navImage;
      }
    })
  }
};
</script>
