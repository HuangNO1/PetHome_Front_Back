<template>
  <div>
    <div style="font-size: 3rem; text-align: center;">Sign Up</div>
    <form>
      <!-- name -->
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :success-messages="nameSuccess"
        :counter="10"
        label="Username"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-account</v-icon>
      </v-text-field>
      <!-- email -->
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        :success-messages="emailSuccess"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-email</v-icon>
      </v-text-field>
      <!-- password -->
      <v-text-field
        v-model="password"
        :type="seePwd"
        :error-messages="passwordErrors"
        :success-messages="passwordSuccess"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-lock</v-icon>
        <v-icon slot="append" color="red" @click="eyeClick">{{ eye }}</v-icon>
      </v-text-field>
      <!-- repeat password -->
      <v-text-field
        v-model="repeatPassword"
        :type="seeRepeatPwd"
        :error-messages="repeatPasswordErrors"
        :success-messages="repeatPasswordSuccess"
        label="Repeat Password"
        required
        @input="$v.repeatPassword.$touch()"
        @blur="$v.repeatPassword.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-lock-question</v-icon>
        <v-icon slot="append" color="red" @click="repeatEyeClick">{{
          repeatEye
        }}</v-icon>
      </v-text-field>
      <!-- email verify -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="captcha"
            :counter="4"
            :error-messages="captchaErrors"
            :success-messages="captchaSuccess"
            label="Captcha"
            required
            @input="$v.captcha.$touch()"
            @blur="$v.captcha.$touch()"
          >
            <v-icon slot="prepend" color="green">mdi-alpha-c-circle</v-icon>
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
      <!-- agree -->
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="I accept Pet Home's privacy policy."
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>
      <!-- Rigster success -->
      <v-dialog v-model="dialog" width="500" :disabled="openDialog" persistent>
        <template v-slot:activator="{ on }">
          <v-btn class="mr-4" color="primary" v-on="on" @click="submit"
            >Sign Up</v-btn
          >
        </template>
        <v-card>
          <v-card-title
            class="headline grey lighten-2 green--text"
            primary-title
          >
            <p>Success</p>
          </v-card-title>

          <v-card-text style="padding: 1rem;">
            <span><v-icon color="green" large>mdi-check-decagram</v-icon></span>
            <span class="title"
              >Congratulations! You registered successfully! Go and sign in
              now!</span
            >
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="toLogin">
              <span>Got it</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- clear -->
      <v-btn class="mr-4" @click="clear">clear</v-btn>
      <!-- Privacy Policy -->
      <v-dialog v-model="statementDialog" width="500" persistent>
        <template v-slot:activator="{ on }">
          <v-btn
            color="red lighten-2"
            dark
            class="mr-4"
            v-on="on"
            @click="readStatement"
            >statement</v-btn
          >
        </template>
        <v-card>
          <v-card-title
            class="headline red white--text lighten-2"
            primary-title
          >
            <p>Privacy Policy</p>
          </v-card-title>

          <v-card-text style="padding: 1rem;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="statementDialog = false">
              <span>Got it</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <br /><br />
      Have a account?To <a href="sign#/Login">sign in</a>.
    </form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  mixins: [validationMixin],

  validations: {
    name: {
      required,
      maxLength: maxLength(10),
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;
        // axios : verity the username is registered.
        /*
      axios({
        method: "post",
        url: this.checkSameNameURL,
        data: { username: this.name }
      })
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
    email: {
      required,
      email,
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;
        // axios : verity the username is registered.
        /*
      axios({
        method: "post",
        url: this.checkSameEmailURL,
        data: { username: this.email }
      })
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
    password: { required, minLength: minLength(6) },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password")
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
      axios({
        method: "post",
        url: this.verifyCaptchaURL,
        data: { captcha: this.captcha }
      })
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
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    captcha: "",
    checkbox: true,
    eye: "mdi-eye-off",
    repeatEye: "mdi-eye-off",
    seePwd: "password",
    seeRepeatPwd: "password",
    nameError: true,
    emailError: true,
    passwordError: true,
    repeatPasswordError: true,
    captchaError: true,
    registerSuccess: false,
    dialog: false,
    openDialog: true,
    statementDialog: false,
    checkSameNameURL: "",
    checkSameEmailURL: "",
    requestCaptchaURL: "",
    verifyCaptchaURL: "",
    registerURL: "",
    loader: null,
    loading: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must accept to continue!");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Username must be at most 10 characters long.");
      !this.$v.name.required && errors.push("Username is required.");
      !this.$v.name.isUnique &&
        errors.push("The username is already registered.");
      this.nameError = true;
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail.");
      !this.$v.email.required && errors.push("E-mail is required.");
      !this.$v.email.isUnique &&
        errors.push("The e-mail is already registered.");
      this.emailError = true;
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must have at least 6 letters.");
      !this.$v.password.required && errors.push("Password is required.");
      this.passwordError = true;
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("Password must be identical.");
      !this.$v.repeatPassword.required &&
        errors.push("Password must be identical.");
      this.repeatPasswordError = true;
      return errors;
    },
    captchaErrors() {
      const errors = [];
      if (!this.$v.captcha.$dirty) return errors;
      !this.$v.captcha.minLength && errors.push("must have 4 letters.");
      !this.$v.captcha.maxLength && errors.push("must have 4 letters.");
      !this.$v.captcha.required && errors.push("captcha is required.");
      !this.$v.captcha.isUnique && errors.push("Captcha isn't true.");
      this.captchaError = true;
      return errors;
    },
    nameSuccess() {
      if (this.name !== "" && this.$v.name.maxLength && this.$v.name.isUnique) {
        this.nameError = false;
        console.log("nameSuccess");
        return "Username is OK.";
      }
    },
    emailSuccess() {
      if (this.email !== "" && this.$v.email.email && this.$v.email.isUnique) {
        this.emailError = false;
        console.log("emailSuccess");
        return "E-mail is OK.";
      }
    },
    passwordSuccess() {
      if (this.password !== "" && this.$v.password.minLength) {
        this.passwordError = false;
        console.log("passwordSuccess");
        return "Password is OK.";
      }
    },
    repeatPasswordSuccess() {
      if (this.repeatPassword !== "" && this.$v.repeatPassword.sameAsPassword) {
        this.repeatPasswordError = false;
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

  methods: {
    submit() {
      this.openDialog = true;
      this.dialog = false;
      this.$v.$touch();
      console.log("this.nameError: " + this.nameError);
      console.log("this.passwordError: " + this.passwordError);
      console.log("this.repeatPasswordError: " + this.repeatPasswordError);
      console.log("this.captchaError: " + this.captchaError);
      console.log("this.checkbox: " + this.checkbox);
      if (
        this.nameError === false &&
        this.passwordError === false &&
        this.repeatPasswordError === false &&
        this.captchaError === false &&
        this.checkbox === true
      ) {
        // submit the register requestion
        /*axios({
          method: "post",
          url: this.registerURL,
          data: {
            username: this.name,
            password: this.password,
            repeatPassword: this.repeatPassword,
            email: this.email,
            captcha: this.captcha
          }
        })
          .then(response => {
            console.log(response);
            console.log(response.data);
            this.registerSuccess = response.data;
          })
          .catch(error => {
            console.log(error);
          });*/
        this.openDialog = false;
        this.dialog = true;
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.captcha = "";
      this.checkbox = true;
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
    toLogin() {
      this.dialog = false;
      setTimeout(() => {
        document.location.href = "/sign#/Login";
      }, 500);
    },
    readStatement() {
      this.statementDialog = true;
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
      /*axios({
          method: "post",
          url: this.requestCaptchaURL,
          data: { }
        })
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
