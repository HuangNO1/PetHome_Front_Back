<template>
  <v-app ref="contentStyle">
    <vue-scroll-progress-bar height="3px" />
    <v-navigation-drawer
      v-model="drawer"
      :color="this.$store.state.theme.navTheme"
      :mini-variant="miniVariant"
      :src="this.$store.state.theme.navImage"
      fixed
      app
    >
      <v-list nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar @click="toIntroduct">
            <img src="../../assets/icons/work.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Pet Home</v-list-item-title>
            <v-list-item-subtitle>Best Store</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <!-- 如果使用者有登入時的側邊欄 -->
        <v-list-item
          v-if="loginSuccess"
          v-for="item in items"
          :key="item.title"
          :to="item.title"
          link
        >
          <v-list-item-icon>
            <v-badge
              :content="getCartProductNumber"
              :value="getCartProductNumber"
              :color="getCartBadgeColor"
              v-if="item.title === 'Cart'"
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-badge>
            <v-icon v-if="item.title !== 'Cart'">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- 如果使用者 沒有 登入時的側邊欄 -->
        <v-list-item
          v-if="!loginSuccess"
          v-for="item in noSignInItems"
          :key="item.title"
          :to="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :color="this.$store.state.theme.navTheme" app>
      <!-- -->
      <v-app-bar-nav-icon @click="miniMenu"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <v-avatar size="36" style="margin-right: 1rem;" @click="toIntroduct">
          <img alt="Avatar" src="../../assets/icons/work.png" />
        </v-avatar>
        Pet Home
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- 沒登入成功的情況 顯示登入按鈕-->

      <v-btn outlined href="/sign#/Login" v-if="!loginSuccess">
        <v-icon left>mdi-account-arrow-right</v-icon> Sign In
      </v-btn>

      <!-- 登入成功的情況 ： 顯示使用者的頭像與名稱和 Menu-->
      <v-menu
        v-if="loginSuccess"
        transition="slide-x-reverse-transition"
        offset-y="true"
        open-on-hover="true"
        min-width="230"
        bottom
        left
      >
        <template v-slot:activator="{ on }">
          <span class="ml-2" v-on="on">Hi, {{ username }}!</span>
          <v-card class="portrait" height="36" width="36" v-on="on">
            <img style="height: 36px; width: 36px;" :src="avatar" />
          </v-card>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in menuItem" :key="i" :to="item.url">
            <v-list-item-title>
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <!-- Sign Out-->
          <v-list-item @click.stop="signOutDialog = true">
            <v-list-item-title class="red--text">
              <v-icon color="red">mdi-door-open</v-icon>
              Sign Out
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item class="mb-3">
            <v-switch
              v-model="$vuetify.theme.dark"
              hide-details
              inset
              label="DARK"
              @change="changeAllTheme($vuetify.theme.dark)"
            ></v-switch>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- comfirm Sign Out Dialog-->
    <v-dialog v-model="signOutDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline red white--text lighten-1" primary-title>
          <p>WARRING</p>
        </v-card-title>

        <v-card-text class="title" style="padding: 1rem;">
          Are you sure you want to sign out?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="signOutDialog = false">
            <span>Cancel</span>
          </v-btn>
          <v-btn color="error" text @click="signOut">
            <span>Sure</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <div style="padding: 1rem;">
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Cookies from "js-cookie"; // 引入 cookie API
import axios from "axios"; // axios
// import HelloWorld from "./components/HelloWorld";
import { mapState, mapMutations } from "vuex";
import {
  UPDATE_NAV_THEME,
  UPDATE_NAV_IMAGE,
} from "./store/mutations-types/theme";
import {
  UPDATE_USER_USERNAME,
  UPDATE_USER_AVATAR,
  UPDATE_USER_DESCRIPTION,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PHONE,
  UPDATE_USER_CASH,
  UPDATE_USER_ADDRESS,
  UPDATE_ALL_USER_DATA,
  UPDATE_USER_LIKE_PRODUCT,
  UPDATE_USER_UP_VOTE_PRODUCT,
} from "./store/mutations-types/user";
import {
  UPDATE_CART_ITEMS,
  UPDATE_RECORD_ITEMS,
  INIT_PRODUCT_ITEMS,
  ADD_TO_RECORD,
  ADD_TO_CART,
} from "./store/mutations-types/product";

const testComment = [
  {
    username: "Rem",
    avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
    content:
      "I love it.I love it.I love it.I love it.I love it.I love it.I love it.I love it.I love it.I love it.I love it.I love it.",
    time: "2020/03/17 下午 6:17",
    isActive: false,
    clickEdit: false,
  },
  {
    username: "Rem",
    avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
    content: "I love it.I love it.I love it.I love it.I love it.I love it.",
    time: "2020/03/17 下午 6:17",
    isActive: false,
    clickEdit: false,
  },
  {
    username: "Rem",
    avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
    content: "I love it.",
    time: "2020/03/17 下午 6:17",
    isActive: false,
    clickEdit: false,
  },
  {
    username: "Rem",
    avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
    content: "I love it.",
    time: "2020/03/17 下午 6:17",
    isActive: false,
    clickEdit: false,
  },
];

