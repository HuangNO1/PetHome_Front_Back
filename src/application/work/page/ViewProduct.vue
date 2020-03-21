<template>
  <div>
    <div style="height: 5rem;">
      <div style="position: fixed; z-index: 100;">
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
                        <span class="hidden-sm-and-down">{{
                          genders.gender
                        }}</span>
                      </v-btn>
                    </v-btn-toggle>
                  </v-row>
                  <!-- age -->
                  <v-row>
                    <v-subheader>Age</v-subheader>
                  </v-row>
                  <v-row>
                    <v-btn-toggle v-model="defaultAge" mandatory borderless>
                      <v-btn v-for="(ages, i) in productAge" :value="i" :key="i">
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
                      v-model="number"
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
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Viewer
  },
  data() {
    return {
      isActive: false,
      images: ["https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png"],
      defaultGender: "male",
      defaultAge: "",
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
      number: 1,
      // avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
      testCommentsData: testCommentsData
    };
  },
  methods: {
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push("/Home");
    },
    inited(viewer) {
      this.$viewer = viewer;
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
    })
  }
};
</script>
<style>
.displayImg {
  max-height: 20rem;
}
</style>
