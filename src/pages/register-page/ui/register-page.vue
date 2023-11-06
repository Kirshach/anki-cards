<script setup lang="ts">
import { ref, type Ref } from "vue";
import type { ZodError, ZodSchema } from "zod";

import TextInput from "@/shared/text-input";
import CenteredForm from "@/shared/centered-form";
import { fetchData } from "@/shared/fetch-data";

import {
  emailSchema,
  usernameSchema,
  passwordSchema,
  repeatPasswordSchema,
} from "../model/validators";

const form = ref<HTMLFormElement | null>(null);
const isSubmitting = ref(false);

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

const handleSubmit = async () => {
  const url = "api/v1/user/create_user/";
  const res = fetchData.post(url, {
    email: email.value,
    username: username.value,
    password: password.value,
  });

  isSubmitting.value = true;

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
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>

<template>
  <CenteredForm
    title="Register"
    @submit.prevent="handleSubmit"
    ref="form"
    novalidate
    :isSubmitting="isSubmitting"
  >
    <label for="register-email-input">Email</label>
    <TextInput
      id="register-email-input"
      type="email"
      autocomplete="email"
      v-model="email"
      @blur.once="(emailHasBeenBlurred = true), validateEmail()"
      @input="emailHasBeenBlurred ? validateEmail() : noop()"
      :aria-invalid="emailError !== null"
      :class="emailError && 'error'"
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
      @blur.once="(usernameHasBeenBlurred = true), validateUsername()"
      @input="usernameHasBeenBlurred ? validateUsername() : noop()"
      :aria-invalid="usernameError !== null"
      :class="usernameError && 'error'"
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
      :class="passwordError && 'error'"
      @blur.once="(passwordHasBeenBlurred = true), validatePassword()"
      @input="
        passwordHasBeenBlurred
          ? (validatePassword(), validateRepeatedPassword())
          : noop()
      "
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
        (repeatedPasswordHasBeenBlurred = true), validateRepeatedPassword()
      "
      @input="
        repeatedPasswordHasBeenBlurred ? validateRepeatedPassword() : noop()
      "
      :aria-invalid="repeatedPasswordError !== null"
      :class="repeatedPasswordError && 'error'"
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
  </CenteredForm>
</template>
