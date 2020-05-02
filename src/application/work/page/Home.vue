<template>
  <div>
    <div>
      <!-- 頂部輪播 -->
      <v-carousel
        cycle
        height="200"
        hide-delimiter-background
        show-arrows-on-hover
        class="mb-3"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
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

            <v-btn
              @click="showUserLikeProduct"
              v-show="!isClickShowUserLike"
              icon
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn
              @click="showUserLikeProduct"
              v-show="isClickShowUserLike"
              color="pink"
              icon
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn @click="sheet = true" icon>
              <v-icon>mdi-filter</v-icon>
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
            <v-chip-group
              active-class="primary--text"
              v-model="selectedTags"
              @change="showTagsProductItems"
              multiple
            >
              <v-chip v-for="(tag, index) in tags" :key="index"># {{ tag }}</v-chip>
            </v-chip-group>
          </v-sheet>
        </v-lazy>
      </v-col>
      <!--{{userLikedProduct}}<br/>{{userUpVoteProduct}}-->
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
                    v-for="(item, index) in productMenuItems"
                    :key="index"
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
                <v-avatar
                  @click="toViewProduct(item)"
                  tile
                  size="130"
                  class="ml-4"
                >
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
                  <!--{{ item.description }}-->
                  <v-chip v-for="(tag, i) in item.tags" :key="i"
                    ># {{ tag }}
                  </v-chip>
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
              <!-- 點贊 -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-2"
                    v-show="!item.upVoteClick"
                    v-on="on"
                    @click="updateUserUpVote(item)"
                    fab
                    icon
                    small
                    color="primary"
                  >
                    <v-icon>mdi-thumb-up-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ item.upVote }}</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-2"
                    v-show="item.upVoteClick"
                    v-on="on"
                    @click="updateUserUpVote(item)"
                    fab
                    icon
                    small
                    color="primary"
                  >
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>
                </template>
                <span>{{ item.upVote }}</span>
              </v-tooltip>
              <!-- 收藏 -->
              <v-btn
                class="mx-2"
                v-show="!item.likedClick"
                @click="updateUserLiked(item)"
                fab
                icon
                small
                color="pink"
              >
                <v-icon>mdi-heart-multiple-outline</v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                v-show="item.likedClick"
                @click="updateUserLiked(item)"
                fab
                icon
                small
                color="pink"
              >
                <v-icon>mdi-heart-multiple</v-icon>
              </v-btn>
              <!--
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
              -->
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
    <!--
    <v-snackbar v-model="snackbar" top :timeout="3000">
      {{ text }} have added to cart.
      <v-btn color="pink" icon fab @click="snackbar = false">
        <v-icon dark>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>
    -->
    <!-- 如果沒使用者登入的請求登入 dialog -->
    <v-dialog v-model="signDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline red--text">Hey! Please sign in.</v-card-title>
        <v-card-text>
          You Have not sign in. You must to sign in to do this action.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="signDialog = false">
            Get it
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            href="/sign#/Login"
          >
            Sign In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Affix from "../components/Affix/Affix";
