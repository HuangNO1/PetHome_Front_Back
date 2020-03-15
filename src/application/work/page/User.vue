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
            <v-btn text color="red" @click="editAvatarDialog = false"
              >cencel</v-btn
            >
            <v-btn text color="green">save</v-btn>
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
                  <v-text-field
                    label="Username"
                    v-model="newUsername"
                    :error-messages="newUsernameErrors"
                    :success-messages="newUsernameSuccess"
                    :counter="20"
                    required
                    @input="$v.newUsername.$touch()"
                    @blur="$v.newUsername.$touch()"
                    outlined
                  ></v-text-field>
                  <v-btn text color="red" @click="editName">cencel</v-btn>
                  <v-btn
                    text
                    color="green"
                    :disabled="newUsernameError"
                    @click="submitNewUsername"
                    >save</v-btn
                  >
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
                  <v-text-field
                    v-model="newDescription"
                    label="Description"
                    :error-messages="newDescriptionErrors"
                    :success-messages="newDescriptionSuccess"
                    required
                    :counter="30"
                    @input="$v.newDescription.$touch()"
                    @blur="$v.newDescription.$touch()"
                    outlined
                  ></v-text-field>

                  <v-btn text color="red" @click="editDescription"
                    >cencel</v-btn
                  >
                  <v-btn
                    text
                    color="green"
                    :disabled="newDescriptionError"
                    @click="submitNewDescription"
                    >save</v-btn
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
                  <v-text-field
                    v-model="newEmail"
                    label="E-mail"
                    :error-messages="newEmailErrors"
                    :success-messages="newEmailSuccess"
                    required
                    @input="$v.newEmail.$touch()"
                    @blur="$v.newEmail.$touch()"
                    outlined
                  ></v-text-field>
                  <!-- email 需要驗證 -->
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="captcha"
                        :counter="4"
                        :error-messages="captchaErrors"
                        :success-messages="captchaSuccess"
                        label="Captcha"
                        required
                        outlined
                        @input="$v.captcha.$touch()"
                        @blur="$v.captcha.$touch()"
                      >
                        <v-icon slot="prepend" color="green"
                          >mdi-alpha-c-circle</v-icon
                        >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-btn
                        block
                        class="ma-2"
                        color="primary"
                        :loading="loading"
                        @click="loader = 'loading'"
                        rounded
                        dark
                        x-large
                        >Get Captcha</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-btn text color="red" @click="editEmail">cencel</v-btn>
                  <v-btn
                    text
                    color="green"
                    :disabled="captchaError"
                    @click="submitNewEmail"
                    >save</v-btn
                  >
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
                  <v-text-field
                    v-model="newPhone"
                    label="Phone Number"
                    :type="tel"
                    :error-messages="newPhoneErrors"
                    :success-messages="newPhoneSuccess"
                    required
                    @input="$v.newPhone.$touch()"
                    @blur="$v.newPhone.$touch()"
                    outlined
                  ></v-text-field>
                  <v-btn text color="red" @click="editPhone">cencel</v-btn>
                  <v-btn
                    text
                    color="green"
                    :disabled="newPhoneError"
                    @click="submitNewPhone"
                    >save</v-btn
                  >
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
                  <v-text-field
                    v-model="newAddress"
                    label="Address"
                    :error-messages="newAddressErrors"
                    :success-messages="newAddressSuccess"
                    :counter="50"
                    required
                    @input="$v.newAddress.$touch()"
                    @blur="$v.newAddress.$touch()"
                    outlined
                  ></v-text-field>
                  <v-btn text color="red" @click="editAddress">cencel</v-btn>
                  <v-btn
                    text
                    color="green"
                    :disabled="newAddressError"
                    @click="submitNewAddress"
                    >save</v-btn
                  >
                </v-card-text>
              </v-lazy>
            </v-card>
          </v-hover>
        </v-lazy>
        <!-- password -->
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
                <v-icon class="mr-4">mdi-lock</v-icon>
                Password
              </v-card-title>
              <v-card-text>
                <v-btn @click="editPassword" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                {{ user.password }}
              </v-card-text>
              <!-- edit password -->
              <v-lazy
                v-model="isActiveEditPassword"
                :options="{
                  threshold: 1
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-card-text v-if="clickEditPassword">
                  <v-text-field
                    v-model="originPassword"
                    label="Origin Password"
                    type="password"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="newPassword"
                    label="New Password"
                    :type="seePwd"
                    :error-messages="newPasswordErrors"
                    :success-messages="newPasswordSuccess"
                    required
                    @input="$v.newPassword.$touch()"
                    @blur="$v.newPassword.$touch()"
                    outlined
                  >
                    <v-icon slot="append" color="red" @click="eyeClick">
                      {{ eye }}
                    </v-icon>
                  </v-text-field>
                  <v-text-field
                    v-model="newRepeatPassword"
                    label="Repeat New Password"
                    :type="seeRepeatPwd"
                    :error-messages="newRepeatPasswordErrors"
                    :success-messages="newRepeatPasswordSuccess"
                    required
                    @input="$v.newRepeatPassword.$touch()"
                    @blur="$v.newRepeatPassword.$touch()"
                    outlined
                  >
                    <v-icon slot="append" color="red" @click="repeatEyeClick">{{
                      repeatEye
                    }}</v-icon>
                  </v-text-field>
                  <v-btn text color="red" @click="editPassword">cencel</v-btn>
                  <v-btn
                    text
                    color="green"
                    :disabled="newPasswordError || newRepeatPasswordError"
                    @click="submitNewPassword"
                    >save</v-btn
                  >
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
            <v-chip
              filter
              style="width: 8rem; text-align: center;"
              v-for="tag in tags"
              :key="tag"
            >
              $ {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="addCreditDialog = false">
            cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="submitAddCash">
            add credit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import myUpload from "../components/vue-image-crop-upload/upload-2";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  withParams
} from "vuelidate/lib/validators";
import Vue from "vue";
import { VueAvatar } from "vue-avatar-editor-improved";
import axios from "axios";
import Qs from "qs";

