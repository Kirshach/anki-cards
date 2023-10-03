<script setup lang="ts">
import { ref } from "vue";
import TextInput from "@/shared/text-input";

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
    <button type="submit">Register</button>
  </form>
</template>

<style scoped>
h1 {
  margin-bottom: 2em;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2em;
  padding-bottom: 2em;
  min-height: 100%;
}
</style>
