<template>
  <input type="text" />
</template>

<style scoped>
input {
  padding: 0.75em 1em;
  border: 5px solid var(--theme-color-2);
  border-radius: 10em;
  font-size: 1rem;
  outline: 3px solid transparent;
  transition: outline 0.2s ease-out;
}

input:focus {
  outline: 3px solid var(--theme-color-accent);
  outline-offset: 2px;
  transition: outline 0.1s ease-in-out;
}
</style>
