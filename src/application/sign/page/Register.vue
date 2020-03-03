<template>
  <div>
    <div style="font-size: 3rem; text-align: center;">Sign Up</div>
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        label="Username"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-account</v-icon>
      </v-text-field>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-email</v-icon>
      </v-text-field>
      <v-text-field
        v-model="password"
        :type="seePwd"
        :error-messages="passwordErrors"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-lock-outline</v-icon>
        <v-icon slot="append" color="red" @click="eyeClick">{{ eye }}</v-icon>
      </v-text-field>
      <v-text-field
        v-model="repeatPassword"
        :type="seeRepeatPwd"
        :error-messages="repeatPasswordErrors"
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
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree Pet Home's statement?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>

      <v-btn class="mr-4" color="primary" @click="submit">Sign Up</v-btn>
      <v-btn @click="clear">clear</v-btn><br /><br />
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
  email
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    repeatPassword: {
      required,
      minLength: minLength(6)
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
    checkbox: true,
    eye: "mdi-eye-off",
    repeatEye: "mdi-eye-off",
    seePwd: "password",
    seeRepeatPwd: "password"
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Username must be at most 10 characters long.");
      !this.$v.name.required && errors.push("Username is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail.");
      !this.$v.email.required && errors.push("E-mail is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must have at least 6 letters.");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.minLength &&
        errors.push("Password must have at least 6 letters.");
      !this.$v.repeatPassword.required &&
        errors.push("Repeat password is required.");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.checkbox = false;
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
    }
  }
};
</script>
