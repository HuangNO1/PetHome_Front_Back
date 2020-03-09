<template>
  <div>
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
          <span>Record</span>
          <v-spacer></v-spacer>
        </v-card-title>
          <v-data-table
            :headers="recordHeaders"
            :items="recordProduct"
            :search="search"
            :items-per-page="8"
            hide-default-footer
            class="elevation-1"
            @page-count="pageCount = $event"
            :page.sync="page"
          ></v-data-table>
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      number: 0,
      selected: [],
      recordHeaders: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Price($)", value: "price" },
        { text: "number", value: "number" },
        { text: "Total($)", value: "total" }
      ],
      recordProduct: [
        {
          name: "Frozen Yogurt",
          price: 24,
          number: 1,
          total: 0
        },
        {
          name: "Ice cream sandwich",
          price: 37,
          number: 4,
          total: 2
        },
        {
          name: "Eclair",
          price: 3,
          number: 1,
          total: 2
        },
        {
          name: "Cupcake",
          price: 23,
          number: 3,
          total: 2
        },
        {
          name: "Gingerbread",
          price: 30,
          number: 10,
          total: 2
        },
        {
          name: "Jelly bean",
          price: 52,
          number: 1,
          total: 2
        },
        {
          name: "Lollipop",
          price: 19,
          number: 1,
          total: 2
        },
        {
          name: "Honeycomb",
          price: 77,
          number: 24,
          total: 2
        },
        {
          name: "Donut",
          price: 35,
          number: 3,
          total: 2
        },
        {
          name: "KitKat",
          price: 49,
          number: 1,
          total: 2
        }
      ],
      page: 1,
      pageCount: 0
    };
  }
};
</script>
