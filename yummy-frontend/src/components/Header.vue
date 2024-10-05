<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="header-wrapper">
    <p class="header-text">{{ msg }}</p>
  </div>
</template>

<style scoped>
.header-text {
  font-size: 50px;
  color: orange;
  background:  linear-gradient(to right, #ff7e5f, #5ab8f1);
  background-size: 0% 2px;
  background-position: 50% 100%;
  transition: background-size 0.25s;
  background-repeat: no-repeat;
}
.header-text:hover {
  background-size: 50vw 2px;
}
</style>