import { mapState, mapMutations } from "vuex";
import {
  ADD_TO_CART,
  VIEW_PRODUCT_ITEM_DETAIL
} from "../store/mutations-types/product";
import {
  REMOVE_USER_LIKE_PRODUCT,
  ADD_USER_LIKE_PRODUCT,
  REMOVE_USER_UP_VOTE_PRODUCT,
  ADD_USER_UP_VOTE_PRODUCT
} from "../store/mutations-types/user.js";
import Cookies from "js-cookie"; // 引入 cookie API

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

    // 遍歷商品的所有 tag，並將重複的 tag 去除，將 tag 存到這裡的 tags
    for (let i = 0; i < this.productItems.length; i++) {
      for (let j = 0; j < this.productItems[i].tags.length; j++) {
        let haveSameTag = false;
        for (let k = 0; k < this.tags.length; k++) {
          if (this.tags[k] === this.productItems[i].tags[j]) {
            haveSameTag = true;
            break;
          }
        }
        if (haveSameTag === false) {
          this.tags.push(this.productItems[i].tags[j]);
        }
        haveSameTag = false;
      }
      // 初始化各產品的 liked upVote
      for (let j = 0; j < this.userLikedProduct.length; j++) {
        if (this.productItems[i].id === this.userLikedProduct[j]) {
          this.productItems[i].likedClick = true;
        }
      }
      for (let j = 0; j < this.userUpVoteProduct.length; j++) {
        if (this.productItems[i].id === this.userUpVoteProduct[j]) {
          this.productItems[i].upVoteClick = true;
        }
      }
    }
  },
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: [
        "ALL 15% OFF",
        "NEW PRODUCT PUBLISHING",
        "95% POSITIVE FEEDBACK",
        "MEMBER CARD BENEFITS",
        "GREAT"
      ],
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
      // tags
      tags: [],
      selectedTags: [],
      // 提示窗
      // snackbar: false,
      // text: "",
      // product test--------------------------------
      showProductItems: [],
      recommendProductItems: [], // 推薦的商品
      initRecommendProductItemsURL: "",
      addCartSameURL: "",
      addCartURL: "",
      // 使用者的 like 與 up vote
      updateUserLikedURL: "",
      updateUserUpVoteURL: "",
      // 是否展示使用者喜歡的產品
      isClickShowUserLike: false,
      // 請求登入 dialog
      signDialog: false,
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
      }, 100);
    },
    customFilter() {
      this.showProductItems = [];
      setTimeout(() => {
        this.showProductItems = this.autoCompleteItems;
      }, 100);
      return this.autoCompleteItems;
    },
    showTagsProductItems() {
      // 展示 tags 的商品
      this.showProductItems = [];
      setTimeout(() => {
        if (this.selectedTags.length !== 0) {
          // 如果有 tag 被選中

          // 將有被選取到 tag 的商品展示出來
          for (let i = 0; i < this.productItems.length; i++) {
            let showItem = false;
            for (let j = 0; j < this.productItems[i].tags.length; j++) {
              for (let k = 0; k < this.selectedTags.length; k++) {
                if (
                  this.productItems[i].tags[j] ===
                  this.tags[this.selectedTags[k]]
                ) {
                  showItem = true;
                  break;
                }
              }
              if (showItem === true) {
                break;
              }
            }
            if (showItem === true) {
              this.showProductItems.push(this.productItems[i]);
            }
            showItem = false;
          }
        } else {
          // 如果沒有 tag 被選中，顯示推薦
          this.showProductItems = this.recommendProductItems;
        }
      }, 100);
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
      }, 100);
    },
    addToCart(item) {
      // 確認是否購物車有相同的物品，如果有 -> 添加數字，沒有 -> 添加 item
      // 先申明一個變量 並將 item 的值賦進去，特別將 number 調為 1，解決指針問題
      var tempItem = {
        id: item.id,
        name: item.name,
        img: item.img,
        type: item.type,
        description: item.description,
        price: item.price,
        number: 1,
        total: item.total,
        time: item.time,
        likedClick: item.likedClick,
        upVote: item.upVote,
        gender: item.gender,
        age: item.age,
        tags: item.tags,
        comments: item.comments
      };
      var isSame = false;
      for (let i = 0; i < this.cartProductItems.length; i++) {
        if (this.cartProductItems[i].id === item.id) {
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
      }, 100);
    },
    toViewProduct(item) {
      // 跳轉到 viewProduct 子組件檢視產品詳細，并添加 query string 作為参数
      this.$router.push({ path: "/ViewProduct", query: { id: item.id } });
    },
    updateUserLiked(item) {
      // 如果使用者沒有登入就不允許操作
      if(Cookies.get("userStatus") === undefined) {
        this.signDialog = true;
        return;
      }
      item.likedClick = !item.likedClick;
      // 更新使用者的喜歡商品
      if (item.likedClick === false) {
        // 如果 取消喜歡，去掉使用者喜歡產品 ID array
        this.$store.commit(REMOVE_USER_LIKE_PRODUCT, item.id);
      } else {
        // 如果喜歡 Push 進使用者喜歡產品 ID array
        this.$store.commit(ADD_USER_LIKE_PRODUCT, item.id);
      }
      // axios 將這變更寫入使用者數據庫
      // var params = new URLSearchParams();
      // params.append("userLikedProduct", this.userLikedProduct);
      // axios
      //   .post(this.updateUserLikedURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    updateUserUpVote(item) {
      // 如果使用者沒有登入就不允許操作
      if(Cookies.get("userStatus") === undefined) {
        this.signDialog = true;
        return;
      }
      item.upVoteClick = !item.upVoteClick;
      // 更新使用者的點贊商品
      if (item.upVoteClick === false) {
        // 如果取消點贊，去掉使用者點贊的產品 ID array
        this.$store.commit(REMOVE_USER_UP_VOTE_PRODUCT, item.id);
        item.upVote -= 1;
      } else {
        // 如果點贊，Push 進使用者點贊的產品 ID array
        this.$store.commit(ADD_USER_UP_VOTE_PRODUCT, item.id);
        item.upVote += 1;
      }
      // axios 將這變更寫入使用者數據庫
      // var params = new URLSearchParams();
      // params.append("userUpVoteProduct", this.userUpVoteProduct);
      // axios
      //   .post(this.updateUserUpVoteURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    showUserLikeProduct() {
      // 顯示使用者喜歡的產品
      this.isClickShowUserLike = !this.isClickShowUserLike;
      this.showProductItems = [];
      if (this.isClickShowUserLike === true) {
        setTimeout(() => {
          this.showProductItems = this.productItems.filter(e => {
            return e.likedClick === true;
          });
        }, 100);
      } else {
        setTimeout(() => {
          this.showProductItems = this.productItems;
        }, 100);
      }
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
      },
      userLikedProduct: state => {
        return state.user.likedProduct;
      },
      userUpVoteProduct: state => {
        return state.user.upVoteProduct;
      }
    })
  }
};
</script>
