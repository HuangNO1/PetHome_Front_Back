<template>
  <div>
    <v-row justify="center">
      <v-col md="auto">
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              max-width="300"
              class="mx-auto mb-4"
              :elevation="hover ? 24 : 3"
            >
              <v-img max-width="300" :src="user.avatar"></v-img>
            </v-card>
          </v-hover>
        </v-lazy>
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
          ><v-hover v-slot:default="{ hover }">
            <v-card
              max-width="300"
              max-height="300"
              class="mx-auto mb-4"
              :elevation="hover ? 24 : 3"
            >
              <v-btn block dark color="green" @click="editAvatarDialog = true">Edit</v-btn>
            </v-card>
          </v-hover>
        </v-lazy>
      </v-col>
      <!-- edit avatar -->
      <v-dialog v-model="editAvatarDialog" width="500" persistent>
        <v-card>
          <v-card-title class="headline">AVATAR</v-card-title>
          <v-card-text style="display: flex; justify-content: center;">
            <v-img max-width="300" max-height="300" :src="user.avatar"></v-img>
          </v-card-text>
          <v-card-text>
            <v-text-field v-model="user.avatar" label="Avatar's URL" outlined></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="green">save</v-btn>
            <v-btn text color="red" @click="editAvatarDialog = false">cencel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col md="6">
        <!-- username -->
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 3" class="mb-4">
              <v-card-title>
                <v-icon class="mr-4">mdi-account</v-icon>
                Username
              </v-card-title>
              <v-card-text>
                <v-btn @click="editName" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                {{ user.name }}
              </v-card-text>
              <!-- edit name -->
              <v-lazy
                v-model="isActiveEditName"
                :options="{
                  threshold: 1
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-card-text v-if="clickEditName">
                  <v-text-field label="Name" outlined></v-text-field>
                  <v-btn text color="green">save</v-btn>
                  <v-btn text color="red" @click="editName">cencel</v-btn>
                </v-card-text>
              </v-lazy>
            </v-card>
          </v-hover>
        </v-lazy>
        <!-- Description-->
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 3" class="mb-4">
              <v-card-title>
                <v-icon class="mr-4">mdi-tag-heart</v-icon>
                Description
              </v-card-title>
              <v-card-text>
                <v-btn @click="editDescription" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                {{ user.description }}
              </v-card-text>
              <!-- edit description -->
              <v-lazy
                v-model="isActiveEditDescription"
                :options="{
                  threshold: 1
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-card-text v-if="clickEditDescription">
                  <v-text-field label="Description" outlined></v-text-field>
                  <v-btn text color="green">save</v-btn>
                  <v-btn text color="red" @click="editDescription"
                    >cencel</v-btn
                  >
                </v-card-text>
              </v-lazy>
            </v-card>
          </v-hover>
        </v-lazy>
        <!-- email -->
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 3" class="mb-4">
              <v-card-title>
                <v-icon class="mr-4">mdi-email</v-icon>
                E-mail
              </v-card-title>
              <v-card-text>
                <v-btn icon>
                  <v-icon @click="editEmail">mdi-pencil</v-icon>
                </v-btn>
                {{ user.email }}
              </v-card-text>
              <!-- edit email -->
              <v-lazy
                v-model="isActiveEditEmail"
                :options="{
                  threshold: 1
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-card-text v-if="clickEditEmail">
                  <v-text-field label="E-mail" outlined></v-text-field>
                  <v-btn text color="green">save</v-btn>
                  <v-btn text color="red" @click="editEmail">cencel</v-btn>
                </v-card-text>
              </v-lazy>
            </v-card>
          </v-hover>
        </v-lazy>
        <!-- Phone number -->
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 3" class="mb-4">
              <v-card-title>
                <v-icon class="mr-4">mdi-phone</v-icon>
                Phone Number
              </v-card-title>
              <v-card-text>
                <v-btn @click="editPhone" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                {{ user.phone }}
              </v-card-text>
              <!-- edit phone number -->
              <v-lazy
                v-model="isActiveEditPhone"
                :options="{
                  threshold: 1
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-card-text v-if="clickEditPhone">
                  <v-text-field label="Phone Number" outlined></v-text-field>
                  <v-btn text color="green">save</v-btn>
                  <v-btn text color="red" @click="editPhone">cencel</v-btn>
                </v-card-text>
              </v-lazy>
            </v-card>
          </v-hover>
        </v-lazy>
        <!-- cash -->
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 3" class="mb-4">
              <v-card-title>
                <v-icon class="mr-4">mdi-cash-usd</v-icon>
                Cash
              </v-card-title>
              <v-card-text>
                <v-btn icon>
                  <v-icon>mdi-database-plus</v-icon>
                </v-btn>
                {{ user.cash }}
              </v-card-text>
            </v-card>
          </v-hover>
        </v-lazy>
        <!-- address -->
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 3" class="mb-4">
              <v-card-title>
                <v-icon class="mr-4">mdi-map-marker</v-icon>
                Address
              </v-card-title>
              <v-card-text>
                <v-btn @click="editAddress" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                {{ user.address }}
              </v-card-text>
              <!-- edit address -->
              <v-lazy
                v-model="isActiveEditAddress"
                :options="{
                  threshold: 1
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-card-text v-if="clickEditAddress">
                  <v-text-field label="Address" outlined></v-text-field>
                  <v-btn text color="green">save</v-btn>
                  <v-btn text color="red" @click="editAddress">cencel</v-btn>
                </v-card-text>
              </v-lazy>
            </v-card>
          </v-hover>
        </v-lazy>
      </v-col>
    </v-row>
  </div>
</template>
<script>



export default {
  data() {
    return {
      isActive: false,
      user: {
        avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
        name: "Huang Po Hsun",
        description: "前端負責人，1804 黃柏曛，I love ArchLinux.",
        email: "fh831.cp9gw@gmail.com",
        phone: "1111111111",
        address: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        cash: 100
      },
      editAvatarDialog: false,
      clickEditName: false,
      isActiveEditName: false,
      clickEditDescription: false,
      isActiveEditDescription: false,
      clickEditEmail: false,
      isActiveEditEmail: false,
      clickEditPhone: false,
      isActiveEditPhone: false,
      clickEditAddress: false,
      isActiveEditAddress: false,
    };
  },
  methods: {
    editName() {
      if (this.clickEditName === true) {
        this.clickEditName = false;
      } else {
        this.clickEditName = true;
      }
      console.log("this.clickEditName: " + this.clickEditName);
      isActiveEditName = false;
    },
    editDescription() {
      if (this.clickEditDescription === true) {
        this.clickEditDescription = false;
      } else {
        this.clickEditDescription = true;
      }
      console.log("this.clickEditDescription: " + this.clickEditDescription);
      isActiveEditDescription = false;
    },
    editEmail() {
      if (this.clickEditEmail === true) {
        this.clickEditEmail = false;
      } else {
        this.clickEditEmail = true;
      }
      console.log("this.clickEditEmail: " + this.clickEditEmail);
      isActiveEditEmail = false;
    },
    editPhone() {
      if (this.clickEditPhone === true) {
        this.clickEditPhone = false;
      } else {
        this.clickEditPhone = true;
      }
      console.log("this.clickEditPhone: " + this.clickEditPhone);
      isActiveEditPhone = false;
    },
    editAddress() {
      if (this.clickEditAddress === true) {
        this.clickEditAddress = false;
      } else {
        this.clickEditAddress = true;
      }
      console.log("this.clickEditAddress: " + this.clickEditAddress);
      isActiveEditAddress = false;
    }
  }
};
</script>
