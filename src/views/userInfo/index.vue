<template>
  <div class="recommend-wrapper">
    <section class="card-section">
      <CardHeader title="个人信息" description="在此留下你的足迹" />
      <InfoTable class="InfoTable" />
    </section>

    <section class="card-section">
      <CardHeader title="你的用餐记录" />
      <mealRecords class="InfoTable" />
    </section>
  </div>
</template>

<script setup lang="ts">
import InfoTable from "./component/InfoTable.vue";
import mealRecords from "./component/mealRecords.vue";
import CardHeader from "./component/CardHeader.vue"; // 新增的卡片标题组件
</script>

<style scoped lang="scss">
/* 设置整体的间距 */
.recommend-wrapper {
  padding: 20px; /* 给整个容器添加统一的内边距 */
}

/* 卡片部分统一间距 */
.card-section {
  margin-bottom: 20px; /* 卡片部分底部间距 */
}

/* 统一设置 InfoTable 和 mealRecords 组件的间距 */
:deep(.InfoTable) {
  margin-top: 20px; /* 上方间距 */
  margin-bottom: 20px; /* 下方间距 */
}

/* 卡片样式 */
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

/* 卡片内容样式 */
.welcome-content {
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
}
</style>
