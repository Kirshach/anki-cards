<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ZodError, ZodSchema } from "zod";

import TextInput from "@/shared/text-input";
import CenteredForm from "@/shared/centered-form";
import { fetchData } from "@/shared/fetch-data";

import {
  emailSchema,
  usernameSchema,
  passwordSchema,
  repeatedPasswordSchema,
} from "../model/validators";

const form = ref<HTMLFormElement | null>(null);
const isSubmitting = ref(false);

type FormField = {
  value: string;
  error: string | null;
  blurred: boolean;
};

const email = reactive<FormField>({ value: "", error: null, blurred: false });
const username = reactive<FormField>({
  value: "",
  error: null,
  blurred: false,
});
const password = reactive<FormField>({
  value: "",
  error: null,
  blurred: false,
});
const repeatedPassword = reactive<FormField>({
  value: "",
  error: null,
  blurred: false,
});

const getValidator = (schema: ZodSchema, fieldObject: FormField) => {
  return () => {
    try {
      schema.parse(fieldObject.value);
      fieldObject.error = null;
    } catch (error) {
      fieldObject.error = (error as ZodError).errors
        .map((e) => e.message)
        .join(";\n");
    }
  };
};

const validateEmail = getValidator(emailSchema, email);
const validateUsername = getValidator(usernameSchema, username);
const validatePassword = getValidator(passwordSchema, password);
const validateRepeatedPassword = () => {
  try {
    repeatedPasswordSchema
      .refine((val) => val === password.value, {
        message: "Passwords do not match",
      })
      .parse(repeatedPassword.value);
    repeatedPassword.error = null;
  } catch (error) {
    repeatedPassword.error = (error as ZodError).errors
      .map((e) => e.message)
      .join(";\n");
  }
};

const noop = () => {};

const handleSubmit = async () => {
  const url = "api/v1/user/create/";
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
        email.error =
          "Error: " + (error as Record<"email", string[]>).email.join("; ");
      }
      if ("username" in (error as Record<"username", string[]>)) {
        username.error =
          "Error: " +
          (error as Record<"username", string[]>).username.join("; ");
      }
      if ("password" in (error as Record<"password", string[]>)) {
        password.error =
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
      v-model="email.value"
      @blur.once="(email.blurred = true), validateEmail()"
      @input="email.blurred ? validateEmail() : noop()"
      :aria-invalid="email.error !== null"
      :class="email.error && 'error'"
      aria-describedby="register-form-email-error"
      required
    />
    <div
      class="error-message"
      id="register-form-email-error"
      v-if="email.error"
    >
      {{ email.error }}
    </div>
    <label for="register-username-input">Username</label>
    <TextInput
      id="register-username-input"
      autocomplete="username"
      v-model="username.value"
      @blur.once="(username.blurred = true), validateUsername()"
      @input="username.blurred ? validateUsername() : noop()"
      :aria-invalid="username.error !== null"
      :class="username.error && 'error'"
      aria-describedby="register-form-username-error"
      required
    />
    <div
      class="error-message"
      id="register-form-username-error"
      v-if="username.error"
    >
      {{ username.error }}
    </div>
    <label for="register-password-input">Password</label>
    <TextInput
      id="register-password-input"
      type="password"
      autocomplete="new-password"
      v-model="password.value"
      pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$"
      minlength="7"
      maxlength="20"
      title="Should contain at least one uppercase letter, one lowercase letter and one number"
      :aria-invalid="password.error !== null"
      :class="password.error && 'error'"
      @blur.once="(password.blurred = true), validatePassword()"
      @input="
        password.blurred
          ? (validatePassword(), validateRepeatedPassword())
          : noop()
      "
      aria-describedby="register-form-password-error"
      required
    />
    <div
      class="error-message"
      id="register-form-password-error"
      v-if="password.error"
    >
      {{ password.error }}
    </div>
    <label for="register-repeat-password-input">Repeat password</label>
    <TextInput
      id="register-repeat-password-input"
      type="password"
      autocomplete="new-password"
      v-model="repeatedPassword.value"
      pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$"
      minlength="7"
      maxlength="20"
      @blur.once="(repeatedPassword.blurred = true), validateRepeatedPassword()"
      @input="repeatedPassword.blurred ? validateRepeatedPassword() : noop()"
      :aria-invalid="repeatedPassword.error !== null"
      :class="repeatedPassword.error && 'error'"
      aria-describedby="register-form-repeated-password-error"
      required
    />
    <div
      class="error-message"
      id="register-form-repeated-password-error"
      v-if="repeatedPassword.error"
    >
      {{ repeatedPassword.error }}
    </div>
  </CenteredForm>
</template>
