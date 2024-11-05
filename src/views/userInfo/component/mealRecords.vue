<template>
  <el-scrollbar height="400px">
    <p v-for="item in HistoryList" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
const HistoryList = ref(["炒饭", "炒面", "炒饼", "抄棵"]);
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
