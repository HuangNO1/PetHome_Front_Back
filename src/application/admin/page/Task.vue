<template>
  <div>
    <div>
      <ve-liquidfill :data="chartData"></ve-liquidfill>
    </div>
    <v-lazy
      v-model="unfinishIsActive"
      :options="{
        threshold: 1
      }"
      transition="slide-x-reverse-transition"
      origin="top right 50"
    >
      <v-card class="mt-10 mb-10 mr-4 ml-4 mx-auto" elevation="8">
        <v-sheet
          class="v-sheet--offset"
          color="warning"
          elevation="8"
          width="120"
          height="50"
          dark
        >
          UNFINISHED
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">Website Views</div>
          <div class="subheading font-weight-light grey--text">
            Year
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="mr-2" small>
            mdi-clock
          </v-icon>
          <span class="caption grey--text font-weight-light"
            >last registration 26 minutes ago</span
          >
        </v-card-text>
      </v-card>
    </v-lazy>
    <v-lazy
      v-model="unfinishIsActive"
      :options="{
        threshold: 1
      }"
      transition="slide-x-reverse-transition"
      origin="top right 50"
    >
      <v-card class="mt-10 mb-10 mr-4 ml-4 mx-auto" elevation="8">
        <v-sheet
          class="v-sheet--offset"
          color="success"
          elevation="8"
          width="120"
          height="50"
          dark
        >
          FINISHED
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">Website Views</div>
          <div class="subheading font-weight-light grey--text">
            Year
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="mr-2" small>
            mdi-clock
          </v-icon>
          <span class="caption grey--text font-weight-light"
            >last registration 26 minutes ago</span
          >
        </v-card-text>
      </v-card>
    </v-lazy>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      unfinishIsActive: false,
      chartData: {
        columns: ["task", "percent"],
        rows: [
          {
            task: "Finished",
            percent: 0.6
          }
        ]
      }
    };
  },
  methods: {},
  computed: {}
};
</script>
