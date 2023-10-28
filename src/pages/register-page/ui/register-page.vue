<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import type { ZodError, ZodSchema } from "zod";
import TextInput from "@/shared/text-input";
import CustomButton from "@/shared/custom-button";
import { fetchData } from "@/shared/fetch-data";

import {
  emailSchema,
  usernameSchema,
  passwordSchema,
  repeatPasswordSchema,
} from "../model/validators";

const form = ref<HTMLFormElement | null>(null);

const email = ref("");
const username = ref("");
const password = ref("");
const repeatedPassword = ref("");

const emailHasBeenBlurred = ref(false);
const usernameHasBeenBlurred = ref(false);
const passwordHasBeenBlurred = ref(false);
const repeatedPasswordHasBeenBlurred = ref(false);

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

const getValidator = (
  schema: ZodSchema,
  valueRef: Ref<string>,
  errorRef: Ref<string | null>,
) => {
  return () => {
    try {
      schema.parse(valueRef.value);
      errorRef.value = null;
    } catch (error) {
      errorRef.value = (error as ZodError).errors
        .map((e) => e.message)
        .join(";\n");
    }
  };
};

const validateEmail = getValidator(emailSchema, email, emailError);
const validateUsername = getValidator(usernameSchema, username, usernameError);
const validatePassword = getValidator(passwordSchema, password, passwordError);
const validateRepeatedPassword = () => {
  try {
    repeatPasswordSchema
      .refine((val) => val === password.value, {
        message: "Passwords do not match",
      })
      .parse(repeatedPassword.value);
    repeatedPasswordError.value = null;
  } catch (error) {
    repeatedPasswordError.value = (error as ZodError).errors
      .map((e) => e.message)
      .join(";\n");
  }
};
const noop = () => {};

onMounted(() => {
  if (!(form.value instanceof HTMLFormElement))
    throw new Error("Invalid form ref value");
  form.value.setAttribute("novalidate", "");
});
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
      @blur.once="(emailHasBeenBlurred = true) && validateEmail()"
      @input="emailHasBeenBlurred ? validateEmail() : noop()"
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
      @blur.once="(usernameHasBeenBlurred = true) && validateUsername()"
      @input="usernameHasBeenBlurred ? validateUsername() : noop()"
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
      @blur.once="(passwordHasBeenBlurred = true) && validatePassword()"
      @input="passwordHasBeenBlurred ? validatePassword() : noop()"
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
      @blur.once="
        (repeatedPasswordHasBeenBlurred = true) && validateRepeatedPassword()
      "
      @input="
        repeatedPasswordHasBeenBlurred ? validateRepeatedPassword() : noop()
      "
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
