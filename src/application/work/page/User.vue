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
              <v-btn block dark color="green" @click="editAvatarDialog = true"
                >Edit</v-btn
              >
            </v-card>
          </v-hover>
        </v-lazy>
      </v-col>
      <!-- edit avatar -->
      <v-dialog v-model="editAvatarDialog" width="500" persistent>
        <v-card>
          <v-card-title class="headline">AVATAR</v-card-title>
          <v-card-text style="display: flex; justify-content: center;">
            <v-img max-width="300" max-height="300" :src="imgDataUrl"></v-img>
          </v-card-text>
          <v-card-text style="text-align: center;">
            <v-text-field
              v-model="imgDataUrl"
              label="Avatar's URL"
              outlined
            ></v-text-field>
            <v-btn @click="imageUploadDialog = true">Upload Image</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="green">save</v-btn>
            <v-btn text color="red" @click="editAvatarDialog = false"
              >cencel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- image upload - - - - - - - - - - - - - - - - - - - -  -->
      <!--
      <my-upload
        field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="imageUploadShow"
        :width="300"
        :height="300"
        :url="SMMSuploadUrl"
        :params="params"
        :headers="headers"
        img-format="png"
        langType="zh-tw"
      ></my-upload>-->
      <v-dialog v-model="imageUploadDialog" width="600" persistent>
        <v-card>
          <v-card-title class="headline">AVATAR</v-card-title>
          <v-card-text>
            <vue-avatar
              :width="300"
              :height="300"
              :rotation="rotation"
              :scale="scale"
              ref="vueavatar"
              @vue-avatar-editor:image-ready="onImageReady"
            >
            </vue-avatar>
            <br />

            <v-slider
              v-model="scale"
              class="align-center"
              :max="3"
              :min="1"
              hide-details
              step="0.02"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="scale"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </template>
            </v-slider>
            <v-slider
              v-model="rotation"
              class="align-center"
              :max="360"
              :min="0"
              hide-details
              step="1"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="rotation"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </template>
            </v-slider>
            <br />
            <v-btn v-on:click="saveClicked">Save</v-btn>
            <br />
            <form id="form">
              <img id="finishUpload" ref="image" />
            </form>

            {{ url }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="green">save</v-btn>
            <v-btn text color="red" @click="imageUploadDialog = false"
              >cencel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--  - - - - - - right data- - - - - - - - - - - - - - - - - - -    -->
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
                <v-btn @click="addCreditDialog = true" icon>
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
    <!-- 充值對話窗 add credit -->
    <v-dialog v-model="addCreditDialog" max-width="600">
      <v-card>
        <v-card-title class="headline">ADD CREDIT</v-card-title>

        <v-card-text>
          <v-chip-group v-model="money" mandatory active-class="primary--text">
            <v-chip  filter style="width: 8rem; text-align: center;" v-for="tag in tags" :key="tag">
              $ {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="user.cash += tags[money]; addCreditDialog = false">
            add credit
          </v-btn>

          <v-btn color="red darken-1" text @click="addCreditDialog = false">
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import myUpload from "../components/vue-image-crop-upload/upload-2";

import Vue from "vue";
import { VueAvatar } from "vue-avatar-editor-improved";
import axios from "axios";
import Qs from "qs";

export default {
  components: {
    VueAvatar
    // "my-upload": myUpload
  },
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
        cash: 100,
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
      // crop image ----------------
      // imageUploadShow: false,
      // params: {
      //   // smfile: ""
      // },
      // headers: {
      //   type: "Content-Type",
      //   app: "application/xml"
      // },
      // imgDataUrl: "",
      imageUploadDialog: false,
      SMMSuploadUrl: "https://sm.ms/api/upload",
      rotation: 0,
      scale: 1,
      url: "",
      // 充值-------------------
      addCreditDialog: false,
      tags: [
        50,
        100,
        500,
        1000,
      ],
      money: 50,
    };
  },
  created() {
    this.imgDataUrl = this.user.avatar;
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
    },
    // crop image ------------------------------------
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    // cropSuccess(imgDataUrl, field) {
    //   console.log("-------- crop success --------");
    //   this.imgDataUrl = imgDataUrl;
    // },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    // cropUploadSuccess(jsonData, field) {
    //   console.log("-------- upload success --------");
    //   console.log(jsonData);
    //   console.log("field: " + field);
    // },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    // cropUploadFail(status, field) {
    //   console.log("-------- upload fail --------");
    //   console.log(status);
    //   console.log("field: " + field);
    // }
    saveClicked() {
      var img = this.$refs.vueavatar.getImageScaled();
      this.$refs.image.src = img.toDataURL();
      console.log(img);
      // axios
      //   .post("https://sm.ms/api/upload?ssl=true", {
      //     smfile: img
      //   })
      //   .then(res => {
      //     console.log(res.data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      const formData = new FormData(document.getElementById("form"));
      // const file = new FileReader();
      formData.append("smfile", img);
      this.url = "";
      // NProgress.inc();
      // fetch("https://sm.ms/api/upload?ssl=true", {
      //   method: "POST",
      //   body: formData
      // })
      //   .then(r => r.json())
      //   .then(res => {
      //     NProgress.done();
      //     this.url = res.data.url;
      //     this.flag = true;
      //   })
      //   .catch(err => {
      //     // alert("出错了 😭");
      //     this.flag = true;
      //     console.log(err);
      //   });
      axios
        .post("https://sm.ms/api/upload?ssl=true", {
          body: formData
        })
        .then(res => {
          this.url = res.data.url;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onImageReady() {
      this.scale = 1;
      this.rotation = 0;
    }
  }
  // post: function(url, data) {
  //   axios.defaults.headers.post["Content-Type"] =
  //     "application/x-www-form-urlencoded";
  //   let config = {
  //     //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
  //     url: url,

  //     // 请求方法同上
  //     method: "post", // default
  //     // 基础url前缀
  //     baseURL: "http://localhost:8080/work#/User",
  //     transformRequest: [
  //       function(data) {
  //         // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
  //         data = Qs.stringify({});
  //         return data;
  //       }
  //     ],

  //     transformResponse: [
  //       function(data) {
  //         // 这里提前处理返回的数据

  //         return data;
  //       }
  //     ],

  //     // 请求头信息
  //     headers: { "X-Requested-With": "XMLHttpRequest" },

  //     //parameter参数
  //     params: {
  //       timestamp: Date.parse(new Date()) / 1000
  //     },

  //     //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  //     data: data,

  //     //设置超时时间
  //     timeout: 5000,
  //     //返回数据类型
  //     responseType: "json" // default
  //   };
  //   return axios.post(url, data, this.config);
  // }
};
</script>
