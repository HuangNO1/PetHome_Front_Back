<template>
  <v-app>
    <v-app-bar id="bar" class="indigo" app>
      <!-- -->
      <v-avatar @click="Home" class="icon" size="108">
        <img alt="Avatar" src="../../assets/icons/sign.png" />
      </v-avatar>
      <span class="display-1 white--text" style="margin-left: 5rem;"
        >Pet Home</span
      >
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content id="content">
      <!-- If using vue-router -->
      <div class="flexBox">
        <div class="signCard">
          <router-view></router-view>
        </div>
      </div>
    </v-content>
    <v-footer
      id="footer"
      absolute
      class="font-weight-medium"
      color="primary lighten-1"
      app
    >
      <v-col class="py-4 text-center white--text" cols="12">
        <v-avatar size="36" @click="Home" style="margin-right: 1rem;">
          <img alt="Avatar" src="../../assets/icons/sign.png" /> </v-avatar
        >{{ new Date().getFullYear() }} — <strong>Pet Home</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  created() {
    document.location.href = "/sign#/Login";
  },
  methods: {
    Home() {
      document.location.href = "/introduce";
    }
  }
};
</script>
<style>
#bar {
}
#content {
  background: url("../../assets/img/thumb-1920-667923.png") no-repeat fixed
    center center/cover;
}
#footer {
  opacity: 70%;
}
.icon {
  display: absolute;
  top: 3rem;
  left: 3rem;
}
.flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}
.signCard {
  width: 30rem;
  background-color: white;
  opacity: 80%;
  box-shadow: 0 0 50px black;
  padding: 2rem;
  border-radius: 3px;
}
</style>
