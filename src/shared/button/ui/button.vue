<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  border-radius: 10em;
  border: 2px solid var(--theme-color-2);
  padding: 0.75em 2em;
  color: var(--theme-color-2);
  background-color: var(--text-color);
  font-size: 1rem;
  cursor: pointer;
}
</style>
