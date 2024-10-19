<script setup lang="ts">
import { number } from "echarts";
import { ref, onMounted } from "vue";
import totalRank from "./component/totalRank.vue";
import cmpRecommend from "./component/cmpRecommend.vue";
import { config_Light } from "./component/cmpRecommendChartConf";
</script>

<template>
  <div class="welcome-wrapper">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="welcome-card">
            <h1>食光航迹</h1>
            <p>北航师生专属的美食导航仪</p>
          </div>
        </el-card>
        <el-card>
          <totalRank />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <cmpRecommend :configL="config_Light" :configR="config_Light" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-card) {
  margin-bottom: 20px;
}
</style>
