<template>
  <div>
    <div>
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 24 : 6" class="mb-10">
          <v-toolbar>
            <v-btn @click="goBack" icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>BACK</v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-hover>
    </div>
    <div>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 1
        }"
        transition="slide-x-reverse-transition"
        origin="top right 50"
      >
        <v-card>
          <v-card-title>XXXX</v-card-title>
          <v-card-text>
            <viewer
              :options="options"
              :images="images"
              @inited="inited"
              class="viewer"
              ref="viewer"
            >
              <template slot-scope="scope">
                <div style="display: flex; justify-content: center;">
                  <img
                    class="displayImg"
                    v-for="src in scope.images"
                    :src="src"
                    :key="src"
                  />
                </div>
              </template>
            </viewer>
          </v-card-text>
        </v-card>
        <v-card></v-card>
      </v-lazy>
    </div>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component";

export default {
  components: {
    Viewer
  },
  data() {
    return {
      isActive: false,
      images: [
        "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
        "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png"
      ]
    };
  },
  methods: {
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push("/Home");
    },
    inited(viewer) {
      this.$viewer = viewer;
    },
  }
};
</script>
<style>
.displayImg {
  max-height: 20rem;
}
</style>
