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
              prepend-inner-icon="mdi-magnify"
              cache-items
              class="mx-4"
              flat
              hide-no-data
              hide-details
              label="What are you finding?"
              solo-inverted
            ></v-autocomplete>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-lazy>
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
                <v-list rounded shaped>
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
              <!-- sale sheet -->
              <v-card
                class="mx-auto text-center"
                :color="this.$store.state.theme.navTheme"
                dark
                max-width="256"
                elevation="12"
              >
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                      :value="saleValue"
                      color="rgba(255, 255, 255, .7)"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                      <template v-slot:label="item">
                        ${{ item.value }}
                      </template>
                    </v-sparkline>
                  </v-sheet>
                </v-card-text>

                <v-card-text>
                  <div class="display-1 font-weight-thin">Sales Last 24h</div>
                </v-card-text>
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
                  {{ item.name }}
                </div>
                <div class="ml-2" style="width: 27rem;">
                  {{ item.description }}
                </div>
              </v-col>
            </v-row>
            <v-card-actions>
              <span class="headline ml-2"
                ><v-icon large>mdi-cash-usd-outline</v-icon>
                {{ item.price }}</span
              >
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
  </div>
</template>
<script>
import Affix from "../components/Affix/Affix";
import { mapState, mapMutations } from "vuex";
import { ADD_TO_CART } from "../store/mutations-types/product";

export default {
  components: {
    Affix
  },
  data() {
    return {
      isActive: false,
      loading: false,
      autoCompleteItems: [],
      search: null,
      select: null,
      productKeyword: ["Cat", "Dog", "Fox", "Bird", "Fish"],
      productMenuItems: [
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
      saleValue: [423, 446, 675, 510, 590, 610, 760],
      // product test------------------------------------------------
      showProductItems: [],
      productItems: [
        // Dog ----------------
        {
          name: "Frozen Yogurt",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Dog",
          description: "Dog 1",
          price: 24,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Ice cream sandwich",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Dog",
          description: "Dog 2",
          price: 37,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Eclair",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Dog",
          description: "Dog 3",
          price: 3,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Cupcake",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Dog",
          description: "Dog 4",
          price: 23,
          number: 1,
          total: 0,
          time: "",
          like: false
        },
        // cat --------------------------------
        {
          name: "Gingerbread",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Cat",
          description: "Cat 1",
          price: 30,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Jelly bean",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Cat",
          description: "Cat 2",
          price: 52,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Lollipop",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Cat",
          description: "Cat 3",
          price: 19,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Honeycomb",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Cat",
          description: "Cat 4",
          price: 77,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        // Fox -------------------------------
        {
          name: "Donut",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Fox",
          description: "Fox 1",
          price: 35,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "KitKat",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Fox",
          description: "Fox 2",
          price: 49,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Frozen Yogurt_1",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Fox",
          description: "Fox 3",
          price: 24,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Ice cream sandwich_",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Fox",
          description: "Fox 4",
          price: 37,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        // Fish -----------------------------------
        {
          name: "Eclair_1",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Fish",
          description: "Fish 1",
          price: 3,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Cupcake_1",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Fish",
          description: "Fish 2",
          price: 23,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Gingerbread_1",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Fish",
          description: "Fish 3",
          price: 30,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Jelly bean_1",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Fish",
          description: "Fish 4",
          price: 52,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        // bird ---------------------------------------
        {
          name: "Lollipop_1",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Bird",
          description: "Bird 1",
          price: 19,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Honeycomb_1",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Bird",
          description: "Bird 2",
          price: 77,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "Donut_1",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Bird",
          description: "Bird 3",
          price: 35,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        },
        {
          name: "KitKat_1",
          img: "https://i.loli.net/2020/03/12/XzTSKdPf2BGaJO1.png",
          type: "Bird",
          description: "Bird 4",
          price: 49,
          number: 1,
          total: 0,
          time: "",
          like: false,
          tag: []
        }
      ]

      // -----------------------------------------------------------
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.autoCompleteItems = this.productKeyword.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    MenuShowProduct(type) {
      this.showProductItems = this.productItems.filter(function(
        item,
        index,
        array
      ) {
        return item.type === type;
      });
    },
    addToCart(item) {
      this.$store.commit(ADD_TO_CART, item);
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
    })
  }
};
</script>
