<template>
  <div>
    <v-alert
      class="mt-10 mb-10 mr-4 ml-4 mx-auto"
      border="left"
      elevation="8"
      color="indigo"
      dark
    >
      There are your data charts here.
    </v-alert>
    <!-- 網站訪問量 -->
    <v-lazy
      v-model="webViewIsActive"
      :options="{
        threshold: 1
      }"
      transition="slide-x-reverse-transition"
      origin="top right 50"
    >
      <v-card class="mt-10 mb-10 mr-4 ml-4 mx-auto" elevation="8">
        <v-sheet
          class="v-sheet--offset"
          color="cyan"
          elevation="8"
          width="100"
          height="100"
        >
          <v-icon x-large>mdi-earth</v-icon>
        </v-sheet>

        <v-card-text class="pt-0">
          <v-row>
            <v-col>
              <div class="p4" style="">
                <ve-line :data="webViewChartData"></ve-line>
              </div>
              <div
                class="font-weight-light grey--text"
                style="text-align: center;"
              >
                Total {{ totalWebViews }}
              </div>
            </v-col>
          </v-row>
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
    <v-row>
      <v-col>
        <v-lazy
          v-model="saleIsActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <!-- sale 情況 -->
          <v-card class="mt-10 mr-4 ml-4 mx-auto" elevation="8">
            <v-sheet
              class="v-sheet--offset"
              color="success"
              elevation="8"
              width="100"
              height="100"
            >
              <v-icon x-large>mdi-poll</v-icon>
            </v-sheet>

            <v-card-text class="pt-0">
              <v-row>
                <v-col>
                  <div class="p4" style="">
                    <ve-histogram :data="saleChartData"></ve-histogram>
                  </div>
                  <div
                    class="font-weight-light grey--text"
                    style="text-align: center;"
                  >
                    Total {{ totalSale }}
                  </div>
                </v-col>
              </v-row>

              <div class="title font-weight-light mb-2">Daily Sales</div>
              <div class="subheading font-weight-light grey--text">
                Daily
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
      </v-col>
      <v-col>
        <v-lazy
          v-model="registerIsActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <!-- 使用者註冊情況 -->
          <v-card class="mt-10 mr-4 ml-4 mx-auto" elevation="8">
            <v-sheet
              class="v-sheet--offset"
              color="pink"
              elevation="8"
              width="100"
              height="100"
            >
              <v-icon x-large>mdi-account</v-icon>
            </v-sheet>

            <v-card-text class="pt-0">
              <v-row>
                <v-col>
                  <div class="p4" style="">
                    <ve-line :data="registerChartData"></ve-line>
                  </div>
                  <div
                    class="font-weight-light grey--text"
                    style="text-align: center;"
                  >
                    Total {{ totalRegister }}
                  </div>
                </v-col>
              </v-row>

              <div class="title font-weight-light mb-2">Registration</div>
              <div class="subheading font-weight-light grey--text">
                Hour
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
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      webViewIsActive: false,
      saleIsActive: false,
      registerIsActive: false,
      labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      value: [200, 675, 410, 390, 310, 460, 250, 240],
      webViewChartData: {
        columns: ["Month", "WebsiteViews"],
        rows: [
          { Month: "Ja", WebsiteViews: 1394 },
          { Month: "Fe", WebsiteViews: 4537 },
          { Month: "Ma", WebsiteViews: 2921 },
          { Month: "Ap", WebsiteViews: 1726 },
          { Month: "Mai", WebsiteViews: 3792 },
          { Month: "Ju", WebsiteViews: 4593 },
          { Month: "Jul", WebsiteViews: 4022 },
          { Month: "Au", WebsiteViews: 3511 },
          { Month: "Se", WebsiteViews: 7328 },
          { Month: "Oc", WebsiteViews: 6345 },
          { Month: "No", WebsiteViews: 5302 },
          { Month: "De", WebsiteViews: 4863 }
        ]
      },
      //----------------
      saleChartData: {
        columns: ["Week", "Sale"],
        rows: [
          { Week: "M", Sale: 1393 },
          { Week: "T", Sale: 3530 },
          { Week: "W", Sale: 2923 },
          { Week: "T", Sale: 1723 },
          { Week: "S", Sale: 3792 },
          { Week: "S", Sale: 4593 }
        ]
      },
      //----------------
      registerChartData: {
        columns: ["Hour", "Registration"],
        rows: [
          { Hour: "12am", Registration: 200 },
          { Hour: "3am", Registration: 675 },
          { Hour: "6am", Registration: 410 },
          { Hour: "9am", Registration: 390 },
          { Hour: "12pm", Registration: 310 },
          { Hour: "3pm", Registration: 460 },
          { Hour: "6pm", Registration: 250 },
          { Hour: "9pm", Registration: 240 }
        ]
      }
    };
  },
  methods: {},
  computed: {
    totalWebViews() {
      var total = 0;
      for (let i = 0; i < this.webViewChartData.rows.length; i++) {
        total += this.webViewChartData.rows[i].WebsiteViews;
      }
      return total;
    },
    totalSale() {
      var total = 0;
      for (let i = 0; i < this.saleChartData.rows.length; i++) {
        total += this.saleChartData.rows[i].Sale;
      }
      return total;
    },
    totalRegister() {
      var total = 0;
      for (let i = 0; i < this.registerChartData.rows.length; i++) {
        total += this.registerChartData.rows[i].Registration;
      }
      return total;
    }
  }
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