export default {
  name: "App",

  components: {},
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },

  data: (vm) => ({
    initialDark: vm.$vuetify ? vm.$vuetify.theme.dark : false,
  }),

  beforeDestroy() {
    if (!this.$vuetify) return;

    this.$vuetify.theme.dark = this.initialDark;
  },
  created() {
    // 先獲取 cookie
    var userStatus = Cookies.get("userUsername");
    this.loginSuccess = userStatus === undefined ? false : true;
    // document.location.href = "/work#/Home";
    if (document.location.href === "/work") {
      document.location.href = "/work#/Home";
    }

    if (userStatus !== undefined && userStatus !== null) {
      // 獲取初始資料
      // 使用者基本資料
      this.$store.commit(UPDATE_USER_USERNAME, Cookies.get("userUsername"));
      console.log("userAvatar: " + typeof Cookies.get("userAvatar"));
      var tempAvater = Cookies.get("userAvatar");
      if (tempAvater === "null" || tempAvater === undefined) {
        this.$store.commit(
          UPDATE_USER_AVATAR,
          "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4"
        );
        console.log("default");
      } else {
        this.$store.commit(UPDATE_USER_AVATAR, tempAvater);
        console.log("init");
      }

      if (
        Cookies.get("userDescription") !== undefined &&
        Cookies.get("userDescription") !== "null"
      ) {
        this.$store.commit(
          UPDATE_USER_DESCRIPTION,
          Cookies.get("userDescription")
        );
      } else {
        this.$store.commit(UPDATE_USER_DESCRIPTION, "None");
      }
      this.$store.commit(UPDATE_USER_EMAIL, Cookies.get("userEmail"));
      this.$store.commit(UPDATE_USER_PHONE, Cookies.get("userPhone"));
      if (
        Cookies.get("userCash") !== undefined &&
        Cookies.get("userCash") !== "null"
      ) {
        this.$store.commit(UPDATE_USER_CASH, Cookies.get("userCash"));
      } else {
        this.$store.commit(UPDATE_USER_CASH, 0);
      }
      if (
        Cookies.get("userAddress") !== undefined &&
        Cookies.get("userAddress") !== "null"
      ) {
        this.$store.commit(UPDATE_USER_ADDRESS, Cookies.get("userAddress"));
      } else {
        this.$store.commit(UPDATE_USER_ADDRESS, "None");
      }

      // 使用者 購物車資料
      this.getUserCart();
      // 使用者 訂單資料
      this.getUserOrder();
      // 初始化所有產品
      this.getAllProduct();
    }

    if (this.navTheme === "") {
      this.$store.commit(UPDATE_NAV_THEME, "teal");
    }
  },
  data: () => ({
    getAllProductURL: "http://35.238.213.70:8081/product/findAll",
    getUserCartURL: "http://35.238.213.70:8081/shoppingcart/order",
    getUserOrderURL: "http://35.238.213.70:8081/accountorder/order",
    // 判斷側邊欄是否能見
    drawer: true,
    // 側邊欄 items
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "Cart", icon: "mdi-cart" },
      { title: "Record", icon: "mdi-google-spreadsheet" },
      { title: "User", icon: "mdi-account" },
      { title: "Setting", icon: "mdi-cogs" },
      { title: "About", icon: "mdi-forum" },
    ],
    // 如果使用者沒有登入的側邊欄 items
    noSignInItems: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" },
    ],
    right: true,
    miniVariant: false,
    background: false,
    menuIsClose: false,
    menuItem: [
      { title: "Account", icon: "mdi-account", url: "User" },
      { title: "Cart", icon: "mdi-cart", url: "Cart" },
      { title: "Setting", icon: "mdi-cogs", url: "Setting" },
    ],
    signOutDialog: false,
    // 用來判斷是否登入成功，決定顯示右上角的使用者顯示
    loginSuccess: false,
    // axios 更新全局主題
    changeAllThemeURL: "",
  }),
  methods: {
    toIntroduct() {
      document.location.href = "/introduce";
    },
    miniMenu() {
      const contentWidth = this.$refs.contentStyle.$el.clientWidth;
      console.log("contentWidth: " + contentWidth);
      // open menu
      if (this.menuIsClose === true) {
        console.log("enter open");
        this.miniVariant = false;
        this.drawer = true;
        this.menuIsClose = false;
      } else {
        // close menu
        console.log("enter close");
        if (this.drawer === true) {
          this.miniVariant = true;
          // can't mini variant
          if (this.miniVariant === false) {
            // just close menu
            this.drawer = false;
          } else {
            this.drawer = true;
          }
          this.menuIsClose = true;
        } else {
          // menu is close, open it.
          this.miniVariant = false;
          this.drawer = true;
          this.menuIsClose = false;
        }
      }
      console.log("draw - " + this.drawer);
      console.log("miniVariant - " + this.miniVariant);
    },
    signOut() {
      // 刪除 cookie
      Cookies.remove("userID");
      Cookies.remove("userEmail");
      Cookies.remove("userUsername");
      Cookies.remove("userPhone");
      Cookies.remove("userCash");
      Cookies.remove("userDescription");
      Cookies.remove("userAddress");
      Cookies.remove("userBGColor");
      Cookies.remove("userBGUrl");
      Cookies.remove("userAvatar");
      Cookies.remove("userPower");
      document.location.href = "/introduce";
    },
    changeAllTheme() {
      // axios 更新全局主題
      // var params = new URLSearchParams();
      // params.append("allTheme", this.$vuetify.theme.dark);
      // params.append("email", this.email);
      // axios
      //   .post(this.changeAllThemeURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    async getUserCart() {
      axios({
        method: "post",
        url: this.getUserCartURL,
        headers: {},
        data: {
          account: Cookies.get("userUsername"),
        },
      })
        .then((response) => {
          console.log(response.data);
          for (let i = 0; i < response.data.data.length; i++) {
            var tempItem = {
              username: response.data.data[i].account,
              status: 0,
              id: response.data.data[i].id,
              name: response.data.data[i].product,
              img: response.data.data[i].img,
              type: response.data.data[i].type,
              description: "",
              price: parseInt(response.data.data[i].price, 10),
              number: parseInt(response.data.data[i].figure, 10),
              total: 0,
              time: response.data.data[i].shoptime,
              likedClick: false,
              upVoteClick: false,
              upVote: 0,
              gender: response.data.data[i].gender,
              age: response.data.data[i].age,
              tags: [],
              comments: [],
            };
            this.$store.commit(ADD_TO_CART, tempItem);
          }
          console.log("cart")
          console.log(this.cartProductItems)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUserOrder() {
      axios({
        method: "post",
        url: this.getUserOrderURL,
        headers: {},
        data: {
          account: Cookies.get("userUsername"),
        },
      })
        .then((response) => {
          console.log(response.data);
          for (let i = 0; i < response.data.data.length; i++) {
            var tempItem = {
              username: response.data.data[i].account,
              status: 0,
              id: response.data.data[i].id,
              name: response.data.data[i].product,
              img: response.data.data[i].img,
              type: response.data.data[i].type,
              description: "",
              price: parseInt(response.data.data[i].price),
              number: parseInt(response.data.data[i].figure),
              total: 0,
              time: response.data.data[i].shoptime,
              likedClick: false,
              upVoteClick: false,
              upVote: 0,
              gender: response.data.data[i].gender,
              age: response.data.data[i].age,
              tags: [],
              comments: [],
            };
            this.$store.commit(ADD_TO_RECORD, tempItem);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getAllProduct() {
      axios({
        method: "get",
        url: this.getAllProductURL,
        headers: {},
        data: {},
      })
        .then((response) => {
          console.log(response.data);
          // 先依據每個產品，塞入 tags
          for (let i = 0; i < response.data.data.good.length; i++) {
            // 新將 tags 找出來
            var tempTags = [];
            for (let j = 0; j < response.data.data.goodTag.length; j++) {
              // 如果找到 id 相同
              if (
                response.data.data.goodTag[j].productid ===
                response.data.data.good[i].id.toString()
              ) {
                // 推進 tempTags
                tempTags.push(response.data.data.goodTag[j].tagdes);
              }
            }
            var tempItem = {
              username: "",
              status: 0,
              id: response.data.data.good[i].id,
              name: response.data.data.good[i].name,
              img: response.data.data.good[i].url,
              type: response.data.data.good[i].category,
              description: response.data.data.good[i].productdescription,
              price: parseInt(response.data.data.good[i].money),
              number: 1,
              total: 0,
              time: "",
              likedClick: false,
              liked: parseInt(response.data.data.good[i].love),
              upVoteClick: false,
              upVote: parseInt(response.data.data.good[i].likenum),
              gender: "",
              age: "",
              tags: tempTags,
              comments: testComment,
            };
            this.$store.commit(INIT_PRODUCT_ITEMS, tempItem);
          }
          console.log(this.productItems)
          console.log("Before")
          console.log(this.tags)
          // 初始化 tags
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
          console.log("After")
          console.log(this.tags)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState({
      navTheme: (state) => {
        return state.theme.navTheme;
      },
      username: (state) => {
        return state.user.username;
      },
      avatar: (state) => {
        return state.user.avatar;
      },
      cartProductItems: (state) => {
        return state.product.cartProductItems;
      },
      recordProductItems: state => {
        return state.product.recordProductItems;
      },
      productItems: (state) => {
        return state.product.productItems;
      },
      tags: (state) => {
        return state.product.tags;
      },
      userLikedProduct: (state) => {
        return state.user.likedProduct;
      },
      userUpVoteProduct: (state) => {
        return state.user.upVoteProduct;
      },
    }),
    getCartProductNumber() {
      var total = 0;
      for (let i = 0; i < this.cartProductItems.length; i++) {
        total += this.cartProductItems[i].number;
      }
      return total;
    },
    getCartBadgeColor() {
      var color = 0;
      for (let i = 0; i < this.cartProductItems.length; i++) {
        color += this.cartProductItems[i].number;
      }
      if (color >= 10) {
        return "red";
      } else if (color >= 5) {
        return "orange";
      } else {
        return "green";
      }
    },
  },
};
</script>
