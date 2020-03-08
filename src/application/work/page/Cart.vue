<template>
  <div style="padding-bottom: 3rem;">
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
        <v-card-title
          :class="this.$store.state.theme.navTheme"
          class="white--text"
        >
          <span>{{ currentTitle }}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-window v-model="step">
          <!-- windows 1 : Cart -->
          <v-window-item :value="1">
            <v-data-table
              :headers="headers"
              :items="cartProduct"
              :search="search"
              item-key="name"
              show-select
              single-select
              items-per-page="7"
              hide-default-footer
              class="elevation-1"
              @page-count="pageCount = $event"
              :page.sync="page"
            >
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="(item, index) in items" :key="item.name">
                    <td>
                      <v-simple-checkbox
                        v-model="item.selected"
                        hide-details
                      ></v-simple-checkbox>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>
                      <number-input
                        style="width: 10rem; color: black;"
                        :value="item.number"
                        inline
                        center
                        controls
                      ></number-input>
                    </td>
                    <td>{{ item.total }}</td>
                    <td>
                      <v-btn color="red" @click="deleteItemDialog(index)" icon>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
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
    <!-- delete dialog -->
    <v-dialog v-model="deleteDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline red--text">WARNING</v-card-title>

        <v-card-text>
          Are you sure you want to remove <b>{{ deleteItem.name }}</b>?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Cancel
          </v-btn>

          <v-btn color="green darken-1" text @click="deleteProduct(deleteItem.index)">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      // cart data -----------------------
      search: "",
      headers: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Price($)", value: "price" },
        { text: "number", value: "number" },
        { text: "Total($)", value: "total" },
        { text: "Action", value: "action" }
      ],
      cartProduct: [
        {
          name: "Frozen Yogurt",
          price: 24,
          number: 1,
          total: 2,
          selected: false
        },
        {
          name: "Ice cream sandwich",
          price: 37,
          number: 4,
          total: 2,
          selected: false
        },
        {
          name: "Eclair",
          price: 24,
          number: 1,
          total: 2,
          selected: false
        },
        {
          name: "Cupcake",
          price: 24,
          number: 3,
          total: 2,
          selected: false
        },
        {
          name: "Gingerbread",
          price: 24,
          number: 10,
          total: 2,
          selected: false
        },
        {
          name: "Jelly bean",
          price: 24,
          number: 1,
          total: 2,
          selected: false
        },
        {
          name: "Lollipop",
          price: 24,
          number: 1,
          total: 2,
          selected: false
        },
        {
          name: "Honeycomb",
          price: 24,
          number: 24,
          total: 2,
          selected: false
        },
        {
          name: "Donut",
          price: 24,
          number: 3,
          total: 2,
          selected: false
        },
        {
          name: "KitKat",
          price: 24,
          number: 1,
          total: 2,
          selected: false
        }
      ],
      page: 1,
      pageCount: 0,
      cartSelected: [],

      // delete item----------------------
      deleteDialog: false,
      comfirmDelete: false,
      deleteItem: {
        index: 0
      },
      defaultItem: {
        name: "",
        price: 0,
        number: 0,
        total: 0,
        selected: false
      }
      //----------------------
    };
  },
  watch: {},
  methods: {
    cartProgress(val) {
      return this.progressIcons[val];
    },
    getColor(calories) {
      if (calories > 10) return "red";
      else if (calories > 4) return "orange";
      else return "green";
    },
    deleteItemDialog(index) {
      this.deleteItem.index = index;
      this.deleteItem.name = this.cartProduct[index].name;
      this.deleteDialog = true;
    },
    deleteProduct(index) {
      this.cartProduct.splice(index, 1);
      this.deleteDialog = false;
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
<style></style>
