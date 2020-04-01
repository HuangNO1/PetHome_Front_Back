<template>
  <div>
    <v-row>
      <v-col></v-col>
      <v-col :xs="12" :sm="12" :md="8" :lg="10" :xl="10">
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-card elevation="16" class="mt-11">
            <v-card-title
              :class="this.$store.state.theme.navTheme"
              class="white--text"
            >
              Settings
            </v-card-title>
            <v-card-text style="padding: 4rem;">
              <v-card-title>
                Theme Colors
              </v-card-title>
              <v-row v-for="(i, iKey) in NavColors" :key="iKey" class="mb-3">
                <v-col v-for="(j, jKey) in i.colors" :key="jKey">
                  <v-chip
                    :color="j.color"
                    style="width: 8rem;"
                    @click="updateTheme(j.color)"
                    dark
                  >
                    {{ j.color }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-switch
                v-model="background"
                class="ma-2 mt-3"
                label="Background"
                inset
                @change="bg"
              ></v-switch>
              <v-text-field
                label="Background URL"
                v-model="backgroundURL"
                outlined
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-lazy>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top :timeout="3000">
      The Theme Have changed.
      <v-btn color="pink" icon fab @click="snackbar = false">
        <v-icon dark>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>
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
    // color
    if (this.navTheme === "") {
      this.$store.commit(UPDATE_NAV_THEME, "primary");
    } else {
      this.color = this.navTheme;
    }

    // image
    if (this.navImage !== "") {
      this.background = true;
      this.backgroundURL = this.navImage;
      console.log("backgroundURL : " + this.backgroundURL);
    } else {
      this.background = false;
      this.backgroundURL = "";
    }
  },
  data() {
    return {
      // 提示窗
      snackbar: false,
      //
      isActive: false,
      background: false,
      backgroundURL: "",
      // axios URL
      updateThemeColorURL: "",
      updateBackgroundImgURL: "",

      NavColors: [
        {
          colors: [
            { color: "red lighten-2" },
            { color: "red lighten-1" },
            { color: "red" },
            { color: "red darken-1" },
            { color: "red darken-2" }
          ]
        },
        {
          colors: [
            { color: "pink lighten-2" },
            { color: "pink lighten-1" },
            { color: "pink" },
            { color: "pink darken-1" },
            { color: "pink darken-2" }
          ]
        },
        {
          colors: [
            { color: "purple lighten-2" },
            { color: "purple lighten-1" },
            { color: "purple" },
            { color: "purple darken-1" },
            { color: "purple darken-2" }
          ]
        },
        {
          colors: [
            { color: "blue lighten-2" },
            { color: "blue lighten-1" },
            { color: "blue" },
            { color: "blue darken-1" },
            { color: "blue darken-2" }
          ]
        },
        {
          colors: [
            { color: "cyan lighten-2" },
            { color: "cyan lighten-1" },
            { color: "cyan" },
            { color: "cyan darken-1" },
            { color: "cyan darken-2" }
          ]
        },
        {
          colors: [
            { color: "teal lighten-2" },
            { color: "teal lighten-1" },
            { color: "teal" },
            { color: "teal darken-1" },
            { color: "teal darken-2" }
          ]
        },
        {
          colors: [
            { color: "green lighten-2" },
            { color: "green lighten-1" },
            { color: "green" },
            { color: "green darken-1" },
            { color: "green darken-2" }
          ]
        },
        {
          colors: [
            { color: "amber lighten-2" },
            { color: "amber lighten-1" },
            { color: "amber" },
            { color: "amber darken-1" },
            { color: "amber darken-2" }
          ]
        },
        {
          colors: [
            { color: "orange lighten-2" },
            { color: "orange lighten-1" },
            { color: "orange" },
            { color: "orange darken-1" },
            { color: "orange darken-2" }
          ]
        },
        {
          colors: [
            { color: "brown lighten-2" },
            { color: "brown lighten-1" },
            { color: "brown" },
            { color: "brown darken-1" },
            { color: "brown darken-2" }
          ]
        },

        {
          colors: [
            { color: "grey lighten-2" },
            { color: "grey lighten-1" },
            { color: "grey" },
            { color: "grey darken-1" },
            { color: "grey darken-2" }
          ]
        }
      ]
    };
  },
  methods: {
    // ...mapMutations(["updateTheme"]),
    updateTheme(color) {
      // 出現提示窗
      this.snackbar = true;
      console.log("change theme: " + color);
      this.$store.commit(UPDATE_NAV_THEME, color);
      // axios 更新主題
      // var params = new URLSearchParams();
      // params.append("themeColor", color);
      // params.append("email", this.email);
      // axios
      //   .post(this.updateThemeColorURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    bg() {
      console.log(this.background);
      let image = this.background
        ? /*"https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"*/
          // "https://pbs.twimg.com/media/ES0SKsrUUAAJOtE?format=jpg&name=medium"
          this.backgroundURL
        : undefined;
      console.log(image);
      if (image !== undefined) {
        // 出現提示窗
        this.snackbar = true;
      }
      this.$store.commit(UPDATE_NAV_IMAGE, image);
      // axios 更新 nav 圖片
      // var params = new URLSearchParams();
      // params.append("backgroundImg", image);
      // params.append("email", this.email);
      // axios
      //   .post(this.updateBackgroundImgURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
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
      },
      email: state => {
        return state.user.email;
      }
    })
  }
};
</script>
