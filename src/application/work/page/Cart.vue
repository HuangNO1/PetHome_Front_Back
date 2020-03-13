<template>
  <div style="padding-bottom: 3rem;">
    <div>
      <v-row>
        <v-col class="pa-12">
          <v-range-slider
            :tick-labels="progress"
            :value="progressValue"
            min="0"
            max="3"
            ticks="always"
            tick-size="4"
            thumb-label="always"
            readonly
          >
            <template v-slot:thumb-label="props">
              <v-icon dark>
                {{ cartProgress(props.value) }}
              </v-icon>
            </template>
          </v-range-slider>
        </v-col>
      </v-row>
    </div>
    <div>
      <!-- search bar -->
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 1
        }"
        transition="slide-x-reverse-transition"
        origin="top right 50"
      >
        <v-card
          color="lighten-4"
          hover="true"
          style="margin-bottom: 1rem; padding: 1rem;"
          height="90"
        >
          <v-row>
            <v-col>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                filled
                dense
                single-line
              ></v-text-field>
            </v-col>
            <v-col md="auto" sm="auto" xs="auto" lg="auto" xl="auto">
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-col>
            <v-col md="auto" sm="auto" xs="auto" lg="auto" xl="auto">
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-lazy>
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
        <v-card elevation="10">
          <v-card-title
            :class="this.$store.state.theme.navTheme"
            class="white--text"
          >
            <span>{{ currentTitle }}</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-window v-model="step">
            <!-- windows 1 : Cart -->
            <v-window-item :value="1">
              <!-- if cart have items, show it -->
              <v-data-table
                :headers="headers"
                :items="cartProduct"
                :search="search"
                item-key="name"
                show-select
                items-per-page="7"
                hide-default-footer
                class="elevation-1"
                @page-count="pageCount = $event"
                :page.sync="page"
                v-if="cartProduct.length !== 0"
              >
                <template v-slot:header.data-table-select="{ on, props }">
                  <v-simple-checkbox
                    color="purple"
                    v-model="selectHeader"
                    v-on="on"
                    @change="selectAll"
                    :indeterminate="isNotSelectAll"
                  ></v-simple-checkbox>
                </template>
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="(item, index) in items" :key="item.name">
                      <td style="">
                        <v-checkbox
                          v-model="cartSelected"
                          :value="item"
                          hide-details
                          style="margin: 0;"
                        ></v-checkbox>
                      </td>
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
                      <td>{{ item.price }}</td>
                      <td>
                        <number-input
                          style="width: 10rem; color: black;margin-top: 5px;"
                          v-model="item.number"
                          :min="1"
                          :max="99"
                          inline
                          center
                          controls
                        >
                        </number-input>
                      </td>
                      <td>{{ (item.total = item.number * item.price) }}</td>
                      <td>
                        <v-btn
                          color="red"
                          @click="deleteItemDialog(index)"
                          icon
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
              <v-pagination
                v-model="page"
                v-if="cartProduct.length !== 0"
                :length="pageCount"
              ></v-pagination>
              <div
                style="text-align: end;"
                class="mr-4 mb-4"
                v-if="cartProduct.length !== 0"
              >
                <span class="headline">Sum: </span>
                <span class="headline">$ {{ countSum }}</span>
              </div>
              <!-- if cart have no items, show it -->
              <div class="pa-4 text-center" v-if="cartProduct.length === 0">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  src="../../../assets/icons/cart.svg"
                ></v-img>
                <h3 class="title font-weight-light mb-2">
                  Welcome to Pet Home.
                </h3>
                <div class="caption grey--text mb-2">
                  Thanks for signing up!
                </div>
                <v-btn color="primary" to="Home">
                  <v-icon left>mdi-shopping</v-icon>
                  Go Shopping
                </v-btn>
              </div>
            </v-window-item>

            <!-- windows 2 : Checkout -->

            <v-window-item :value="2">
              <v-card-text>
                <v-data-table
                  :headers="checkoutHeaders"
                  :items="cartSelected"
                  :search="search"
                  :items-per-page="5"
                  hide-default-footer
                  class="elevation-1"
                  @page-count="checkoutPageCount = $event"
                  :page.sync="checkoutPage"
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr v-for="(item, index) in items" :key="item.name">
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
                            </span> </v-tooltip
                          >{{ item.name }}
                        </td>
                        <td>{{ item.price }}</td>
                        <td>
                          <number-input
                            style="width: 10rem; color: black;margin-top: 5px;"
                            v-model="item.number"
                            :min="1"
                            :max="99"
                            inline
                            center
                            controls
                            @change="updateCartItems"
                          >
                          </number-input>
                        </td>
                        <td>{{ item.total }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
                <v-pagination
                  v-model="checkoutPage"
                  :length="checkoutPageCount"
                ></v-pagination>
                <div style="text-align: end;">
                  <span class="display-1">Your cash: </span>
                  <span class="display-1">$ {{ cash }}</span>
                </div>
                <div style="text-align: end;">
                  <!--<span class="title">Sum: </span>-->
                  <span class="title">- $ {{ countSum }}</span>
                </div>
                <div
                  style="text-align: end;"
                  :class="[cash - countSum > 0 ? 'green--text' : 'red--text']"
                >
                  <span class="headline">Your credit: </span>
                  <span class="headline"
                    >$ {{ (countResult = cash - countSum) }}</span
                  >
                </div>
                <v-alert type="error" v-if="countResult <= 0">
                  Please to add your credit.
                </v-alert>
                <div style="text-align: end;" v-if="countResult <= 0">
                  <v-btn to="User">Add credit</v-btn>
                </div>
              </v-card-text>
            </v-window-item>

            <!-- windows 3 : Finish -->
            <v-window-item :value="3">
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  src="../../../assets/icons/cart.svg"
                ></v-img>
                <h3 class="title font-weight-light mb-2">
                  Welcome to Pet Home.
                </h3>
                <div class="caption grey--text mb-2">
                  Thanks for Shopping! The deal is finished.
                </div>
                <v-btn color="primary" to="Home">
                  <v-icon left>mdi-shopping</v-icon>
                  Go Shopping
                </v-btn>
              </div>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn :disabled="step === 1 || step === 3" text @click="step--">
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="
                step === 3 ||
                  cartSelected.length === 0 ||
                  (countResult <= 0 && step === 2)
              "
              color="primary"
              depressed
              @click="nextWindow"
            >
              Next
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-lazy>
    </div>
    <!-- delete dialog -->
    <v-dialog v-model="deleteDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline red--text">WARNING</v-card-title>

        <v-card-text>
          Are you sure you want to remove <b>{{ deleteItem.name }}</b
          >?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteProduct(deleteItem.index)"
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 交易確認 -->
    <v-dialog v-model="comfirmDealDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline">Comfirm</v-card-title>

        <v-card-text>
          Are you sure you want to finish this deal?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="comfirmDealDialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="addToRecord">
            Sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import {
  ADD_TO_RECORD,
  UPDATE_CART_ITEMS
} from "../store/mutations-types/product";

export default {
  components: {},
  created() {
    // 引入 VUEX 的數據，並初始附值。
    this.cartProduct = this.cartProductItems;
  },
  data() {
    return {
      // 假設使用者的貨幣
      cash: 100,
      // ---------
      isActive: false,
      step: 1,
      progressValue: [],
      progress: ["", "Cart", "Checkout", "Finish"],
      progressIcons: ["", "mdi-cart", "mdi-cash-usd", "mdi-briefcase-check"],
      search: null,
      select: null,
      // cart data -----------------------
      search: "",
      headers: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Price($)", value: "price" },
        { text: "number", value: "number" },
        { text: "Total($)", value: "total" },
        { text: "Action", value: "action" }
      ],
      cartProduct: [],
      page: 1,
      pageCount: 0,
      cartSelected: [],
      selectHeader: false,
      selectAllItem: false,

      // delete item----------------------
      deleteDialog: false,
      comfirmDelete: false,
      deleteItem: {
        index: 0
      },
      defaultItem: {
        name: "",
        price: 0,
        number: 0,
        total: 0
      },
      // checkout----------------------
      checkoutHeaders: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Price($)", value: "price" },
        { text: "number", value: "number" },
        { text: "Total($)", value: "total" }
      ],
      checkoutPage: 1,
      checkoutPageCount: 0,
      countResult: 0,
      // Finish Deal---------------------------
      comfirmDealDialog: false,
      finishDeal: false
    };
  },
  watch: {},
  methods: {
    cartProgress(val) {
      return this.progressIcons[val];
    },
    deleteItemDialog(index) {
      this.deleteItem.index = index;
      this.deleteItem.name = this.cartProduct[index].name;
      this.deleteDialog = true;
    },
    deleteProduct(index) {
      this.cartProduct.splice(index, 1);
      for (let i = 0; i < this.cartSelected.length; i++) {
        if (this.cartSelected[i].name === this.deleteItem.name) {
          this.cartSelected.splice(i, 1);
        }
      }
      this.deleteDialog = false;
      this.$store.commit(UPDATE_CART_ITEMS, this.cartProduct);
    },
    nextWindow() {
      if (this.step + 1 === 3) {
        // 彈出確認交易
        this.comfirmDealDialog = true;
      } else {
        this.step += 1;
      }
    },
    addToRecord() {
      // 提交購物紀錄 以及 添加交易完成時間 以及 刪除購物車商品
      this.step++;
      this.comfirmDealDialog = false;
      var FinishDealDate = new Date();
      var FinishDealTime =
        FinishDealDate.getFullYear() +
        "/" +
        FinishDealDate.getMonth() +
        "/" +
        FinishDealDate.getDate() +
        " " +
        FinishDealDate.toLocaleTimeString();
      for (let i = 0; i < this.cartSelected.length; i++) {
        this.cartSelected[i].time = FinishDealTime;
        this.$store.commit(ADD_TO_RECORD, this.cartSelected[i]);
        // 刪除 cartProduct
        for (let j = 0; j < this.cartProduct.length; j++) {
          if (this.cartProduct[j].name === this.cartSelected[i].name) {
            this.cartProduct.splice(j, 1);
          }
        }
      }
      this.$store.commit(UPDATE_CART_ITEMS, this.cartProduct);
      console.log(recordProductItems);
    }
  },
  computed: {
    // get data from vuex
    ...mapState({
      cartProductItems: state => {
        return state.product.cartProductItems;
      },
      recordProductItems: state => {
        return state.product.recordProductItems;
      }
    }),
    currentTitle() {
      switch (this.step) {
        case 1:
          this.progressValue = [0, 1];
          return "Cart";
        case 2:
          this.progressValue = [0, 2];
          console.log(this.cartSelected);
          return "Checkout";
        default:
          this.progressValue = [0, 3];
          return "Finish Deal";
      }
    },
    countSum() {
      var sum = 0;
      for (let i = 0; i < this.cartSelected.length; i++) {
        sum += this.cartSelected[i].total;
      }
      return sum;
    },
    selectAll() {
      if (this.selectHeader === true) {
        // select is true
        this.cartSelected = this.cartProduct;
      } else {
        // select is false
        if (this.cartSelected === this.cartProduct) {
          this.cartSelected = [];
        } else {
          return;
        }
      }
    },
    isNotSelectAll() {
      if (
        this.cartSelected !== this.cartProduct &&
        this.cartSelected.length !== 0
      ) {
        this.selectHeader = false;
        return true;
      } else {
        return false;
      }
    },
    updateCartItems() {
      this.$store.commit(UPDATE_CART_ITEMS, this.cartProduct);
    }
  }
};
</script>
<style></style>
