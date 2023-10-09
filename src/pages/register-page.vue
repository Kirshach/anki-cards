<script setup lang="ts">
import { ref } from "vue";
import TextInput from "@/shared/text-input";
import CustomButton from "@/shared/custom-button";

const email = ref("");
const username = ref("");
const password = ref("");
const repeatedPassword = ref("");
</script>

<template>
  <form
    @submit.prevent="
      console.log(
        JSON.stringify({ email, username, password, repeatedPassword }),
      )
    "
  >
    <h1>Register</h1>
    <label for="register-email-input">Email</label>
    <TextInput
      id="register-email-input"
      type="email"
      autocomplete="email"
      v-model="email"
    />
    <label for="register-username-input">Username</label>
    <TextInput
      id="register-username-input"
      autocomplete="username"
      v-model="username"
    />
    <label for="register-password-input">Password</label>
    <TextInput
      id="register-password-input"
      type="password"
      autocomplete="new-password"
      v-model="password"
    />
    <label for="register-repeat-password-input">Repeat password</label>
    <TextInput
      id="register-repeat-password-input"
      type="password"
      autocomplete="new-password"
      v-model="repeatedPassword"
    />
    <CustomButton type="submit">Submit</CustomButton>
  </form>
</template>

<style scoped>
h1 {
  align-self: center;
  margin-bottom: 1.5em;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  padding-top: 2em;
  padding-bottom: 2em;
  min-height: 100%;
  width: fit-content;
}

label {
  margin-bottom: 0.5em;
  margin-left: 1em;
}

input {
  margin-bottom: 1em;
}

button[type="submit"] {
  margin-top: 2em;
  align-self: center;
}
</style>
