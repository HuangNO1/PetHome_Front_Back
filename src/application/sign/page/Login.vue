<template>
  <div>
    <div style="font-size: 3rem; text-align: center;">Sign In</div>
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :success-messages="nameSuccess"
        label="Username / E-mail"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-account</v-icon>
      </v-text-field>
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
        <v-icon slot="prepend" color="green">mdi-lock-outline</v-icon>
        <v-icon slot="append" color="red" @click="eyeClick">{{ eye }}</v-icon>
      </v-text-field>
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>
      <!-- verity -->
      <v-dialog v-model="dialog" width="500" :disabled="openDialog" persistent>
        <template v-slot:activator="{ on }">
          <v-btn class="mr-4" color="primary" v-on="on" @click="submit"
            >sign in</v-btn
          >
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            verity
          </v-card-title>

          <v-card-text>
            <div
              style="display: flex; justify-content: center; padding: 1rem; background: white;"
            >
              <slide-verify
                :l="42"
                :r="10"
                :w="310"
                :h="155"
                slider-text="Swipe right"
                @success="onSuccess"
                @fail="onFail"
                @refresh="onRefresh"
              ></slide-verify>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn @click="clear">clear</v-btn><br /><br />
      No account?To <a href="sign#/Register">sign up</a>.
    </form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required },
    password: { required, minLength: minLength(6) },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },
  data() {
    return {
      msg: ""
    };
  },
  data: () => ({
    name: "",
    password: "",
    checkbox: true,
    eye: "mdi-eye-off",
    seePwd: "password",
    dialog: false,
    nameError: true,
    passwordError: true,
    // checkboxError: false,
    loginURL: "",
    loginSuccess: false,
    openDialog: true
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      // this.checkboxError = true;
      this.openDialog = true;
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Username / E-mail is required.");
      this.nameError = true;
      this.openDialog = true;
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must have at least 6 letters.");
      !this.$v.password.required && errors.push("Password is required.");
      this.passwordError = true;
      this.openDialog = true;
      return errors;
    },
    nameSuccess() {
      if (this.name !== "") {
        this.nameError = false;
        console.log("nameSuccess");
      }
    },
    passwordSuccess() {
      if (this.password !== "" && this.$v.password.minLength) {
        this.passwordError = false;
        console.log("passwordSuccess");
      }
    }
    // checkboxSuccess() {
    //   if (this.checkbox === true && this.$v.checkbox.checked) {
    //     this.checkboxError = false;
    //     console.log("checkboxSuccess");
    //   }
    // }
  },

  methods: {
    submit() {
      this.openDialog = true;
      this.$v.$touch();
      console.log("this.nameError: " + this.nameError);
      console.log("this.passwordError: " + this.passwordError);
      // console.log("this.checkboxError: " + this.checkboxError);
      console.log("this.checkbox: " + this.checkbox);
      if (
        this.nameError === false &&
        this.passwordError === false &&
        this.checkbox === true
      ) {
        // submit the login request
        /*axios({
          method: "post",
          url: this.loginURL,
          data: { username: this.name, password: this.password }
        })
          .then(response => {
            console.log(response);
            console.log(response.data);
            this.loginSuccess = response.data;
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
      this.password = "";
      this.checkbox = true;
      this.nameError = true;
      this.passwordError = true;
      // this.checkboxError = false;
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
    onSuccess() {
      console.log("Success verity");
      this.dialog = false;
      document.location.href = "/work";
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    }
  }
};
</script>
