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
            :headers="unfinshOrderHeaders"
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
                  <td>
                    <v-btn color="red" @click="editOrderDialog(index)" icon>
                      <v-icon>mdi-gesture-double-tap</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-lazy>

    <!-- 顯示未完成訂單操作的 Dialog -->
    <v-dialog v-model="orderActionDialog" width="500" persistent>
      <v-card>
        <v-card-title class="red lighten-1 white--text headline"
          >WARNING</v-card-title
        >

        <v-card-text class="mt-4 subtitle-1 red--text">
          Before you make this choice, please check whether this order has been
          processed or cancelled.
        </v-card-text>
        <v-card-text>
          <v-radio-group v-model="selectAction" row>
            <v-radio label="FINISHED" value="FINISHED" color="green"></v-radio>
            <v-radio label="CANCEL" value="CANCEL" color="red"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="orderActionDialog = false">
            Cancel
          </v-btn>

          <v-btn color="green darken-1" text @click="orderActionDialog = false">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
            :headers="finishOrderHeaders"
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
            :headers="finishOrderHeaders"
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
      // JS 緩加載效果
      waterChartIsActive: false,
      unfinishIsActive: false,
      finishIsActive: false,
      cancelIsActive: false,
      // 顯示未完成訂單操作的 Dialog
      orderActionDialog: false,
      selectAction: null,
      // 水球圖
      chartData: {
        columns: ["task", "percent"],
        rows: [
          {
            task: "Finished",
            percent: 0,
          },
        ],
      },
      // 未完成 Order 表頭
      unfinshOrderHeaders: [
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
        { text: "Action", value: "action" },
      ],
      // 已完成且已取消的 Order 表頭
      finishOrderHeaders: [
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
      ],
      // 訂單數據
      unfinishOrderData: [],
      finishOrderData: [],
      cancelOrderData: [],
      // 訂單搜索 String
      unfinishOrderDataSearch: "",
      finishOrderDataSearch: "",
      cancelOrderDataSearch: "",
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
  methods: {
    editOrderDialog(index) {
      this.orderActionDialog = true;
    },
  },
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
