<template>
  <v-app>
    <vue-scroll-progress-bar height="3px" />
    <v-navigation-drawer
      dark
      v-model="drawer"
      :color="primary"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <!-- -->
      <v-list nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar @click="toIntroduct">
            <img src="../../assets/icons/admin.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Pet Home</v-list-item-title>
            <!--<v-list-item-subtitle>Best Store</v-list-item-subtitle>-->
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- 側邊欄 -->
        <v-list-item
          v-if="!loginSuccess"
          v-for="item in adminItems"
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
        <v-list-item @click.stop="signOutDialog = true">
          <v-list-item-icon>
            <v-icon class="red--text">mdi-door-open</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="red--text">Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
      <v-app-bar-nav-icon @click="miniMenu"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <v-badge
          bordered
          bottom
          color="success"
          dot
          offset-x="20"
          offset-y="10"
        >
          <v-avatar size="36" style="margin-right: 1rem;">
            <img
              alt="Avatar"
              src="https://avatars0.githubusercontent.com/u/48636976?s=460&v=4"
            />
          </v-avatar>
        </v-badge>
        Administrator
      </v-app-bar-title>
      <v-spacer></v-spacer>
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
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Cookies from "js-cookie"; // 引入 cookie API
import axios from "axios"; // axios
// import HelloWorld from "./components/HelloWorld";
import { mapState, mapMutations } from "vuex";
import {
  UPDATE_CART_ITEMS,
  UPDATE_RECORD_ITEMS,
  INIT_PRODUCT_ITEMS,
  ADD_TO_RECORD,
  ADD_TO_CART,
} from "./store/mutations-types/product";
import { UPDATE_ALL_ORDER } from "./store/mutations-types/order";

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
  data() {
    return {
      signOutDialog: false,
      // 判斷側邊欄是否能見
      drawer: true,
      // 側邊欄 items
      adminItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Notify", icon: "mdi-bell" },
        { title: "Task", icon: "mdi-calendar-multiple-check" },
        { title: "Edit", icon: "mdi-grease-pencil" },
        { title: "Manage", icon: "mdi-account-cog" },
        { title: "About", icon: "mdi-forum" },
      ],
      miniVariant: false,
      // axios request
      getAllOrderURL: "http://35.238.213.70:8081/accountorder/findAll",
      getAllUserURL: "http://35.238.213.70:8081/account/findAll",
      getAllProductURL: "http://35.238.213.70:8081/product/findAll",
    };
  },
  created() {
    // 初始化所有產品
    this.getAllProduct();
    // 初始化所有訂單
    this.getAllOrder();
  },
  methods: {
    toIntroduct() {
      document.location.href = "/introduce";
    },
    miniMenu() {
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
      Cookies.remove("userPassword");
      document.location.href = "/introduce";
    },

    async getAllOrder() {
      axios({
        method: "get",
        url: this.getAllOrderURL,
        headers: {},
        data: {},
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
              price: parseInt(response.data.data[i].price),
              number: parseInt(response.data.data[i].figure),
              total: 0,
              time: response.data.data[i].shoptime,
              gender: response.data.data[i].gender,
              age: response.data.data[i].age,
            };
            this.$store.commit(UPDATE_ALL_ORDER, tempItem);
          }
          console.log("order");
          console.log(this.orderProductItems);
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
          console.log(this.productItems);
          console.log("Before");
          console.log(this.tags);
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
          }
          console.log("After");
          console.log(this.tags);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState({
      cartProductItems: (state) => {
        return state.product.cartProductItems;
      },
      orderProductItems: (state) => {
        return state.order.order;
      },
      recordProductItems: (state) => {
        return state.product.recordProductItems;
      },
      productItems: (state) => {
        return state.product.productItems;
      },
      tags: (state) => {
        return state.product.tags;
      },
    }),
  },
};
</script>
