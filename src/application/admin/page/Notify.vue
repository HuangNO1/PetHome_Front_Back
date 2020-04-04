<template>
  <div>
    <v-alert
      class="mt-10 mb-10 mr-4 ml-4 mx-auto"
      border="left"
      elevation="8"
      color="indigo"
      dark
    >
      You need to finish these orders.
    </v-alert>
    <v-lazy
      v-model="webViewIsActive"
      :options="{
        threshold: 1,
      }"
      transition="slide-x-reverse-transition"
      origin="top right 50"
    >
      <v-card class="mt-10 mb-10 mr-4 ml-4 mx-auto" elevation="8">
        <v-card
          class="v-sheet--offset"
          color="cyan"
          elevation="8"
          max-width="calc(100% - 32px)"
          dark
        >
          <v-card-text>
            <ve-pie :data="chartData" :colors="colors"></ve-pie>
          </v-card-text>
        </v-card>

        <v-card-text class="pt-0">
          <v-row>
            <v-col>
              <div class="p4" style=""></div>
              <div
                class="font-weight-light grey--text"
                style="text-align: center;"
              ></div>
            </v-col>
          </v-row>
          <div class="title font-weight-light mb-2">New Order Components</div>
          <div class="subheading font-weight-light grey--text"></div>
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
    <div>
      <v-card class="mt-10 mb-10 mr-4 ml-4 mx-auto" elevation="8">
        <v-card-title primary-title>
          New Order
        </v-card-title>
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
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    this.colors = [
      "#d30505",
      "#d35905",
      "#d0d305",
      "#0ba576",
      "#0588d3",
      "#9805d3",
      "#ca8622",
      "#bda29a",
      "#6e7074",
      "#546570",
      "#c4ccd3",
    ];
    return {
      chartData: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 },
        ],
      },
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  left: 16px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
