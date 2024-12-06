<template>
  <el-scrollbar height="400px" class="custom-scrollbar">
    <p v-for="item in HistoryList" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const HistoryList = ref([
  "炒饭",
  "炒面",
  "炒饼",
  "炒棵",
  "冰",
  "整个人都飞起来了"
]);

// const HistoryList = ref<string[]>([]); // 初始化为空数组

// onMounted(async () => {
//   try {
//     const response = await getUserInfo();
//     if (response.success) {
//       // 将获取到的用户信息赋值给 userInfo
//       HistoryList.value = response.data;
//     } else {
//       alert("获取用户信息失败");
//     }
//   } catch (error) {
//     console.error("获取用户信息失败:", error);
//     alert("获取用户信息失败");
//   }
// });
</script>

<style scoped>
/* 美化滚动条 */
.custom-scrollbar :deep(.el-scrollbar__wrap) {
  border-radius: 8px;
  background-color: #f5f5f5;
}

.custom-scrollbar :deep(.el-scrollbar__bar) {
  background-color: #409eff;
  border-radius: 8px;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  margin: 10px;
  text-align: center;
  border-radius: 8px;
  background: linear-gradient(45deg, #f0f8ff, #dcdcdc);
  color: #333;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.scrollbar-demo-item:hover {
  background: linear-gradient(45deg, #f5a623, #ff6347);
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.scrollbar-demo-item:active {
  transform: scale(0.98);
}

.scrollbar-demo-item:first-child {
  margin-top: 20px;
}

.scrollbar-demo-item:last-child {
  margin-bottom: 20px;
}
</style>
