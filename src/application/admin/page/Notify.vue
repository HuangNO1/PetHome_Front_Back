<template>
  <div>
    <v-alert
      class="mt-10 mb-10 mr-4 ml-4 mx-auto"
      border="left"
      elevation="8"
      color="indigo"
      dark
    >
      There are your new order.
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

          <v-data-table
            :height="400"
            :headers="newOrderHeaders"
            :items="newOrderData"
            :search="search"
            fixed-header
            hide-default-footer
            class="elevation-1"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.username }}</td>
                  <td>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="success"
                          v-on="on"
                        >
                          <v-icon>mdi-camera-image</v-icon>
                        </v-btn>
                      </template>
                      <span>
                        <v-avatar tile size="130">
                          <img :src="item.img" />
                        </v-avatar>
                      </span>
                    </v-tooltip>
                    {{ item.name }}
                  </td>
                  <td>{{ item.type }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.age }}</td>
                  <td>{{ item.number }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ (item.total = item.price * item.number) }}</td>
                  <td>{{ item.time }}</td>
                  <td>{{ item.status }}</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

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
      webViewIsActive: false,
      search: "",
      chartData: {
        columns: ["Type", "Orders"],
        rows: [
          { Type: "Dog", Orders: 0 },
          { Type: "Cat", Orders: 0 },
          { Type: "Fox", Orders: 0 },
          { Type: "Fish", Orders: 0 },
          { Type: "Bird", Orders: 0 },
        ],
      },
      newOrderHeaders: [
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "username",
        },
        {
          text: "Name",
          sortable: false,
          value: "name",
        },
        { text: "Type", value: "type" },
        { text: "Gander", value: "gender" },
        { text: "Age", value: "age" },
        { text: "Price($)", value: "price" },
        { text: "Number", value: "number" },
        { text: "Total($)", value: "total" },
        { text: "Time(UTF-8)", value: "time" },
        { text: "Status", value: "status" },
      ],
      newOrderData: [],
      showNewOrder: [],
    };
  },
  created() {
    // 引入訂單數據
    let newOrder = this.order;
    this.newOrderData = newOrder;
    for (let i = 0; i < this.newOrderData.length; i++) {
      let temp = this.newOrderData[i].status;
      if (temp === 0 || temp === "Processing") {
        this.newOrderData[i].status = "Processing";
      } else if (temp === 1 || temp === "Solved") {
        this.newOrderData[i].status = "Solved";
      } else {
        this.newOrderData[i].status = "Cancel";
      }
    }
    this.showNewOrder = this.newOrderData;

    // 計算TYPE訂單種類，顯示 Chart
    for (let i = 0; i < this.newOrderData.length; i++) {
      switch(this.newOrderData[i].type) {
        case "Dog":
          this.chartData.rows[0].Orders += 1;
        case "Cat":
          this.chartData.rows[1].Orders += 1;
        case "Fox":
          this.chartData.rows[2].Orders += 1;
        case "Fish":
          this.chartData.rows[3].Orders += 1;
        case "Bird":
          this.chartData.rows[4].Orders += 1;
      }
    }

  },
  methods: {},
  computed: {
    ...mapState({
      order: (state) => {
        return state.order.order;
      },
    }),
    searchNewOrder() {
      this.showNewOrder = this.newOrderData.filter((e) => {
        return (
          e.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          e.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          e.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
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
