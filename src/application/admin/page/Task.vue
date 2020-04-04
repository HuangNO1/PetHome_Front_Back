<template>
  <div>
    <div>
      <ve-liquidfill :data="chartData"></ve-liquidfill>
    </div>
    <!-- 未完成的清單 -->
    <v-lazy
      v-model="unfinishIsActive"
      :options="{
        threshold: 1,
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
                  <th class="text-left">Username</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Type</th>
                  <th class="text-left">Gender</th>
                  <th class="text-left">Age</th>
                  <th class="text-left">Number</th>
                  <th class="text-left">Total</th>
                  <th class="text-left">Time</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in unfinishOrderData" :key="item.name">
                  <td>{{ item.username }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.age }}</td>
                  <td>{{ item.number }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.time }}</td>
                  <td><v-icon>mdi-delete</v-icon></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-lazy>
    <!-- 已經完成的清單 -->
    <v-lazy
      v-model="finishIsActive"
      :options="{
        threshold: 1,
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
                  <th class="text-left">Username</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Type</th>
                  <th class="text-left">Gender</th>
                  <th class="text-left">Age</th>
                  <th class="text-left">Number</th>
                  <th class="text-left">Total</th>
                  <th class="text-left">Time</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in finishOrderData" :key="item.name">
                  <td>{{ item.username }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.age }}</td>
                  <td>{{ item.number }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.time }}</td>
                  <td><v-icon>mdi-delete</v-icon></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-lazy>
    <v-lazy
      v-model="cancelIsActive"
      :options="{
        threshold: 1,
      }"
      transition="slide-x-reverse-transition"
      origin="top right 50"
    >
      <v-card class="mt-10 mb-10 mr-4 ml-4 mx-auto" elevation="8">
        <v-sheet
          class="v-sheet--offset"
          color="error"
          elevation="8"
          width="120"
          height="50"
          dark
        >
          CANCEL
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
                  <th class="text-left">Username</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Type</th>
                  <th class="text-left">Gender</th>
                  <th class="text-left">Age</th>
                  <th class="text-left">Number</th>
                  <th class="text-left">Total</th>
                  <th class="text-left">Time</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cancelOrderData" :key="item.name">
                  <td>{{ item.username }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.age }}</td>
                  <td>{{ item.number }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.time }}</td>
                  <td><v-icon>mdi-delete</v-icon></td>
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
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {},
  data() {
    return {
      unfinishIsActive: false,
      finishIsActive: false,
      cancelIsActive: false,
      chartData: {
        columns: ["task", "percent"],
        rows: [
          {
            task: "Finished",
            percent: 0,
          },
        ],
      },
      unfinishOrderData: [],
      finishOrderData: [],
      cancelOrderData: [],
    };
  },
  created() {
    // 初始化數據
    this.unfinishOrderData = this.order.filter((e) => {
      return e.status === 0;
    });
    this.finishOrderData = this.order.filter((e) => {
      return e.status === 1;
    });
    this.cancelOrderData = this.order.filter((e) => {
      return e.status === 2;
    });
    // 初始化水球圖
    var finishOrderDataPersent = (
      parseFloat(this.finishOrderData.length) / parseFloat(this.order.length)
    ).toFixed(2);
    this.chartData.rows[0].percent = finishOrderDataPersent;
    console.log(finishOrderDataPersent);
  },
  methods: {},
  computed: {
    ...mapState({
      order: (state) => {
        return state.order.order;
      },
    }),
    finishPersentage() {
      return (
        parseFloat(this.finishOrderData.length) / parseFloat(this.order.length)
      ).toFixed(2);
    },
  },
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
