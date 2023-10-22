<script setup lang="ts">
import { onMounted, ref } from "vue";
import TextInput from "@/shared/text-input";
import CustomButton from "@/shared/custom-button";
import { fetchData } from "@/shared/fetch-data";

const form = ref<HTMLFormElement | null>(null);

const email = ref("");
const username = ref("");
const password = ref("");
const repeatedPassword = ref("");

const emailError = ref<string | null>(null);
const usernameError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const repeatedPasswordError = ref<string | null>(null);

const handleSubmit = async () => {
  const url = "/api/v1/user/registrate_user/";
  const res = fetchData.post(url, {
    email: email.value,
    username: username.value,
    password: password.value,
  });

  res
    .then(() => alert("success"))
    .catch((error: unknown) => {
      if ("email" in (error as Record<"email", string[]>)) {
        emailError.value =
          "Error: " + (error as Record<"email", string[]>).email.join("; ");
      }
      if ("username" in (error as Record<"username", string[]>)) {
        usernameError.value =
          "Error: " +
          (error as Record<"username", string[]>).username.join("; ");
      }
      if ("password" in (error as Record<"password", string[]>)) {
        passwordError.value =
          "Error: " +
          (error as Record<"password", string[]>).password.join("; ");
      }
    });
};

onMounted(() => {
  if (!(form.value instanceof HTMLFormElement))
    throw new Error("Invalid form ref value");
  form.value.setAttribute("novalidate", "");
});

const validateEmail = () => {
  if (email.value.length === 0) {
    emailError.value = "Email is required";
  } else if (email.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) === null) {
    emailError.value =
      'Invalid email format:\n email should contain "@" symbol and domain name';
  } else {
    emailError.value = null;
  }
};

const validateUsername = () => {
  if (username.value.length === 0) {
    usernameError.value = "Username is required";
  } else {
    usernameError.value = null;
  }
};

const validatePassword = () => {
  if (password.value.length === 0) {
    passwordError.value = "Password is required";
  } else if (
    password.value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/) === null
  ) {
    passwordError.value =
      "Password should contain at least one uppercase letter, one lowercase letter and one number";
  } else if (password.value.length < 7) {
    passwordError.value = "Password should be at least 7 characters long";
  } else if (password.value.length > 20) {
    passwordError.value = "Password should be at most 20 characters long";
  } else {
    passwordError.value = null;
  }
};

const validateRepeatedPassword = () => {
  if (repeatedPassword.value.length === 0) {
    repeatedPasswordError.value = "Repeated password is required";
  } else if (repeatedPassword.value !== password.value) {
    repeatedPasswordError.value = "Passwords do not match";
  } else {
    repeatedPasswordError.value = null;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" ref="form">
    <h1>Register</h1>
    <label for="register-email-input">Email</label>
    <TextInput
      id="register-email-input"
      type="email"
      autocomplete="email"
      v-model="email"
      @blur="validateEmail"
      :aria-invalid="emailError !== null"
      aria-describedby="register-form-email-error"
      required
    />
    <div class="error-message" id="register-form-email-error" v-if="emailError">
      {{ emailError }}
    </div>
    <label for="register-username-input">Username</label>
    <TextInput
      id="register-username-input"
      autocomplete="username"
      v-model="username"
      @blur="validateUsername"
      :aria-invalid="usernameError !== null"
      aria-describedby="register-form-username-error"
      required
    />
    <div
      class="error-message"
      id="register-form-username-error"
      v-if="usernameError"
    >
      {{ usernameError }}
    </div>
    <label for="register-password-input">Password</label>
    <TextInput
      id="register-password-input"
      type="password"
      autocomplete="new-password"
      v-model="password"
      pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$"
      minlength="7"
      maxlength="20"
      title="Should contain at least one uppercase letter, one lowercase letter and one number"
      :aria-invalid="passwordError !== null"
      @blur="validatePassword"
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
    <label for="register-repeat-password-input">Repeat password</label>
    <TextInput
      id="register-repeat-password-input"
      type="password"
      autocomplete="new-password"
      v-model="repeatedPassword"
      pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$"
      minlength="7"
      maxlength="20"
      @blur="validateRepeatedPassword"
      :aria-invalid="repeatedPasswordError !== null"
      aria-describedby="register-form-repeated-password-error"
      required
    />
    <div
      class="error-message"
      id="register-form-repeated-password-error"
      v-if="repeatedPasswordError"
    >
      {{ repeatedPasswordError }}
    </div>
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
  padding: 2em 3em;
  min-height: 100%;
  max-width: 25rem;
}

label {
  margin-bottom: 0.5em;
  margin-left: 1em;
}

input {
  margin-bottom: 1em;
  width: 100%;
}

button[type="submit"] {
  margin-top: 2em;
  align-self: center;
}

.error-message {
  text-wrap: pretty;
  padding: 1em 1.5em;
  width: 100%;
  margin-bottom: 1em;
  background-color: var(--text-color);
  border-radius: 2em;
  color: var(--error-color);
  border: 5px solid var(--error-color);
}
</style>
