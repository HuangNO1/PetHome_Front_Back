<template>
  <div>
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
          color="grey lighten-4"
          hover="true"
          style="margin-bottom: 1rem;"
          flat
          tile
        >
          <!-- auto complete -->
          <v-toolbar>
            <v-autocomplete
              v-model="select"
              :loading="loading"
              :items="autoCompleteItems"
              :search-input.sync="search"
              :filter="customFilter"
              prepend-inner-icon="mdi-magnify"
              class="mx-4"
              flat
              hide-details
              label="What are you finding?"
              solo-inverted
              chips
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    Search for your favorite
                    <strong>Pet</strong>.
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                  @change="showFilterResult(item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.img"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.img" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.description"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn @click="sheet = true" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-lazy>
      <!-- 底層表單 -->
      <v-bottom-sheet v-model="sheet">
        <v-sheet
          class="text-center"
          style="display: flex; justify-content: center;  flex-direction: column;"
          height="300px"
        >
          <div>
            <v-btn class="mt-6" text color="red" @click="sheet = !sheet"
              >close</v-btn
            >
          </div>

          <div
            style="display: flex; justify-content: center; margin: auto 10% auto;"
          >
            <v-range-slider
              :min="0"
              :max="10000"
              :thumb-size="64"
              thumb-label="always"
              v-model="priceRange"
            >
              <template v-slot:prepend>
                <v-text-field
                  :value="priceRange[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 80px"
                  @change="$set(priceRange, 0, $event)"
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  :value="priceRange[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 80px"
                  @change="$set(priceRange, 1, $event)"
                ></v-text-field>
              </template>
            </v-range-slider>
          </div>
          <div class="mb-4">
            <v-btn class="mr-4" @click="filterFromPriceRange">Filter</v-btn>
            <v-btn class="ml-4" @click="priceRange = [0, 10000]">reset</v-btn>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
    <!-- product list tag -->
    <v-row justify="space-around">
      <v-col cols="12">
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-sheet elevation="8" class="py-4 px-1">
            <v-chip-group mandatory active-class="primary--text">
              <v-chip v-for="tag in tags" :key="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-lazy>
      </v-col>
    </v-row>
    <!-- product list menu  -->
    <v-row class="mb-6">
      <v-col md="auto">
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <div style="width: 256px;" class="mr-4">
            <affix :offset="80">
              <v-card elevation="10" width="256" class="mr-4 mb-4">
                <!--<v-navigation-drawer floating permanent>-->
                <v-list rounded dense shaped>
                  <v-list-item
                    v-for="item in productMenuItems"
                    :key="item.title"
                    link
                    @click="MenuShowProduct(item.title)"
                  >
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <!--</v-navigation-drawer>-->
              </v-card>
            </affix>
          </div>
        </v-lazy>
      </v-col>
      <!-- 展示商品 -->
      <v-col>
        <v-lazy
          v-model="i.isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
          style="display: inline-block;"
          v-for="(item, i) in showProductItems"
          :key="i"
        >
          <v-card
            class="mx-auto mb-4 mr-4"
            elevation="10"
            max-width="900"
            style="display: inline-block;"
          >
            <v-row>
              <v-col md="auto">
                <v-avatar tile size="130" class="ml-4">
                  <v-img :src="item.img" />
                </v-avatar>
              </v-col>
              <v-col>
                <div class="overline mb-2 ml-2">Pet Home</div>
                <div
                  class="headline mb-2 ml-2"
                  style="margin-bottom: 0; margin-top: 0;"
                >
                  <a @click="toViewProduct(item)">{{ item.name }}</a>
                </div>
                <div class="ml-2" style="width: 27rem;">
                  {{ item.description }}
                </div>
              </v-col>
            </v-row>
            <v-card-actions>
              <span class="headline ml-2">
                <v-icon large>mdi-cash-usd-outline</v-icon>
                {{ item.price }}
              </span>
              <v-spacer></v-spacer>
              <v-btn class="mx-2" fab small icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
              <v-btn class="mx-2" fab dark small color="primary">
                <v-icon dark>mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn class="mx-2" fab dark small color="pink">
                <v-icon dark>mdi-heart</v-icon>
              </v-btn>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-2"
                    fab
                    small
                    dark
                    color="success"
                    v-on="on"
                    @click="addToCart(item)"
                  >
                    <v-icon>mdi-cart-arrow-down</v-icon>
                  </v-btn>
                </template>
                <span>
                  <v-icon>mdi-cart</v-icon>
                  Add To Cart
                </span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top :timeout="3000">
      {{ text }} have added to cart.
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import Affix from "../components/Affix/Affix";
import { mapState, mapMutations } from "vuex";
import { ADD_TO_CART, VIEW_PRODUCT_ITEM_DETAIL } from "../store/mutations-types/product";
import Cookies from 'js-cookie' // 引入 cookie API

