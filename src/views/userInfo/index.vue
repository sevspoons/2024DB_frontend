<template>
  <div class="recommend-wrapper">
    <el-row justify="space-between">
      <el-col :span="24">
        <el-card body-class="welcome-card">
          <div class="welcome-content">
            <h1>个人信息</h1>
            <p>在此留下你的足迹</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <InfoTable class="InfoTable" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card body-class="welcome-card">
          <div class="welcome-content">
            <h1>你的用餐记录</h1>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <mealRecords class="InfoTable" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import InfoTable from "./component/InfoTable.vue";
import mealRecords from "./component/mealRecords.vue";
</script>

<style scoped lang="scss">
:deep(.InfoTable) {
  margin-bottom: 20px;
}
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
.el-slider {
  margin-top: 20px;
}
</style>
