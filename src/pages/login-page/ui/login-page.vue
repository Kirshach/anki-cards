<script setup lang="ts">
import { ref } from "vue";

import CenteredForm from "@/shared/centered-form";
import TextInput from "@/shared/text-input";
import { fetchData } from "@/shared/fetch-data";

const emailOrUsername = ref("");
const password = ref("");

const emailOrUsernameError = ref<string | null>(null);
const passwordError = ref<string | null>(null);

const handleSubmit = async () => {
  const url = "api/v1/user/login_user/";
  const res = fetchData.post(url, {
    email_or_username: emailOrUsername.value,
    password: password.value,
  });

  res
    .then(() => alert("success"))
    .catch((error: unknown) => {
      if ("email_or_username" in (error as Record<"email", string[]>)) {
        emailOrUsernameError.value =
          "Error: " + (error as Record<"email", string[]>).email.join("; ");
      }
      if ("password" in (error as Record<"password", string[]>)) {
        passwordError.value =
          "Error: " +
          (error as Record<"password", string[]>).password.join("; ");
      }
    });
};
</script>

<template>
  <CenteredForm
    title="Login"
    @submit.prevent="handleSubmit"
    ref="form"
    novalidate
  >
    <label for="login-email-or-username-input">Email</label>
    <TextInput
      id="login-email-or-username-input"
      type="text"
      autocomplete="email"
      v-model="emailOrUsername"
      :aria-invalid="emailOrUsernameError !== null"
      aria-describedby="login-form-email-or-username-error"
      required
    />
    <div
      class="error-message"
      id="login-form-email-or-username-error"
      v-if="emailOrUsernameError"
    >
      {{ emailOrUsernameError }}
    </div>
    <label for="login-password-input">Password</label>
    <TextInput
      id="login-password-input"
      type="password"
      autocomplete="password"
      v-model="password"
      title="Should contain at least one uppercase letter, one lowercase letter and one number"
      :aria-invalid="passwordError !== null"
      aria-describedby="register-form-password-error"
      required
    />
    <div
      class="error-message"
      id="register-form-password-error"
      v-if="passwordError"
    >
      {{ passwordError }}
    </div>
  </CenteredForm>
</template>
