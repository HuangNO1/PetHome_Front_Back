<template>
  <div>
    <div style="font-size: 3rem; text-align: center;">Sign In</div>
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
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

      <v-btn class="mr-4" color="primary" @click="submit">sign in</v-btn>
      <v-btn @click="clear">clear</v-btn><br><br>
      No account?To <a href="sign#/Register">sign up</a>.
    </form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  email
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required},
    password: { required, minLength: minLength(6) },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    name: "",
    password: "",
    checkbox: true,
    eye: "mdi-eye-off",
    seePwd: "password"
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
      !this.$v.name.required && errors.push("Username / E-mail is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must have at least 6 letters.");
      !this.$v.password.required && errors.push("Password is required.");
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
      this.password = "";
      this.checkbox = false;
    },
    eyeClick() {
        if(this.eye === "mdi-eye-off") {
            this.eye = "mdi-eye";
            this.seePwd = "";
        }
        else {
            this.eye = "mdi-eye-off";
            this.seePwd = "password";
        }
    }
  }
};
</script>
