<template>
  <div>
    <v-lazy
      v-model="waterChartIsActive"
      :options="{
        threshold: 1,
      }"
      transition="slide-x-reverse-transition"
      origin="top right 50"
    >
      <div>
        <ve-liquidfill :data="chartData"></ve-liquidfill>
      </div>
    </v-lazy>
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
            v-model="unfinishOrderDataSearch"
            append-icon="mdi-magnify"
            label="Search"
            filled
            single-line
          ></v-text-field>

          <v-data-table
            :height="400"
            :headers="orderHeaders"
            :items="unfinishOrderData"
            :search="unfinishOrderDataSearch"
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
                  <td><v-icon>mdi-delete</v-icon></td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
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
            v-model="finishOrderDataSearch"
            append-icon="mdi-magnify"
            label="Search"
            filled
            single-line
          ></v-text-field>

          <v-data-table
            :height="400"
            :headers="orderHeaders"
            :items="finishOrderData"
            :search="finishOrderDataSearch"
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
                  <td><v-icon>mdi-delete</v-icon></td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
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
            v-model="cancelOrderDataSearch"
            append-icon="mdi-magnify"
            label="Search"
            filled
            single-line
          ></v-text-field>

          <v-data-table
            :height="400"
            :headers="orderHeaders"
            :items="cancelOrderData"
            :search="cancelOrderDataSearch"
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
                  <td><v-icon>mdi-delete</v-icon></td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
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
      waterChartIsActive: false,
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
      orderHeaders: [
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
        { text: "Action", value: "action" },
      ],
      unfinishOrderData: [],
      finishOrderData: [],
      cancelOrderData: [],
      unfinishOrderDataSearch: "",
      finishOrderDataSearch: "",
      cancelOrderDataSearch: ""
    };
  },
  created() {
    // 初始化數據
    this.unfinishOrderData = this.order.filter((e) => {
      return e.status === 0 || e.status === "Processing";
    });
    this.finishOrderData = this.order.filter((e) => {
      return e.status === 1 || e.status === "Solved";
    });
    this.cancelOrderData = this.order.filter((e) => {
      return e.status === 2 || e.status === "Cancel";
    });
    // 初始化水球圖
    var finishOrderDataPersent = (
      parseFloat(this.finishOrderData.length + this.cancelOrderData.length) /
      parseFloat(this.order.length)
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
