<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="12">
        <v-select
          v-model="color"
          :items="colors"
          label="Color"
          @change="updateTheme"
        ></v-select>
      </v-col>

      <v-switch v-model="background" class="ma-2" label="Background"></v-switch>
    </v-row>
    <h1>{{ theme }}</h1>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { UPDATE_NAV_THEME } from "../store/mutations-types/theme";
// const data = localStorage.getItem("todoList")
//   ? JSON.parse(localStorage.getItem("todoList"))
//   : {
//       todo: []
//     };

export default {
  created() {
    // data.todo.push("navTheme");
    // localStorage.setItem("todoList", JSON.stringify(data));
    if(this.navTheme === "") {
      this.$store.commit(UPDATE_NAV_THEME, this.color);
    } else {
      this.color = this.navTheme;
    }
    
  },
  data() {
    return {
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"]
    };
  },
  methods: {
    // ...mapMutations(["updateTheme"]),
    updateTheme() {
      console.log("change theme: " + this.color);
      this.$store.commit(UPDATE_NAV_THEME, this.color);
    }
  },
  computed: {
    ...mapState({
      navTheme: state => {
        return state.theme.navTheme;
      }
    })
  }
};
</script>
