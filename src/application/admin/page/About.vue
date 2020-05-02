<template>
  <div>
    <div class="pa-4 text-center">
      <v-img
        class="mb-4"
        contain
        height="128"
        src="../../../assets/icons/cart.svg"
      ></v-img>
      <h3 class="title font-weight-light mb-2">Welcome to Pet Home.</h3>
      <div class="caption grey--text mb-2">
        Pet Home is your best choice.
      </div>
    </div>
    <div>
      <v-row>
        <v-col>
          <v-lazy
            v-model="isActive"
            :options="{
              threshold: 1
            }"
            transition="slide-x-reverse-transition"
            origin="top right 50"
          >
            <v-card>
              <v-card-title
                class="grayBG white--text center"
              >
                <span>About</span>
                <v-spacer></v-spacer>
                <v-card-text>
                  這項目是中南大學計算機學院軟件工程 18
                  級軟件開發架構課程的寵物商店，前後端分離。 指導老師 - 宋鐵
                  <br />
                </v-card-text>
              </v-card-title>
            </v-card>
          </v-lazy>
        </v-col>
      </v-row>
      <v-container>
        <v-container fluid>
          <v-row>
            <v-col v-for="(item, index) in developers" :key="index" :md="4" :sm="12">
              <v-lazy
                v-model="isActive"
                :options="{
                  threshold: 1
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card class="mx-auto" :elevation="hover ? 24 : 6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <img :src="item.avatar" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="headline">{{
                          item.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          item.subtitle
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-img :src="item.src" max-height="194"></v-img>

                    <v-card-text>
                      {{ item.text }}
                    </v-card-text>

                    <v-card-actions>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            target="_blank"
                            :href="item.github"
                            v-on="on"
                            icon
                          >
                            <v-icon>mdi-github</v-icon>
                          </v-btn>
                        </template>
                        <span>Github</span>
                      </v-tooltip>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-share-variant</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-lazy>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
      developers: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
          name: "Huang Po Hsun",
          subtitle: "rem",
          src: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
          text: "前端負責人，1804 黃柏曛，I love ArchLinux.",
          github: "https://github.com/HuangNO1"
        },
        {
          avatar: "https://avatars3.githubusercontent.com/u/45762207?s=460&v=4",
          name: "吳建賢",
          subtitle: "lumusen0305",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          text:
            "後端負責人，1805 吳建賢，I love playing Music. Guitar is my life.",
          github: "https://github.com/lumusen0305"
        },
        {
          avatar: "https://avatars3.githubusercontent.com/u/48643092?s=460&v=4",
          name: "馮武",
          subtitle: "FNGW",
          src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          text: "後端，1804 馮武，I love SQLite.",
          github: "https://github.com/FNGW"
        }
      ]
    };
  }
};
</script>
<style>
.grayBG {
    background-color: #504f4f;
}
</style>