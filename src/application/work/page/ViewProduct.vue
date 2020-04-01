<template>
  <div>
    <div style="height: 5rem;">
      <div style="position: fixed; z-index: 1;">
        <v-hover v-slot:default="{ hover }">
          <v-card
            :elevation="hover ? 24 : 6"
            class="mb-10"
            style="border-radius: 10px; width: 10rem;"
          >
            <v-toolbar>
              <v-btn @click="goBack" icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>BACK</v-toolbar-title>
            </v-toolbar>
          </v-card>
        </v-hover>
      </div>
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
        <v-card class="mb-4" elevation="10">
          <v-card-title
            :class="this.$store.state.theme.navTheme"
            class="white--text"
            >{{ viewProductItemDetail.name }}</v-card-title
          >
          <v-card-text class="mt-2">
            <div class="pr-10 pl-4">
              <v-row>
                <v-col>
                  <!-- 顯示圖片 -->
                  <viewer
                    :options="options"
                    :images="[viewProductItemDetail.img]"
                    @inited="inited"
                    class="viewer mb-2"
                    ref="viewer"
                  >
                    <template slot-scope="scope">
                      <div style="display: flex; justify-content: center;">
                        <img
                          class="displayImg"
                          v-for="src in scope.images"
                          :src="src"
                          :key="src"
                        />
                      </div>
                    </template>
                  </viewer>
                  <v-chip
                    class="ma-1"
                    v-for="(tag, i) in viewProductItemDetail.tags"
                    :key="i"
                    ># {{ tag }}</v-chip
                  >
                </v-col>
                <v-divider vertical></v-divider>
                <v-col
                  class="ml-10"
                  md="auto"
                  sm="auto"
                  xs="auto"
                  lg="auto"
                  xl="auto"
                >
                  <!-- 性別 -->
                  <v-row>
                    <v-subheader>Gender {{ defaultGender }}</v-subheader>
                  </v-row>
                  <v-row>
                    <v-btn-toggle v-model="defaultGender" mandatory borderless>
                      <v-btn
                        v-for="(genders, i) in productGender"
                        :value="productGender.gender"
                        :key="i"
                      >
                        <v-icon left>{{ genders.icon }}</v-icon>
                        <span class="hidden-sm-and-down">
                          {{ genders.gender }}
                        </span>
                      </v-btn>
                    </v-btn-toggle>
                  </v-row>
                  <!-- age -->
                  <v-row>
                    <v-subheader>Age</v-subheader>
                  </v-row>
                  <v-row>
                    <v-btn-toggle v-model="defaultAge" mandatory borderless>
                      <v-btn
                        v-for="(ages, i) in productAge"
                        :value="i"
                        :key="i"
                      >
                        <v-icon left>{{ ages.icon }}</v-icon>
                        <span class="hidden-sm-and-down">{{ ages.age }}</span>
                      </v-btn>
                    </v-btn-toggle>
                  </v-row>
                  <v-row>
                    <v-subheader>Number</v-subheader>
                  </v-row>
                  <v-row>
                    <number-input
                      style="color: black;"
                      v-model="viewProductItemDetail.number"
                      :min="1"
                      :max="99"
                      inline
                      center
                      controls
                    >
                    </number-input>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <span class="headline ml-2">
              <v-icon large>mdi-cash-usd-outline</v-icon>
              {{ viewProductItemDetail.price }}
            </span>
            <v-spacer></v-spacer>
            <v-btn class="mx-2" fab icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            <!-- 點贊 -->
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="mx-2"
                  v-show="!viewProductItemDetail.upVoteClick"
                  v-on="on"
                  @click="updateUserUpVote(viewProductItemDetail)"
                  fab
                  icon
                  color="primary"
                >
                  <v-icon>mdi-thumb-up-outline</v-icon>
                </v-btn>
              </template>
              <span>{{ viewProductItemDetail.upVote }}</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="mx-2"
                  v-show="viewProductItemDetail.upVoteClick"
                  v-on="on"
                  @click="updateUserUpVote(viewProductItemDetail)"
                  fab
                  icon
                  color="primary"
                >
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
              </template>
              <span>{{ viewProductItemDetail.upVote }}</span>
            </v-tooltip>
            <!-- 收藏 -->
            <v-btn
              class="mx-2"
              v-show="!viewProductItemDetail.liked"
              @click="updateUserLiked(viewProductItemDetail)"
              fab
              icon
              color="pink"
            >
              <v-icon>mdi-heart-multiple-outline</v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              v-show="viewProductItemDetail.liked"
              @click="updateUserLiked(viewProductItemDetail)"
              fab
              icon
              color="pink"
            >
              <v-icon>mdi-heart-multiple</v-icon>
            </v-btn>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="success"
                  v-on="on"
                  @click="addToCart(viewProductItemDetail)"
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
      <!--{{viewProductItemDetail}}-->
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 1
        }"
        transition="slide-x-reverse-transition"
        origin="top right 50"
      >
        <v-card class="mb-4" elevation="10">
          <v-card-title>Description</v-card-title>
          <v-card-text>
            <div
              class="text-justify subtitle-1 mr-10 ml-10"
              style="text-indent: 2em;"
            >
              {{ viewProductItemDetail.description }}
            </div>
          </v-card-text>
        </v-card>
      </v-lazy>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 1
        }"
        transition="slide-x-reverse-transition"
        origin="top right 50"
      >
        <v-card elevation="10">
          <v-card-title>Comments</v-card-title>
          <v-card-text>
            <v-row class="ml-4 mr-4">
              <v-col md="auto" sm="auto" xs="auto" lg="auto" xl="auto">
                <v-avatar tile>
                  <img :src="avatar" />
                </v-avatar>
              </v-col>
              <v-col>
                <v-textarea
                  outlined
                  label="Comment"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row class="mb-3">
              <v-spacer></v-spacer>
              <v-btn color="primary" class="mr-10">Send</v-btn>
            </v-row>
            <v-divider></v-divider>
            <!-- 談論區 -->
            <v-row
              class="ml-4 mr-4"
              v-for="item in viewProductItemDetail.comments"
              :key="item.username"
            >
              <v-col md="auto" sm="auto" xs="auto" lg="auto" xl="auto">
                <v-avatar tile>
                  <img :src="item.avatar" />
                </v-avatar>
              </v-col>
              <v-col>
                <div class="mb-2">
                  {{ item.username }} - {{ item.time }}
                  <v-alert>
                    {{ item.content }}
                  </v-alert>
                  <v-btn text small color="error">Delete</v-btn>
                  <v-btn
                    text
                    small
                    color="primary"
                    @click="item.clickEdit = !item.clickEdit"
                    >Edit</v-btn
                  >
                </div>
                <v-lazy
                  v-model="item.isActive"
                  :options="{
                    threshold: 1
                  }"
                  transition="slide-x-reverse-transition"
                  origin="top right 50"
                >
                  <div v-if="item.clickEdit">
                    <v-textarea
                      outlined
                      label="Comment"
                      :value="item.content"
                    ></v-textarea>
                  </div>
                </v-lazy>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-lazy>
    </div>
    <!-- 加入購物車的消息條 -->
    <v-snackbar v-model="addCartSnackbar" top :timeout="3000">
      {{ addCartSnackbarText }} have added to cart.
      <v-btn color="pink" icon fab @click="addCartSnackbar = false">
        <v-icon dark>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component";
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
    Viewer
  },
  data() {
    return {
      isActive: false,
      images: ["https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png"],
      defaultGender: 0,
      defaultAge: 0,
      productGender: [
        {
          gender: "Male",
          icon: "mdi-gender-male"
        },
        {
          gender: "Female",
          icon: "mdi-gender-female"
        }
      ],
      productAge: [
        {
          age: "Young",
          icon: "mdi-alpha-y"
        },
        {
          age: "Adult",
          icon: "mdi-alpha-a"
        },
        {
          age: "Older",
          icon: "mdi-alpha-o"
        }
      ],
      // 加入購物車消息條
      addCartSnackbar: false,
      addCartSnackbarText: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    let show = this.productItems.find(e => {
      return e.id === to.query.id;
    });
    this.$store.commit(VIEW_PRODUCT_ITEM_DETAIL, show);
  },
  created() {
    let id = this.$route.query.id;
    let show = this.productItems.find(e => {
      return e.id === id;
    });
    this.$store.commit(VIEW_PRODUCT_ITEM_DETAIL, show);
  },
  methods: {
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push("/Home");
    },
    inited(viewer) {
      this.$viewer = viewer;
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
        number: item.number,
        total: item.total,
        time: item.time,
        liked: item.liked,
        upVoteClick: item.upVoteClick,
        upVote: item.upVote,
        gender: this.productGender[this.defaultGender].gender,
        age: this.productAge[this.defaultAge].age,
        tags: item.tags,
        comments: item.comments
      };
      var isSame = false;
      for (let i = 0; i < this.cartProductItems.length; i++) {
        if (
          this.cartProductItems[i].id === tempItem.id &&
          this.cartProductItems[i].gender === tempItem.gender &&
          this.cartProductItems[i].age === tempItem.age
        ) {
          console.log(">>>>>>>> " + "is same");
          this.cartProductItems[i].number += tempItem.number;
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
      this.addCartSnackbar = true;
      this.addCartSnackbarText = item.name;
      // 初始化 item.number;
      item.number = 1;
    },
    updateUserLiked(item) {
      item.liked = !item.liked;
      // 更新使用者的喜歡商品
      if (item.liked === false) {
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
    }
  },
  computed: {
    // get data from vuex
    ...mapState({
      cartProductItems: state => {
        return state.product.cartProductItems;
      },
      viewProductItemDetail: state => {
        return state.product.viewProductItemDetail;
      },
      username: state => {
        return state.user.username;
      },
      avatar: state => {
        return state.user.avatar;
      },
      productItems: state => {
        return state.product.productItems;
      }
    })
  }
};
</script>
<style>
.displayImg {
  max-height: 20rem;
}
</style>
