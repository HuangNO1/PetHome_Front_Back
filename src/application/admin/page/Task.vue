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
      <v-card class="mt-10 mb-12 mr-4 ml-4 mx-auto" elevation="8">
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
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            filled
            single-line
          ></v-text-field>
          <v-simple-table height="400px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            filled
            single-line
          ></v-text-field>
          <v-simple-table height="400px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
      },
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159
        },
        {
          name: "Ice cream sandwich",
          calories: 237
        },
        {
          name: "Eclair",
          calories: 262
        },
        {
          name: "Cupcake",
          calories: 305
        },
        {
          name: "Gingerbread",
          calories: 356
        },
        {
          name: "Jelly bean",
          calories: 375
        },
        {
          name: "Lollipop",
          calories: 392
        },
        {
          name: "Honeycomb",
          calories: 408
        },
        {
          name: "Donut",
          calories: 452
        },
        {
          name: "KitKat",
          calories: 518
        }
      ]
    };
  },
  methods: {},
  computed: {}
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  left: 13px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>