<template>
  <div>
    <v-alert
      class="mt-10 mb-10 mr-4 ml-4 mx-auto"
      border="left"
      elevation="8"
      color="indigo"
      dark
    >
      You can edit your products' details.
    </v-alert>
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
          threshold: 1,
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
            threshold: 1,
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
              <v-chip v-for="(tag, i) in tags" :key="i"># {{ tag }}</v-chip>
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
            threshold: 1,
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
            threshold: 1,
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
                  size="150"
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
                  <v-chip class="ma-1" v-for="(tag, i) in item.tags" :key="i"
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
              <v-btn color="red" @click="deleteItemDialog(i)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                @click="editCurrentProductDetail(i)"
                fab
                icon
                small
                color="primary"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <!-- 這裡不需要這功能 -->
              <!--
              <v-btn class="mx-2" fab small icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>-->
              <!-- 點贊 
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
              </v-tooltip>-->
              <!-- 收藏 
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
              </v-btn>-->
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
    <!-- 編輯當前 Product item 的 Dialog -->
    <v-dialog v-model="editProductDialog" scrollable width="500" persistent>
      <v-card>
        <v-card-title class="primary lighten-1 white--text headline"
          >EDIT THE ITEM</v-card-title
        >
        <v-card-text class="mt-4 subtitle-1 red--text">
          Please complete the form to change the item's detail.
        </v-card-text>
        <v-card-text style="display: flex; justify-content: center;">
          <!-- 圖片 -->
          <v-img
            max-width="200"
            max-height="200"
            :src="editProductImageURL"
          ></v-img>
        </v-card-text>
        <v-card-text class="pt-1" style="text-align: center; height: 300px;">
          <!--
          {{ showProductItems[editTempIndex].img }} -
          {{ editProductImageURL !== showProductItems[editTempIndex].img
          }}<br />
          {{ showProductItems[editTempIndex].name }} -
          {{ editProductName !== showProductItems[editTempIndex].name }}<br />
          {{ showProductItems[editTempIndex].type }} -
          {{ editProductType !== showProductItems[editTempIndex].type }}<br />
          {{ showProductItems[editTempIndex].description }} -
          {{
            editProductDescription !==
              showProductItems[editTempIndex].description
          }}<br />
          {{ showProductItems[editTempIndex].price }} -
          {{ editProductPrice !== showProductItems[editTempIndex].price }}<br />
          {{ tempOriginEditProductTags }} -
          {{ editProductTags !== tempOriginEditProductTags }}<br />
          {{ editProductTags }}-->
          <!-- product image url -->
          <v-text-field
            v-model="editProductImageURL"
            prepend-icon="mdi-camera-image"
            label="Image's URL"
            outlined
            required
            :error-messages="editProductImageURLErrors"
            :success-messages="editProductImageURLSuccess"
            @input="$v.editProductImageURL.$touch()"
            @blur="$v.editProductImageURL.$touch()"
          ></v-text-field>
          <!-- product name -->
          <v-text-field
            v-model="editProductName"
            label="Name"
            outlined
            prepend-icon="mdi-paw"
            required
            :error-messages="editProductNameErrors"
            :success-messages="editProductNameSuccess"
            @input="$v.editProductName.$touch()"
            @blur="$v.editProductName.$touch()"
          ></v-text-field>
          <!-- product types -->
          <v-select
            v-model="editProductType"
            :items="editProductTypes"
            label="Type"
            prepend-icon="mdi-chart-pie"
            outlined
            required
            :error-messages="editProductTypeErrors"
            :success-messages="editProductTypeSuccess"
            @input="$v.editProductType.$touch()"
            @blur="$v.editProductType.$touch()"
          ></v-select>
          <!-- product description -->
          <v-textarea
            outlined
            v-model="editProductDescription"
            label="Description"
            value=""
            prepend-icon="mdi-tag-heart"
            placeholder="**You can write it by markdown.**"
            required
            :error-messages="editProductDescriptionErrors"
            :success-messages="editProductDescriptionSuccess"
            @input="$v.editProductDescription.$touch()"
            @blur="$v.editProductDescription.$touch()"
          ></v-textarea>
          <!-- product price -->
          <v-text-field
            v-model="editProductPrice"
            label="Price"
            outlined
            prepend-icon="mdi-cash-usd"
            required
            :error-messages="editProductPriceErrors"
            :success-messages="editProductPriceSuccess"
            @input="$v.editProductPrice.$touch()"
            @blur="$v.editProductPrice.$touch()"
          ></v-text-field>

          <vue-tags-input
            v-model="editProductTag"
            :tags="editProductTags"
            @tags-changed="(newTags) => (editProductTags = newTags)"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="editProductDialog = false">
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            :disabled="adjustEditProductValid"
            @click="executeEditProductSuccess"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 這裡不需要這功能 -->
    <!--
    <v-snackbar v-model="snackbar" top :timeout="3000">
      {{ text }} have added to cart.
      <v-btn color="pink" icon fab @click="snackbar = false">
        <v-icon dark>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>
    -->
    <!-- 如果沒使用者登入的請求登入 dialog 
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
    </v-dialog>-->

    <!-- 添加 Product 的按鈕 -->
    <div class="addItemIconBtn">
      <v-btn
        color="success"
        depressed
        fab
        large
        @click="openAddNewProductDialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <!-- 添加 Product 的 Dialog -->
    <v-dialog v-model="addNewProductDialog" scrollable width="500" persistent>
      <v-card>
        <v-card-title class="primary lighten-1 white--text headline"
          >ADD NEW ITEM</v-card-title
        >
        <v-card-text class="mt-4 subtitle-1 red--text">
          Please complete the form to add a new item.
        </v-card-text>
        <v-card-text style="display: flex; justify-content: center;">
          <!-- 圖片 -->
          <v-img
            max-width="200"
            max-height="200"
            :src="newProductImageURL"
          ></v-img>
        </v-card-text>
        <v-card-text class="pt-1" style="text-align: center; height: 300px;">
          <!-- product image url -->
          <v-text-field
            v-model="newProductImageURL"
            prepend-icon="mdi-camera-image"
            label="Image's URL"
            outlined
            required
            :error-messages="newProductImageURLErrors"
            :success-messages="newProductImageURLSuccess"
            @input="$v.newProductImageURL.$touch()"
            @blur="$v.newProductImageURL.$touch()"
          ></v-text-field>
          <!-- product name -->
          <v-text-field
            v-model="newProductName"
            label="Name"
            outlined
            prepend-icon="mdi-paw"
            required
            :error-messages="newProductNameErrors"
            :success-messages="newProductNameSuccess"
            @input="$v.newProductName.$touch()"
            @blur="$v.newProductName.$touch()"
          ></v-text-field>
          <!-- product types -->
          <v-select
            v-model="newProductType"
            :items="newProductTypes"
            label="Type"
            prepend-icon="mdi-chart-pie"
            outlined
            required
            :error-messages="newProductTypeErrors"
            :success-messages="newProductTypeSuccess"
            @input="$v.newProductType.$touch()"
            @blur="$v.newProductType.$touch()"
          ></v-select>
          <!--{{newProductType}}-->
          <!-- product description -->
          <v-textarea
            outlined
            v-model="newProductDescription"
            label="Description"
            value=""
            prepend-icon="mdi-tag-heart"
            placeholder="**You can write it by markdown.**"
            required
            :error-messages="newProductDescriptionErrors"
            :success-messages="newProductDescriptionSuccess"
            @input="$v.newProductDescription.$touch()"
            @blur="$v.newProductDescription.$touch()"
          ></v-textarea>
          <!-- product price -->
          <v-text-field
            v-model="newProductPrice"
            label="Price"
            outlined
            prepend-icon="mdi-cash-usd"
            required
            :error-messages="newProductPriceErrors"
            :success-messages="newProductPriceSuccess"
            @input="$v.newProductPrice.$touch()"
            @blur="$v.newProductPrice.$touch()"
          ></v-text-field>

          <vue-tags-input
            v-model="newProductTag"
            :tags="newProductTags"
            @tags-changed="(newTags) => (newProductTags = newTags)"
          />
          {{ newProductTags }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="addNewProductDialog = false">
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            :disabled="adjustNewProductValid"
            @click="executeNewProductSuccess"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    <v-snackbar v-model="removeItemSnackbar" top :timeout="3000">
      The Pet Have being Removed.
      <v-btn color="pink" icon fab @click="removeItemSnackbar = false">
        <v-icon dark>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import Affix from "../components/Affix/Affix";
import { mapState, mapMutations } from "vuex";
import {
  ADD_TO_CART,
  VIEW_PRODUCT_ITEM_DETAIL,
} from "../store/mutations-types/product";
import {
  REMOVE_USER_LIKE_PRODUCT,
  ADD_USER_LIKE_PRODUCT,
  REMOVE_USER_UP_VOTE_PRODUCT,
  ADD_USER_UP_VOTE_PRODUCT,
} from "../store/mutations-types/user.js";
import Cookies from "js-cookie"; // 引入 cookie API
import VueTagsInput from "@johmun/vue-tags-input"; // 引入 tag-input
// 引入 vuelidate 前端輕型表單驗證
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  withParams,
  numeric,
  decimal,
} from "vuelidate/lib/validators";

