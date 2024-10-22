<script setup lang="ts">
import { number } from "echarts";
import { ref, onMounted } from "vue";
import totalRank from "./component/totalRank.vue";
import cmpRecommend from "./component/cmpRecommend.vue";
import useRecommendChartConf from "./component/cmpRecommendChartConf";

const configL = ref({});
const configR = ref({});
onMounted(() => {
  configL.value = useRecommendChartConf([
    [2, "菜品1"],
    [3, "菜品2"],
    [5, "菜品3"]
  ]);
  configR.value = useRecommendChartConf([
    [3, "菜品4"],
    [8, "菜品5"],
    [9, "菜品6"]
  ]);
});
</script>

<template>
  <div class="recommend-wrapper">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card body-class="welcome-card">
          <div class="welcome-content">
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
          <cmpRecommend :configL="configL" :configR="configR" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-card) {
  margin-bottom: 20px;
}
:deep(.welcome-card) {
  background-image: linear-gradient(45deg, #f6416c, #11999e);
  margin: 5%;
  padding: 5px;
  border-radius: 10px;
  background-position: center;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
}
.welcome-content {
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
}
</style>
