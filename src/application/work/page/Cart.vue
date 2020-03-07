<template>
  <div>
    <div>
      <v-row>
        <v-col class="pa-12">
          <v-range-slider
            :tick-labels="progress"
            :value="progressValue"
            min="0"
            max="3"
            ticks="always"
            tick-size="4"
            thumb-label="always"
            readonly
          >
            <template v-slot:thumb-label="props">
              <v-icon dark>
                {{ cartProgress(props.value) }}
              </v-icon>
            </template>
          </v-range-slider>
        </v-col>
      </v-row>
    </div>
    <div>
      <!-- search bar -->
      <v-card
        color="lighten-4"
        hover="true"
        style="margin-bottom: 1rem; padding: 1rem;"
        height="90"
      >
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              filled
              dense
              single-line
            ></v-text-field>
          </v-col>
          <v-col md="auto">
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-col>
          <v-col md="auto">
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div>
      <v-card elevation="10">
        <v-card-title :class="this.$store.state.theme.navTheme" class="white--text">
          <span>{{ currentTitle }}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-window v-model="step">
          <!-- windows 1 : Cart -->
          <v-window-item :value="1">
            <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
              item-key="name"
              show-select
              v-model="cartSelected"
              items-per-page="7"
              hide-default-footer
              class="elevation-1"
              @page-count="pageCount = $event"
              :page.sync="page"
            ></v-data-table>
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </v-window-item>
          <!-- windows 2 : Checkout -->
          <v-window-item :value="2">
            <v-card-text>
              <v-text-field label="Password" type="password"></v-text-field>
              <v-text-field
                label="Confirm Password"
                type="password"
              ></v-text-field>
              <span class="caption grey--text text--darken-1">
                Please enter a password for your account
              </span>
            </v-card-text>
          </v-window-item>
          <!-- windows 3 : Finish -->
          <v-window-item :value="3">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              ></v-img>
              <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
              <span class="caption grey--text">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 1" text @click="step--">
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="step === 3"
            color="primary"
            depressed
            @click="step++"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: 1,
      progressValue: [],
      progress: ["", "Cart", "Checkout", "Finish"],
      progressIcons: ["", "mdi-cart", "mdi-cash-usd", "mdi-briefcase-check"],
      loading: false,
      items: [],
      search: null,
      select: null,
      product: ["Cat", "Dog", "Fox", "Bird", "Fish"],
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
      cartItem: [
        {
          img: "",
          name: "",
          originPrice: "",
          num: "",
          total: ""
        }
      ],
      //-----------------------
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ],
      page: 1,
      pageCount: 0,
      cartSelected: []

      //----------------------
    };
  },
  watch: {},
  methods: {
    cartProgress(val) {
      return this.progressIcons[val];
    }
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          this.progressValue = [0, 1];
          return "Cart";
        case 2:
          this.progressValue = [0, 2];
          return "Checkout";
        default:
          this.progressValue = [0, 3];
          return "Finish Deal";
      }
    }
  }
};
</script>
