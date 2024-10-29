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
        <InfoTable class="table" />
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
  </div>
</template>

<script setup lang="ts">
import InfoTable from "./component/InfoTable.vue";
</script>

<style scoped lang="scss">
:deep(.table) {
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
</style>
