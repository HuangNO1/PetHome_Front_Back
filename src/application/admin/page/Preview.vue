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
            class="white--text"
            style="background-color: #505050"
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
                          v-for="(src, index) in scope.images"
                          :src="src"
                          :key="index"
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
                    <v-subheader>Gender</v-subheader>
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
              v-show="!viewProductItemDetail.likedClick"
              fab
              icon
              color="pink"
            >
              <v-icon>mdi-heart-multiple-outline</v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              v-show="viewProductItemDetail.likedClick"
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
      <!-- 產品描述 -->
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
            <div class="text-justify subtitle-1 mr-10 ml-10">
              <markdown-it-vue :content="viewProductItemDetail.description" />
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
            <v-row class="ml-4 mr-4" v-if="loginSuccess">
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
            <v-row class="mb-3" v-if="loginSuccess">
              <v-spacer></v-spacer>
              <v-btn color="primary" class="mr-10">Send</v-btn>
            </v-row>
            <v-divider v-if="loginSuccess"></v-divider>
            <!-- 談論區 -->
            <v-row
              class="ml-4 mr-4"
              v-for="(item, index) in viewProductItemDetail.comments"
              :key="index"
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
                  <v-btn v-if="loginSuccess" text small color="error">
                    Delete
                  </v-btn>
                  <v-btn
                    v-if="loginSuccess"
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
    <!-- 如果沒使用者登入的請求登入 dialog -->
    <v-dialog v-model="signDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline red--text"
          >Hey! Please sign in.</v-card-title
        >
        <v-card-text>
          You Have not sign in. You must to sign in to do this action.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="signDialog = false">
            Get it
          </v-btn>
          <v-btn color="green darken-1" text href="/sign#/Login">
            Sign In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component";
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";

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
    Viewer,
    MarkdownItVue
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
      addCartSnackbarText: "",
      // 請求登入 dialog
      signDialog: false
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
        : this.$router.push("/Edit");
    },
    inited(viewer) {
      this.$viewer = viewer;
    },
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
      },
      email: state => {
        return state.user.email;
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
