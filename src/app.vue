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
  width: 100%;
  height: 100%;
  background-color: var(--primary-color-3);
}

.circle {
  position: fixed;
  border-radius: 50%;
  z-index: -1;
}

.circle.second {
  width: 145%;
  height: 210%;
  background-color: var(--primary-color-2);
  bottom: -100%;
  right: -70%;
}

.circle.first {
  width: 85%;
  height: 160%;
  background-color: var(--primary-color-1);
  bottom: -110%;
  right: -50%;
}
</style>
