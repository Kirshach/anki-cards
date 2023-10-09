<script lang="ts" setup>
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

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
  border: 5px solid var(--theme-color-2);
  border-radius: 10em;
  font-size: 1rem;
}
</style>
