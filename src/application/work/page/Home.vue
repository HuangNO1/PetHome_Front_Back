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
        <v-sheet elevation="10" class="py-4 px-1">
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
      <div style="width: 256px;">
        <affix :offset="80">
          <v-card elevation="12" width="256">
            <!--<v-navigation-drawer floating permanent>-->
            <v-list rounded shaped>
              <v-list-item v-for="item in productItems" :key="item.title" link>
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
        
      </v-col>
      <v-col>
        <v-card
          class="mx-auto mb-4 mr-4"
          elevation="12"
          max-width="900"
          style="display: inline-block;"
          v-for="i in 20"
          :key="i"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1"
                >Headline 5</v-list-item-title
              >
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text>Button</v-btn>
            <v-btn text>Button</v-btn>
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
      ]
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
