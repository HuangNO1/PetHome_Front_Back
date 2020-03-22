<template>
  <v-app ref="contentStyle">
    <vue-scroll-progress-bar @complete="handleComplete" height="3px" />
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
        <v-list-item
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
            ></v-switch>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- comfirm Sign Out Dialog-->
    <v-dialog v-model="signOutDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline red white--text lighten-2" primary-title>
          <p>WARRING</p>
        </v-card-title>

        <v-card-text class="white title black--text" style="padding: 1rem;">
          Are you sure you want to sign out?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="white">
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="signOut">
            <span>Sure</span>
          </v-btn>
          <v-btn color="primary" text @click="signOutDialog = false">
            <span>Cancel</span>
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

// import HelloWorld from "./components/HelloWorld";
import { mapState, mapMutations } from "vuex";
import {
  UPDATE_NAV_THEME,
  UPDATE_NAV_IMAGE
} from "./store/mutations-types/theme";
import {
  UPDATE_USER_USERNAME,
  UPDATE_USER_AVATAR,
  UPDATE_USER_DESCRIPTION,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PHONE,
  UPDATE_USER_CASH,
  UPDATE_USER_ADDRESS,
  UPDATE_ALL_USER_DATA
} from "./store/mutations-types/user";
import {
  UPDATE_CART_ITEMS,
  UPDATE_RECORD_ITEMS,
  INIT_PRODUCT_ITEMS
} from "./store/mutations-types/product";

