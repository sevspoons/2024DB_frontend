<!-- CardHeader.vue -->
<template>
  <el-card body-class="welcome-card">
    <div class="welcome-content">
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  description: {
    type: String,
    default: ""
  }
});
</script>

<style scoped lang="scss">
:deep(.welcome-card) {
  background-image: linear-gradient(45deg, #f6416c, #11999e);
  margin: 2%;
  padding: 5px;
  border-radius: 10px;
  background-position: center;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.04);
  }
}

.welcome-content {
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
}
</style>