// chinese phone number
const isPhone = value => /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value);

export default {
  components: {
    VueAvatar
    // "my-upload": myUpload
  },
  mixins: [validationMixin],

  validations: {
    newUsername: {
      required,
      maxLength: maxLength(20),
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;
        // axios : verity the username is registered.
        /*
        var params = new URLSearchParams();
        params.append("username", this.name);
        axios
          .post(this.checkSameNameURL, params)
          .then(response => {
            console.log(response);
            console.log(response.data);
            if (response.data === false) {
              return false;
            } else {
              return true;
            }
          })
          .catch(error => {
            console.log(error);
          });
        */

        // simulate async call, fail for all logins with even length
        return true;
      }
    },
    newDescription: {
      required,
      maxLength: maxLength(30)
    },
    newEmail: {
      required,
      email,
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;
        // axios : verity the email is registered.
        /*
        var params = new URLSearchParams();
        params.append("email", this.email);
        axios
          .post(this.checkSameEmailURL, params)
          .then(response => {
            console.log(response);
            console.log(response.data);
            if (response.data === false) {
              return false;
            } else {
              return true;
            }
          })
          .catch(error => {
            console.log(error);
          });
          */
        // simulate async call, fail for all logins with even length
        return true;
      }
    },
    newPhone: {
      required,
      phoneValid: isPhone
    },
    newAddress: { required, maxLength: maxLength(50) },
    newPassword: { required, minLength: minLength(6) },
    newRepeatPassword: {
      required,
      sameAsPassword: sameAs("newPassword")
    },
    captcha: {
      required,
      maxLength: maxLength(4),
      minLength: minLength(4),
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;
        // axios : verity the captcha is true.
        /*
        var params = new URLSearchParams();
        params.append("captcha", this.captcha);
        axios
          .post(this.verifyCaptchaURL, params)
          .then(response => {
            console.log(response);
            console.log(response.data);
            if (response.data === false) {
              return false;
            } else {
              return true;
            }
          })
          .catch(error => {
            console.log(error);
          });
        */
        // simulate async call, fail for all logins with even length
        return true;
      }
    }
  },
  data: () => ({
    isActive: false,
    user: {
      avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
      name: "Huang Po Hsun",
      description: "前端負責人，1804 黃柏曛，I love ArchLinux.",
      email: "fh831.cp9gw@gmail.com",
      phone: "1111111111",
      address: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      password: "********",
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
    clickEditPassword: false,
    isActiveEditPassword: false,
    // 新的資料
    newUsername: "",
    newDescription: "",
    newEmail: "",
    newPhone: "",
    newAddress: "",
    originPassword: "",
    newPassword: "",
    newRepeatPassword: "",
    captcha: "",
    // 檢驗是否欄位填寫錯誤
    newUsernameError: true,
    newDescriptionError: true,
    newEmailError: true,
    newPhoneError: true,
    newAddressError: true,
    newPasswordError: true,
    newRepeatPasswordError: true,
    captchaError: true,
    // 檢查是否重複的請求 URL
    checkSameUsernameURL: "",
    checkSameEmailURL: "",
    // 發出更改請求
    newUsernameURL: "",
    newDescriptionURL: "",
    newEmailURL: "",
    newPhoneURL: "",
    newAddressURL: "",
    newPasswordURL: "",
    addCashURL: "",
    // 驗證碼按鈕的 loading 判斷變數
    loader: null,
    loading: false,
    // 是否可見 密碼
    eye: "mdi-eye-off",
    repeatEye: "mdi-eye-off",
    seePwd: "password",
    seeRepeatPwd: "password",
    // 是否更改成功
    updateUsernameSuccess: false,
    updateDescriptionSuccess: false,
    updateEmailSuccess: false,
    updatePhoneSuccess: false,
    updateCashSuccess: false,
    updateAddressSuccess: false,
    updatePassword: false,
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
    tags: [50, 100, 500, 1000],
    money: 50
  }),
  created() {
    this.imgDataUrl = this.user.avatar;
  },
  methods: {
    editName() {
      this.clickEditName = !this.clickEditName;
      console.log("this.clickEditName: " + this.clickEditName);
      this.$v.newUsername.$reset();
      this.newUsername = "";
      // this.isActiveEditName = false;
    },
    editDescription() {
      this.clickEditDescription = !this.clickEditDescription;
      console.log("this.clickEditDescription: " + this.clickEditDescription);
      this.$v.newDescription.$reset();
      this.newDescription = "";
      // this.isActiveEditDescription = false;
    },
    editEmail() {
      this.clickEditEmail = !this.clickEditEmail;
      console.log("this.clickEditEmail: " + this.clickEditEmail);
      this.$v.newEmail.$reset();
      this.newEmail = "";
      this.captcha = "";
      // this.isActiveEditEmail = false;
    },
    editPhone() {
      this.clickEditPhone = !this.clickEditPhone;
      console.log("this.clickEditPhone: " + this.clickEditPhone);
      this.$v.newPhone.$reset();
      this.newPhone = "";
      // this.isActiveEditPhone = false;
    },
    editAddress() {
      this.clickEditAddress = !this.clickEditAddress;
      console.log("this.clickEditAddress: " + this.clickEditAddress);
      this.$v.newAddress.$reset();
      this.newAddress = "";
      // this.isActiveEditAddress = false;
    },
    editPassword() {
      this.clickEditPassword = !this.clickEditPassword;
      console.log("this.clickEditPassword: " + this.clickEditPassword);
      this.$v.newPassword.$reset();
      this.$v.newRepeatPassword.$reset();
      this.originPassword = "";
      this.newPassword = "";
      this.newRepeatPassword = "";
      // this.isActiveEditPassword = false;
    },
    eyeClick() {
      if (this.eye === "mdi-eye-off") {
        this.eye = "mdi-eye";
        this.seePwd = "";
      } else {
        this.eye = "mdi-eye-off";
        this.seePwd = "password";
      }
    },
    repeatEyeClick() {
      if (this.repeatEye === "mdi-eye-off") {
        this.repeatEye = "mdi-eye";
        this.seeRepeatPwd = "";
      } else {
        this.repeatEye = "mdi-eye-off";
        this.seeRepeatPwd = "password";
      }
    },
    // 發送更改資料
    submitNewUsername() {
      // axios 提交新使用者名稱
      // var params = new URLSearchParams();
      // params.append("newUsername", this.newUsername);
      // axios
      //   .post(this.newUsernameURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updateUsernameSuccess = false;
      //     } else {
      //       // 更新前端使用者名稱 關閉 edit
      //       this.updateUsernameSuccess = true;
      //       this.user.name = this.newUsername;
      //       this.editName();
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updateUsernameSuccess = true;
      this.user.name = this.newUsername;
      this.editName();
    },
    submitNewDescription() {
      // axios 提交新描述
      // var params = new URLSearchParams();
      // params.append("newDescription", this.newDescription);
      // axios
      //   .post(this.newDescriptionURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updateDescriptionSuccess = false;
      //     } else {
      //       // 更新前端描述 關閉 edit
      //       this.updateDescriptionSuccess = true;
      //       this.user.description = this.newDescription;
      //       this.editEmail();
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updateDescriptionSuccess = true;
      this.user.description = this.newDescription;
      this.editDescription();
    },
    submitNewEmail() {
      // axios 提交新 email
      // var params = new URLSearchParams();
      // params.append("newEmail", this.newEmail);
      // axios
      //   .post(this.newEmailURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updateEmailSuccess = false;
      //     } else {
      //       // 更前端 email 關閉 edit
      //       this.updateEmailSuccess = true;
      //       this.user.email = this.newEmail;
      //       this.editEmail();
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updateEmailSuccess = true;
      this.user.email = this.newEmail;
      this.editEmail();
    },
    submitNewPhone() {
      // axios 提交新手機號
      // var params = new URLSearchParams();
      // params.append("newPhone", this.newPhone);
      // axios
      //   .post(this.newPhoneURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updatePhoneSuccess = false;
      //     } else {
      //       // 更新前端 phone 關閉 edit
      //       this.updatePhoneSuccess = true;
      //       this.user.phone = this.newPhone;
      //       this.editPhone();
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updatePhoneSuccess = true;
      this.user.phone = this.newPhone;
      this.editPhone();
    },
    submitNewAddress() {
      // axios 提交 新地址
      // var params = new URLSearchParams();
      // params.append("newAddress", this.newAddress);
      // axios
      //   .post(this.newAddressURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updateAddressSuccess = false;
      //     } else {
      //       // 更新前端 address，
      //       this.updateAddressSuccess = true;
      //       this.user.address = this.newAddress;
      //       this.editAddress();
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updateAddressSuccess = true;
      this.user.address = this.newAddress;
      this.editAddress();
    },
    submitAddCash() {
      // axios 提交 充值
      // var params = new URLSearchParams();
      // params.append("addCash", this.tags[this.money]);
      // axios
      //   .post(this.addCashURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updateCashSuccess = false;
      //     } else {
      //       // 更新前端 cash 數據
      //       this.updateCashSuccess = true;
      //       this.user.cash += this.tags[this.money];
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updateCashSuccess = true;
      this.user.cash += this.tags[this.money];
      this.addCreditDialog = false;
    },
    submitNewPassword() {
      // axios 提交新密碼
      // var params = new URLSearchParams();
      // params.append("oringinPassword", this.originPassword);
      // params.append("newPassword", this.newPassword);
      // axios
      //   .post(this.newPasswordURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updatePassword = false;
      //     } else {
      //       // 不會在前端更新密碼形式，前端不顯示密碼以保安全
      //       this.updatePassword = true;
      //       this.editPassword();
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updatePassword = true;
      this.editPassword();
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
      // axios
      //   .post("https://sm.ms/api/upload?ssl=true", {
      //     body: formData
      //   })
      //   .then(res => {
      //     this.url = res.data.url;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    onImageReady() {
      this.scale = 1;
      this.rotation = 0;
    }
  },
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
  computed: {
    newUsernameErrors() {
      const errors = [];
      if (!this.$v.newUsername.$dirty) return errors;
      !this.$v.newUsername.maxLength &&
        errors.push("Username must be at most 10 characters long.");
      !this.$v.newUsername.required && errors.push("Username is required.");
      !this.$v.newUsername.isUnique &&
        errors.push("The username is already registered.");
      this.newUsernameError = true;
      return errors;
    },
    newEmailErrors() {
      const errors = [];
      if (!this.$v.newEmail.$dirty) return errors;
      !this.$v.newEmail.email && errors.push("Must be valid e-mail.");
      !this.$v.newEmail.required && errors.push("E-mail is required.");
      !this.$v.newEmail.isUnique &&
        errors.push("The e-mail is already registered.");
      this.newEmailError = true;
      return errors;
    },
    newDescriptionErrors() {
      const errors = [];
      if (!this.$v.newDescription.$dirty) return errors;
      !this.$v.newDescription.maxLength &&
        errors.push("Description must be at most 30 characters long.");
      !this.$v.newDescription.required &&
        errors.push("Description is required.");
      this.newDescriptionError = true;
      console.log("description error");
      return errors;
    },
    newPhoneErrors() {
      const errors = [];
      if (!this.$v.newPhone.$dirty) return errors;
      !this.$v.newPhone.phoneValid &&
        errors.push("Must be valid phone number.");
      !this.$v.newPhone.required && errors.push("Phone number is required.");
      this.newPhoneError = true;
      return errors;
    },
    newAddressErrors() {
      const errors = [];
      if (!this.$v.newAddress.$dirty) return errors;
      !this.$v.newAddress.maxLength &&
        errors.push("Address must be at most 50 characters long.");
      !this.$v.newAddress.required && errors.push("Address is required.");
      this.newAddressError = true;
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.minLength &&
        errors.push("Password must have at least 6 letters.");
      !this.$v.newPassword.required && errors.push("Password is required.");
      this.newPasswordError = true;
      return errors;
    },
    newRepeatPasswordErrors() {
      const errors = [];
      if (!this.$v.newRepeatPassword.$dirty) return errors;
      !this.$v.newRepeatPassword.sameAsPassword &&
        errors.push("Password must be identical.");
      !this.$v.newRepeatPassword.required &&
        errors.push("Password must be identical.");
      this.newRepeatPasswordError = true;
      return errors;
    },
    newUsernameSuccess() {
      if (
        this.newUsername !== "" &&
        this.$v.newUsername.maxLength &&
        this.$v.newUsername.isUnique
      ) {
        this.newUsernameError = false;
        console.log("nameSuccess");
        return "Username is OK.";
      }
    },
    newDescriptionSuccess() {
      if (this.newDescription !== "" && this.$v.newDescription.maxLength) {
        this.newDescriptionError = false;
        console.log("newDescriptionSuccess");
        return "Description is OK.";
      }
    },
    newEmailSuccess() {
      if (
        this.newEmail !== "" &&
        this.$v.newEmail.email &&
        this.$v.newEmail.isUnique
      ) {
        this.newEmailError = false;
        console.log("emailSuccess");
        return "E-mail is OK.";
      }
    },
    newPhoneSuccess() {
      if (this.newPhone !== "" && this.$v.newPhone.phoneValid) {
        this.newPhoneError = false;
        console.log("phoneSuccess");
        return "Phone number is OK.";
      }
    },
    newAddressSuccess() {
      if (this.newAddress !== "" && this.$v.newAddress.maxLength) {
        this.newAddressError = false;
        console.log("newAddressSuccess");
        return "Address is OK.";
      }
    },
    newPasswordSuccess() {
      if (this.newPassword !== "" && this.$v.newPassword.minLength) {
        this.newPasswordError = false;
        console.log("passwordSuccess");
        return "Password is OK.";
      }
    },
    newRepeatPasswordSuccess() {
      if (
        this.newRepeatPassword !== "" &&
        this.$v.newRepeatPassword.sameAsPassword
      ) {
        this.newRepeatPasswordError = false;
        console.log("repeatPasswordSuccess");
        return "Repeat is OK.";
      }
    },
    captchaSuccess() {
      if (
        this.captcha !== "" &&
        this.$v.captcha.minLength &&
        this.$v.captcha.maxLength &&
        this.$v.captcha.isUnique
      ) {
        this.captchaError = false;
        console.log("captchaSuccess");
        return "Captcha is OK.";
      }
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
      console.log("loding");
      // request captcha
      // request captcha
      /*var params = new URLSearchParams();
      params.append("email", this.email);
      axios
        .post(this.requestCaptchaURL, params)
        .then(response => {
          console.log(response);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });*/
    }
  }
};
</script>
