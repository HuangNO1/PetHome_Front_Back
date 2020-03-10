<template>
  <div>
    <v-row justify="center">
      <v-col md="auto">
        <v-hover v-slot:default="{ hover }">
          <v-card max-width="300" class="mx-auto" :elevation="hover ? 24 : 3">
            <v-img max-width="300" :src="user.avatar"></v-img>
          </v-card>
        </v-hover>
      </v-col>
      <v-col md="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 24 : 3" class="mb-4">
            <v-card-title>
              <v-icon class="mr-4">mdi-account</v-icon>
              Username
            </v-card-title>
            <v-card-text>{{ user.name }}</v-card-text>
          </v-card>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 24 : 3" class="mb-4">
            <v-card-title>
              <v-icon class="mr-4">mdi-tag-heart</v-icon>
              Description
            </v-card-title>
            <v-card-text>{{ user.description }}</v-card-text>
          </v-card>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 24 : 3" class="mb-4">
            <v-card-title>
              <v-icon class="mr-4">mdi-email</v-icon>
              E-mail
            </v-card-title>
            <v-card-text>{{ user.email }}</v-card-text>
          </v-card>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 24 : 3" class="mb-4">
            <v-card-title>
              <v-icon class="mr-4">mdi-phone</v-icon>
              Phone Number
            </v-card-title>
            <v-card-text>{{ user.phone }}</v-card-text>
          </v-card>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 24 : 3" class="mb-4">
            <v-card-title>
              <v-icon class="mr-4">mdi-cash-usd</v-icon>
              Cash
            </v-card-title>
            <v-card-text>{{ user.cash }}</v-card-text>
          </v-card>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 24 : 3" class="mb-4">
            <v-card-title>
              <v-icon class="mr-4">mdi-map-marker</v-icon>
              Address
            </v-card-title>
            <v-card-text>{{ user.address }}</v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
        name: "Huang Po Hsun",
        description: "前端負責人，1804 黃柏曛，I love ArchLinux.",
        email: "fh831.cp9gw@gmail.com",
        phone: "1111111111",
        address: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        cash: 100
      }
    };
  }
};
</script>