export default {
  components: {
    Affix
  },
  created() {
    this.recommendProductItems = this.productItems;
    this.showProductItems = this.recommendProductItems;
    // 獲取初始資料
    // 推薦給使用者的產品資料
    // axios
    //   .post(this.initRecommendProductItemsURL)
    //   .then(response => {
    //     console.log(response);
    //     console.log(response.data);
    //     this.recommendProductItems = response.data;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  },
  data() {
    return {
      // 價格區間
      priceRange: [0, 10000],
      sheet: false,
      min: 0,
      max: 0,

      //-----------
      isActive: false,
      loading: false,
      autoCompleteItems: [],
      search: null,
      select: null,
      productKeyword: [],
      productMenuItems: [
        { title: "Recommend", icon: "mdi-history" },
        { title: "Dog", icon: "mdi-dog-side" },
        { title: "Cat", icon: "mdi-cat" },
        { title: "Fox", icon: "mdi-firefox" },
        { title: "Fish", icon: "mdi-fishbowl" },
        { title: "Bird", icon: "mdi-twitter" }
      ],
      tags: [
        "Work",
        "Home Improvement",
        "Vacation",
        "Food",
        "Drawers",
        "Shopping",
        "Art",
        "Tech",
        "Creative Writing"
      ],
      // 提示窗
      snackbar: false,
      text: "",
      // product test--------------------------------
      showProductItems: [],
      recommendProductItems: [], // 推薦的商品
      initRecommendProductItemsURL: "",
      addCartSameURL: "",
      addCartURL: ""
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v) {
      console.log("v = " + v);
      this.loading = true;
      // Simulated ajax query
      this.autoCompleteItems = [];
      setTimeout(() => {
        // this.autoCompleteItems = this.productKeyword.filter(e => {
        //   return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        // });
        this.autoCompleteItems = this.productItems.filter(function(
          item,
          index,
          array
        ) {
          return (
            item.name.toLowerCase().indexOf(v.toLowerCase()) > -1 ||
            item.description.toLowerCase().indexOf(v.toLowerCase()) > -1 ||
            item.type.toLowerCase().indexOf(v.toLowerCase()) > -1
          );
        });
        console.log(this.autoCompleteItems);
        console.log(this.search);
        this.loading = false;
      }, 500);
    },
    customFilter() {
      this.showProductItems = [];
      setTimeout(() => {
        this.showProductItems = this.autoCompleteItems;
      }, 300);
      return this.autoCompleteItems;
    },
    MenuShowProduct(type) {
      this.showProductItems = [];
      setTimeout(() => {
        if (type === "Recommend") {
          // 如果點的是 Recommend
          this.showProductItems = this.recommendProductItems;
        } else {
          this.showProductItems = this.productItems.filter(function(
            item,
            index,
            array
          ) {
            return item.type === type;
          });
        }
      }, 300);
    },
    addToCart(item) {
      // 確認是否購物車有相同的物品，如果有 -> 添加數字，沒有 -> 添加 item
      // 先申明一個變量 並將 item 的值賦進去，特別將 number 調為 1，解決指針問題
      var tempItem = {
        name: item.name,
        img: item.img,
        type: item.type,
        description: item.description,
        price: item.price,
        number: 1,
        total: item.total,
        time: item.time,
        like: item.like,
        upVote: item.upVote,
        gender: item.gender,
        age: item.age,
        tags: item.tags,
        comments: item.comments,
      }
      var isSame = false;
      for (let i = 0; i < this.cartProductItems.length; i++) {
        if (this.cartProductItems[i].name === item.name) {
          this.cartProductItems[i].number += 1;
          isSame = true;

          // axios 將這商品寫入使用者數據庫
          // var params = new URLSearchParams();
          // params.append("sameProductAddCart", this.cartProductItems[i]);
          // axios
          //   .post(this.addCartURL, params)
          //   .then(response => {
          //     console.log(response);
          //     console.log(response.data);
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   });
          break;
        }
      }
      if (!isSame) {
        this.$store.commit(ADD_TO_CART, tempItem);
        // axios 將這商品寫入使用者數據庫
        // var params = new URLSearchParams();
        // params.append("productAddCart", tempItem);
        // axios
        //   .post(this.addCartURL, params)
        //   .then(response => {
        //     console.log(response);
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      }
      // 出現提示窗
      this.snackbar = true;
      this.text = item.name;
    },
    filterFromPriceRange() {
      var temp = this.showProductItems;
      this.showProductItems = [];
      setTimeout(() => {
        this.showProductItems = temp.filter(e => {
          return e.price >= this.priceRange[0] && e.price <= this.priceRange[1];
        });
      }, 300);
    },
    toViewProduct(item) {
      var tempItem = {
        name: item.name,
        img: item.img,
        type: item.type,
        description: item.description,
        price: item.price,
        number: 1,
        total: item.total,
        time: item.time,
        like: item.like,
        upVote: item.upVote,
        gender: item.gender,
        age: item.age,
        tags: item.tags,
        comments: item.comments,
      };
      // 添加到 VUEX
      this.$store.commit(VIEW_PRODUCT_ITEM_DETAIL, tempItem);
      // 添加到 cookie
      Cookies.set('viewProductItemDetail', tempItem.name, { expires: 7 })
      // 跳轉到 viewProduct 子組件檢視產品詳細
      this.$router.push('/ViewProduct');
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
      },
      productItems: state => {
        return state.product.productItems;
      }
    })
  }
};
</script>