export default {
  name: "App",

  components: {},
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    }
  },

  data: vm => ({
    initialDark: vm.$vuetify ? vm.$vuetify.theme.dark : false
  }),

  beforeDestroy() {
    if (!this.$vuetify) return;

    this.$vuetify.theme.dark = this.initialDark;
  },
  created() {
    // 先獲取 cookie
    var userStatus = Cookies.get("userStatus");
    this.loginSuccess = (userStatus === undefined) ? false : true;
    // if (userStatus !== undefined) {
    //   獲取初始資料
    //   產品資料
    //   axios
    //     .post(this.initProductURL, params: userStatus)
    //     .then(response => {
    //       console.log(response);
    //       console.log(response.data);
    //       // 將產品資料寫入 Vuex
    //       this.$store.commit(INIT_PRODUCT_ITEMS, response.data);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   // 獲取使用者資料（包含主題）
    //   axios
    //     .post(this.initUserURL, params: userStatus)
    //     .then(response => {
    //       console.log(response);
    //       console.log(response.data);
    //       // 使用者基本資料
    //       this.$store.commit(UPDATE_USER_USERNAME, response.data.username);
    //       this.$store.commit(UPDATE_USER_AVATAR, response.data.avatar);
    //       this.$store.commit(UPDATE_USER_DESCRIPTION, response.data.description);
    //       this.$store.commit(UPDATE_USER_EMAIL, response.data.email);
    //       this.$store.commit(UPDATE_USER_PHONE, response.data.phone);
    //       this.$store.commit(UPDATE_USER_CASH, response.data.cash);
    //       this.$store.commit(UPDATE_USER_ADDRESS, response.data.address);
    //       // 購物車
    //       this.$store.commit(UPDATE_CART_ITEMS, response.data.cart);
    //       // 購物紀錄
    //       this.$store.commit(UPDATE_RECORD_ITEMS, response.data.record);
    //       // 主題
    //       this.$store.commit(UPDATE_NAV_THEME, response.data.navTheme);
    //       this.$store.commit(UPDATE_NAV_IMAGE, response.data.navImage);
    //       // 黑色 或 白色主題
    //       this.$vuetify.theme.dark = response.data.darkTheme;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   this.loginSuccess = true;
    // } else {
    //   this.loginSuccess = false;
    // }

    if (this.navTheme === "") {
      this.$store.commit(UPDATE_NAV_THEME, "teal");
    }
    // document.location.href = "/work#/Home";
    if (document.location.href === "/work") {
      document.location.href = "/work#/Home";
    }
  },
  data: () => ({
    initProductURL: "",
    initUserURL: "",
    // 判斷側邊欄是否能見
    drawer: true,
    // 側邊欄 items
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "Cart", icon: "mdi-cart" },
      { title: "Record", icon: "mdi-google-spreadsheet" },
      { title: "User", icon: "mdi-account" },
      { title: "Setting", icon: "mdi-cogs" },
      { title: "About", icon: "mdi-forum" }
    ],
    right: true,
    miniVariant: false,
    background: false,
    menuIsClose: false,
    menuItem: [
      { title: "Account", icon: "mdi-account", url: "User" },
      { title: "Cart", icon: "mdi-cart", url: "Cart" },
      { title: "Setting", icon: "mdi-cogs", url: "Setting" }
    ],
    signOutDialog: false,
    // 用來判斷是否登入成功，決定顯示右上角的使用者顯示
    loginSuccess: false
  }),
  methods: {
    toIntroduct() {
      document.location.href = "/introduce";
    },
    miniMenu() {
      const contentWidth = this.$refs.contentStyle.$el.clientWidth;
      console.log("contentWidth: " + contentWidth);
      console.log(
        "click Menu => " +
          "miniVariant: " +
          this.miniVariant +
          ", drawer: " +
          this.drawer +
          ", menuIsClose: " +
          this.menuIsClose
      );
      // open menu
      if (this.menuIsClose === true) {
        console.log("enter open");
        this.miniVariant = false;
        this.drawer = true;
        this.menuIsClose = false;
        console.log(
          "open Menu 1=> " +
            "miniVariant: " +
            this.miniVariant +
            ", drawer: " +
            this.drawer +
            ", menuIsClose: " +
            this.menuIsClose
        );
      } else {
        // close menu
        console.log("enter close");
        if (this.drawer === true) {
          this.miniVariant = true;
          // can't mini variant
          console.log(
            "close Menu 1=> " +
              "miniVariant: " +
              this.miniVariant +
              ", drawer: " +
              this.drawer +
              ", menuIsClose: " +
              this.menuIsClose
          );
          if (this.miniVariant === false) {
            // just close menu
            this.drawer = false;
            console.log(
              "close Menu 2=> " +
                "miniVariant: " +
                this.miniVariant +
                ", drawer: " +
                this.drawer +
                ", menuIsClose: " +
                this.menuIsClose
            );
          } else {
            this.drawer = true;
            console.log(
              "close Menu 3=> " +
                "miniVariant: " +
                this.miniVariant +
                ", drawer: " +
                this.drawer +
                ", menuIsClose: " +
                this.menuIsClose
            );
          }
          this.menuIsClose = true;
        } else {
          // menu is close, open it.
          this.miniVariant = false;
          this.drawer = true;
          this.menuIsClose = false;
          console.log(
            "open Menu 2=> " +
              "miniVariant: " +
              this.miniVariant +
              ", drawer: " +
              this.drawer +
              ", menuIsClose: " +
              this.menuIsClose
          );
        }
      }
      console.log("draw - " + this.drawer);
      console.log("miniVariant - " + this.miniVariant);
    },
    signOut() {
      document.location.href = "/introduce";
    }
  },
  computed: {
    ...mapState({
      navTheme: state => {
        return state.theme.navTheme;
      },
      username: state => {
        return state.user.username;
      },
      avatar: state => {
        return state.user.avatar;
      },
      cartProductItems: state => {
        return state.product.cartProductItems;
      }
    }),
    getCartProductNumber() {
      var total = 0;
      for(let i = 0; i < this.cartProductItems.length; i++) {
        total += this.cartProductItems[i].number;
      }
      return total;
    },
    getCartBadgeColor() {
      var color = 0;
      for(let i = 0; i < this.cartProductItems.length; i++) {
        color += this.cartProductItems[i].number;
      }
      if(color >= 10) {
        return "red";
      }
      else if(color >= 5) {
        return "orange";
      }
      else {
        return "green";
      }
    }
  }
};
</script>
