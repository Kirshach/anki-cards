<script lang="ts" setup>
defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const handleInput = (e: Event) => {
  if (!(e.target instanceof HTMLInputElement))
    throw new Error("Invalid handleInput handler event target");
  emit("update:modelValue", e.target?.value);
};
</script>

<template>
  <input type="text" :value="modelValue" @input="handleInput" />
</template>

<style scoped>
input {
  padding: 0.75em 1em;
  border: 5px solid var(--primary-color-2);
  border-radius: 10em;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;
}

input.error {
  border-color: var(--error-color);
  transition: border-color 0.2s ease-in-out;
}
</style>
