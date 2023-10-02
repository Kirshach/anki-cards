<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="backdrop"></div>
  <div class="circle second"></div>
  <div class="circle first"></div>
  <RouterView />
</template>

<style scoped>
.backdrop {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100lvw;
  height: 100lvh;
  background-color: var(--theme-color-3);
}

.circle {
  position: fixed;
  border-radius: 50%;
  z-index: -1;
}

.circle.second {
  width: 145lvw;
  height: 210lvh;
  background-color: var(--theme-color-2);
  bottom: -100lvh;
  right: -70lvw;
}

.circle.first {
  width: 85lvw;
  height: 160lvh;
  background-color: var(--theme-color-1);
  bottom: -110lvh;
  right: -50lvw;
}
</style>
