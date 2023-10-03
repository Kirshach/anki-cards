<template>
  <input type="text" />
</template>

<style scoped>
input {
  padding: 0.75em 1em;
  border: 5px solid var(--theme-color-3);
  border-radius: 10em;
  font-size: 1rem;
  outline: 3px solid transparent;
  transition: outline 0.2s ease-out;
}

input:focus-visible {
  outline: 3px solid var(--theme-color-1);
  transition: outline 0.1s ease-in-out;
}
</style>