const imageUrl = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;

export default {
  // vuelidate
  mixins: [validationMixin],

  validations: {
    editProductImageURL: {
      required,
      imageUrlValid: imageUrl,
    },
    editProductName: {
      required,
    },
    editProductType: {
      required,
    },
    editProductDescription: {
      required,
    },
    editProductPrice: {
      required,
      decimal,
    },
    newProductImageURL: {
      required,
      imageUrlValid: imageUrl,
    },
    newProductName: {
      required,
    },
    newProductType: {
      required,
    },
    newProductDescription: {
      required,
    },
    newProductPrice: {
      required,
      decimal,
    },
  },
  components: {
    Affix,
    VueTagsInput,
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
      // 輪播
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: [
        "ALL 15% OFF",
        "NEW PRODUCT PUBLISHING",
        "95% POSITIVE FEEDBACK",
        "MEMBER CARD BENEFITS",
        "GREAT",
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
        { title: "All", icon: "mdi-history" },
        { title: "Dog", icon: "mdi-dog-side" },
        { title: "Cat", icon: "mdi-cat" },
        { title: "Fox", icon: "mdi-firefox" },
        { title: "Fish", icon: "mdi-fishbowl" },
        { title: "Bird", icon: "mdi-twitter" },
      ],
      // tags
      selectedTags: [],
      // 提示窗
      // snackbar: false,
      // text: "",
      // product test--------------------------------
      showProductItems: [],
      recommendProductItems: [], // 推薦的商品
      initRecommendProductItemsURL: "",
      // addCartSameURL: "",
      // addCartURL: "",
      // // 使用者的 like 與 up vote
      // updateUserLikedURL: "",
      // updateUserUpVoteURL: "",
      // 是否展示使用者喜歡的產品
      isClickShowUserLike: false,
      // // 請求登入 dialog
      // signDialog: false,

      // 編輯當前產品的 dialog
      editProductDialog: false,
      // 編輯當前產品的 dialog 欄位
      editProductImageURL: "",
      editProductName: "",
      editProductType: "",
      editProductTypes: ["Dog", "Cat", "fox", "Fish", "Bird"],
      editProductDescription: "",
      editProductPrice: "",
      editProductTags: [],
      editProductTag: "",
      // 紀錄正在編輯的 item index
      editTempIndex: 0,

      // error
      editProductImageURLError: true,
      editProductNameError: true,
      editProductTypeError: true,
      editProductDescriptionError: true,
      editProductPriceError: true,

      // 添加新產品的 dialog
      addNewProductDialog: false,
      // 添加新產品的 dialog 欄位
      newProductImageURL: "",
      newProductName: "",
      newProductType: "",
      newProductTypes: ["Dog", "Cat", "fox", "Fish", "Bird"],
      newProductDescription: "",
      newProductPrice: "",
      newProductTags: [],
      newProductTag: "",

      // error
      newProductImageURLError: true,
      newProductNameError: true,
      newProductTypeError: true,
      newProductDescriptionError: true,
      newProductPriceError: true,

      tempOriginEditProductTags: [],
      // delete item
      deleteDialog: false,
      comfirmDelete: false,
      deleteItem: {
        index: 0,
      },
      // axios
      updateProductURL: "",
      addNewProductURL: "",
      deleteProductURL: "",
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
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
        if (type === "All") {
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

    filterFromPriceRange() {
      var temp = this.showProductItems;
      this.showProductItems = [];
      setTimeout(() => {
        this.showProductItems = temp.filter((e) => {
          return e.price >= this.priceRange[0] && e.price <= this.priceRange[1];
        });
      }, 100);
    },
    toViewProduct(item) {
      // 跳轉到 viewProduct 子組件檢視產品詳細，并添加 query string 作為参数
      this.$router.push({ path: "/Preview", query: { id: item.id } });
    },

    showUserLikeProduct() {
      // 顯示使用者喜歡的產品
      this.isClickShowUserLike = !this.isClickShowUserLike;

      // 這裡是因為因應管理員界面，所以註解掉

      // this.showProductItems = [];
      // if (this.isClickShowUserLike === true) {
      //   setTimeout(() => {
      //     this.showProductItems = this.productItems.filter((e) => {
      //       return e.likedClick === true;
      //     });
      //   }, 100);
      // } else {
      //   setTimeout(() => {
      //     this.showProductItems = this.productItems;
      //   }, 100);
      // }
    },
    // 編輯當前 product item 的 dialog
    editCurrentProductDetail(index) {
      this.editTempIndex = index;
      // 編輯當前的 product item
      this.editProductDialog = true;
      // 初始化
      this.editProductImageURL = this.showProductItems[index].img;
      this.editProductName = this.showProductItems[index].name;
      this.editProductType = this.showProductItems[index].type;
      this.editProductDescription = this.showProductItems[index].description;
      this.editProductPrice = this.showProductItems[index].price;
      this.editProductTags = [];
      for (let i = 0; i < this.showProductItems[index].tags.length; i++) {
        var temp = { text: "", tiClasses: ["ti-valid"] };
        temp.text = this.showProductItems[index].tags[i];
        this.editProductTags.push(temp);
      }
      this.editProductImageURLError = false;
      this.editProductNameError = false;
      this.editProductTypeError = false;
      this.editProductDescriptionError = false;
      this.editProductPriceError = false;
    },
    // 開啟添加新 product item 的 dialog
    openAddNewProductDialog() {
      // 開啟 dialog
      this.addNewProductDialog = true;
      // 初始化
      this.$v.newProductImageURL.$reset();
      this.$v.newProductName.$reset();
      this.$v.newProductType.$reset();
      this.$v.newProductDescription.$reset();
      this.$v.newProductPrice.$reset();
      this.newProductImageURL = "";
      this.newProductName = "";
      this.newProductType = "";
      this.newProductDescription = "";
      this.newProductPrice = "";
      this.newProductImageURLError = true;
      this.newProductNameError = true;
      this.newProductTypeError = true;
      this.newProductDescriptionError = true;
      this.newProductPriceError = true;
    },
    // 編輯當前 product item 成功動作
    executeEditProductSuccess() {
      // 先寫入新的內容
      this.showProductItems[this.editTempIndex].img = this.editProductImageURL;

      this.showProductItems[this.editTempIndex].name = this.editProductName;

      this.showProductItems[this.editTempIndex].type = this.editProductType;

      this.showProductItems[
        this.editTempIndex
      ].description = this.editProductDescription;

      this.showProductItems[this.editTempIndex].price = this.editProductPrice;

      this.showProductItems[this.editTempIndex].tags = [];
      for (let i = 0; i < this.editProductTags.length; i++) {
        this.showProductItems[this.editTempIndex].tags.push(
          this.editProductTags[i].text
        );
      }

      // 關掉 dialog
      this.editProductDialog = false;

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
      }
    },
    // 添加新 product item 成功動作
    executeNewProductSuccess() {
      var tempNewTags = [];

      for (let i = 0; i < this.newProductTags.length; i++) {
        tempNewTags.push(this.newProductTags[i].text);
      }

      var newProductItem = {
        username: "",
        status: 0,
        id: 1,
        name: this.newProductName,
        img: this.newProductImageURL,
        type: this.newProductType,
        description: this.newProductDescription,
        price: this.newProductPrice,
        number: 1,
        total: 0,
        time: "",
        likedClick: false,
        liked: 0,
        upVoteClick: false,
        upVote: 0,
        gender: "",
        age: "",
        tags: tempNewTags,
        comments: [],
      };
      // 推入 VueX
      this.productItems.push(newProductItem);

      // close dialog
      this.addNewProductDialog = false;
    },
    deleteItemDialog(index) {
      this.deleteItem.index = index;
      this.deleteItem.id = this.showProductItems[index].id;
      this.deleteItem.name = this.showProductItems[index].name;
      this.deleteItem.age = this.showProductItems[index].age;
      this.deleteItem.gender = this.showProductItems[index].gender;
      this.deleteDialog = true;
    },
    deleteProduct(index) {
      this.showProductItems.splice(index, 1);
      this.removeItemSnackbar = true;
      this.deleteDialog = false;
      this.$store.commit(UPDATE_CART_ITEMS, this.cartProduct);
    },
  },
  computed: {
    // get data from vuex
    ...mapState({
      cartProductItems: (state) => {
        return state.product.cartProductItems;
      },
      recordProductItems: (state) => {
        return state.product.recordProductItems;
      },
      productItems: (state) => {
        return state.product.productItems;
      },
      userLikedProduct: (state) => {
        return state.user.likedProduct;
      },
      userUpVoteProduct: (state) => {
        return state.user.upVoteProduct;
      },
      tags: (state) => {
        return state.product.tags;
      },
    }),

    // vuelidate 輕型表單驗證
    // errors---------------------------------------
    // edit
    editProductImageURLErrors() {
      const errors = [];
      if (!this.$v.editProductImageURL.$dirty) return errors;
      !this.$v.editProductImageURL.required &&
        errors.push("Image is required.");
      !this.$v.editProductImageURL.imageUrlValid &&
        errors.push("Image is invalid.");
      this.editProductImageURLError = true;
      return errors;
    },
    editProductNameErrors() {
      const errors = [];
      if (!this.$v.editProductName.$dirty) return errors;
      !this.$v.editProductName.required && errors.push("Name is required.");
      this.editProductNameError = true;
      return errors;
    },
    editProductTypeErrors() {
      const errors = [];
      if (!this.$v.editProductType.$dirty) return errors;
      !this.$v.editProductType.required && errors.push("Type is required.");
      this.editProductTypeError = true;
      return errors;
    },
    editProductDescriptionErrors() {
      const errors = [];
      if (!this.$v.editProductDescription.$dirty) return errors;
      !this.$v.editProductDescription.required &&
        errors.push("Description is required.");
      this.editProductDescriptionError = true;
      return errors;
    },
    editProductPriceErrors() {
      const errors = [];
      if (!this.$v.editProductPrice.$dirty) return errors;
      !this.$v.editProductPrice.required && errors.push("Price is required.");
      (!this.$v.editProductPrice.decimal || this.editProductPrice < 0) &&
        errors.push("Must be a positive and real number.");
      this.editProductPriceError = true;
      return errors;
    },
    // new
    newProductImageURLErrors() {
      const errors = [];
      if (!this.$v.newProductImageURL.$dirty) return errors;
      !this.$v.newProductImageURL.required && errors.push("Image is required.");
      !this.$v.newProductImageURL.imageUrlValid &&
        errors.push("Image is invalid.");
      this.newProductImageURLError = true;
      return errors;
    },
    newProductNameErrors() {
      const errors = [];
      if (!this.$v.newProductName.$dirty) return errors;
      !this.$v.newProductName.required && errors.push("Name is required.");
      this.newProductNameError = true;
      return errors;
    },
    newProductTypeErrors() {
      const errors = [];
      if (!this.$v.newProductType.$dirty) return errors;
      !this.$v.newProductType.required && errors.push("Type is required.");
      this.newProductTypeError = true;
      return errors;
    },
    newProductDescriptionErrors() {
      const errors = [];
      if (!this.$v.newProductDescription.$dirty) return errors;
      !this.$v.newProductDescription.required &&
        errors.push("Description is required.");
      this.newProductDescriptionError = true;
      return errors;
    },
    newProductPriceErrors() {
      const errors = [];
      if (!this.$v.newProductPrice.$dirty) return errors;
      !this.$v.newProductPrice.required && errors.push("Price is required.");
      (!this.$v.newProductPrice.decimal || this.newProductPrice < 0) &&
        errors.push("Must be a positive and real number.");
      this.newProductPriceError = true;
      return errors;
    },
    // success -----------------------------------
    editProductImageURLSuccess() {
      if (
        this.editProductImageURL !== "" &&
        this.$v.editProductImageURL.imageUrlValid
      ) {
        this.editProductImageURLError = false;
        console.log("editProductImageURLSuccess");
        return "Image is OK.";
      }
    },
    editProductNameSuccess() {
      if (this.editProductName !== "") {
        this.editProductNameError = false;
        console.log("editProductNameSuccess");
        return "Name is OK.";
      }
    },
    editProductTypeSuccess() {
      if (this.editProductType !== "") {
        this.editProductTypeError = false;
        console.log("editProductTypeSuccess");
        return "Type is OK.";
      }
    },
    editProductDescriptionSuccess() {
      if (this.editProductDescription !== "") {
        this.editProductDescriptionError = false;
        console.log("editProductDescriptionSuccess");
        return "Description is OK.";
      }
    },
    editProductPriceSuccess() {
      if (
        this.editProductPrice !== "" &&
        this.$v.editProductPrice.decimal &&
        this.editProductPrice >= 0
      ) {
        this.editProductPriceError = false;
        console.log("editProductPriceSuccess");
        return "Price is OK.";
      }
    },
    // new
    newProductImageURLSuccess() {
      if (
        this.newProductImageURL !== "" &&
        this.$v.newProductImageURL.imageUrlValid
      ) {
        this.newProductImageURLError = false;
        console.log("newProductImageURLSuccess");
        return "Image is OK.";
      }
    },
    newProductNameSuccess() {
      if (this.newProductName !== "") {
        this.newProductNameError = false;
        console.log("newProductNameSuccess");
        return "Name is OK.";
      }
    },
    newProductTypeSuccess() {
      if (this.newProductType !== "") {
        this.newProductTypeError = false;
        console.log("newProductTypeSuccess");
        return "Type is OK.";
      }
    },
    newProductDescriptionSuccess() {
      if (this.newProductDescription !== "") {
        this.newProductDescriptionError = false;
        console.log("newProductDescriptionSuccess");
        return "Description is OK.";
      }
    },
    newProductPriceSuccess() {
      if (
        this.newProductPrice !== "" &&
        this.$v.newProductPrice.decimal &&
        this.newProductPrice >= 0
      ) {
        this.newProductPriceError = false;
        console.log("newProductPriceSuccess");
        return "Price is OK.";
      }
    },
    // 判斷是否可以變更編輯的 product detail
    adjustEditProductValid() {
      this.tempOriginEditProductTags = [];
      for (
        let i = 0;
        i < this.showProductItems[this.editTempIndex].tags.length;
        i++
      ) {
        var temp = { text: "", tiClasses: ["ti-valid"] };
        temp.text = this.showProductItems[this.editTempIndex].tags[i];
        this.tempOriginEditProductTags.push(temp);
      }
      // return (
      //   this.editProductImageURLError ||
      //   this.editProductNameError ||
      //   this.editProductTypeError ||
      //   this.editProductDescriptionError ||
      //   this.editProductPriceError ||
      //   (this.editProductImageURL ===
      //     this.showProductItems[this.editTempIndex].img &&
      //     this.editProductName ===
      //       this.showProductItems[this.editTempIndex].name &&
      //     this.editProductType ===
      //       this.showProductItems[this.editTempIndex].type &&
      //     this.editProductDescription ===
      //       this.showProductItems[this.editTempIndex].description &&
      //     this.editProductPrice ===
      //       this.showProductItems[this.editTempIndex].price &&
      //     this.editProductTags === this.tempOriginEditProductTags)
      // );
      // 將 Array 字定義屬性 將 數組的內容轉成 Map 映射 使 不會因為對象數組的先後順序而導致報相等
      Array.prototype.equals = function(array) {
        // 先判斷數組是否為空
        if (!array) {
          return false;
        }
        // 判斷長度
        if (this.length != array.length) {
          return false;
        }
        // 轉成映射
        let textMap = this.reduce(function(map, obj) {
          map[obj.text] = true;
          return map;
        }, {});
        for (let i = 0; i < this.length; i++) {
          if (!textMap[array[i].text]) {
            return false;
          }
        }
        return true;
      };

      if (
        this.editProductImageURLError ||
        this.editProductNameError ||
        this.editProductTypeError ||
        this.editProductDescriptionError ||
        this.editProductPriceError
      ) {
        return true;
      } else {
        if (
          this.editProductImageURL !==
            this.showProductItems[this.editTempIndex].img ||
          this.editProductName !==
            this.showProductItems[this.editTempIndex].name ||
          this.editProductType !==
            this.showProductItems[this.editTempIndex].type ||
          this.editProductDescription !==
            this.showProductItems[this.editTempIndex].description ||
          this.editProductPrice !==
            this.showProductItems[this.editTempIndex].price ||
          !this.editProductTags.equals(this.tempOriginEditProductTags)
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    // 判斷是否可以添加新的 product item
    adjustNewProductValid() {
      return (
        this.newProductImageURLError ||
        this.newProductNameError ||
        this.newProductTypeError ||
        this.newProductDescriptionError ||
        this.newProductPriceError
      );
    },
  },
};
</script>
<style>
.addItemIconBtn {
  position: fixed;
  z-index: 10;
  right: 1rem;
  bottom: 1rem;
}
</style>
