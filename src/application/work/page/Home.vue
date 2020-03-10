<template>
  <div>
    <div>
      <!-- search bar -->
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
            :items="items"
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
    </div>
    <!-- product list menu - if width < 1264 -->
    <v-row justify="space-around">
      <v-col cols="12">
        <v-sheet elevation="8" class="py-4 px-1">
          <v-chip-group mandatory active-class="primary--text">
            <v-chip v-for="tag in tags" :key="tag">
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- product list menu - if width >= 1264 -->
    <v-row class="mb-6">
      <v-col md="auto">
        <div style="width: 256px;" class="mr-4">
          <affix :offset="80">
            <v-card elevation="10" width="256" class="mr-4 mb-4">
              <!--<v-navigation-drawer floating permanent>-->
              <v-list rounded shaped>
                <v-list-item
                  v-for="item in productItems"
                  :key="item.title"
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
                    <template v-slot:label="item"> ${{ item.value }} </template>
                  </v-sparkline>
                </v-sheet>
              </v-card-text>

              <v-card-text>
                <div class="display-1 font-weight-thin">Sales Last 24h</div>
              </v-card-text>
            </v-card>
          </affix>
        </div>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto mb-4 mr-4"
          elevation="10"
          max-width="900"
          style="display: inline-block;"
          v-for="i in 20"
          :key="i"
        >
          <v-row>
            <v-col md="auto">
              <v-avatar tile size="130" class="ml-4">
                <img
                  src="../../../assets/icons/webapp/apple-touch-icon-180x180.png"
                />
              </v-avatar>
            </v-col>
            <v-col>
              <div class="overline mb-2 ml-2">Pet Home</div>
              <div
                class="headline mb-2 ml-2"
                style="margin-bottom: 0; margin-top: 0;"
              >
                Huang Po Hsun's wife
              </div>
              <div class="ml-2" style="width: 27rem;">
                Greyhound divisely hello coldly uhdiouhvsiun jajnvivunvi
                avvndiun avndis asdvni asdnvilun avdnilndvi asdvnin fonwderfully
              </div>
            </v-col>
          </v-row>
          <v-card-actions>
            <span class="headline ml-2"
              ><v-icon large>mdi-cash-usd-outline</v-icon> 1000</span
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
                <v-btn class="mx-2" fab small dark color="success" v-on="on">
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
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Affix from "../components/Affix";

export default {
  components: {
    Affix
  },
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      product: ["Cat", "Dog", "Fox", "Bird", "Fish"],
      productItems: [
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
      saleValue: [423, 446, 675, 510, 590, 610, 760]
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
        this.items = this.product.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    }
  }
};
</script>
