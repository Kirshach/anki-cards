<script setup lang="ts">
import CustomButton from "@/shared/custom-button";

defineProps<{ title: string; isSubmitting: boolean }>();
</script>

<template>
  <form>
    <h1>{{ title }}</h1>
    <slot></slot>
    <CustomButton type="submit">{{
      isSubmitting ? "Submitting..." : "Submit"
    }}</CustomButton>
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

button[type="submit"] {
  margin-top: 2em;
  align-self: center;
}

:slotted(label) {
  margin-bottom: 0.5em;
  margin-left: 1em;
}

:slotted(input) {
  margin-bottom: 1em;
  width: 100%;
}

:slotted(.error-message) {
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
