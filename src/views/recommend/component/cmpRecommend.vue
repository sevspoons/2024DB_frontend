<template>
  <div class="cmp-wrapper" style="height: 40vh">
    <el-row>
      <h1 class="cmp-title">
        <b style="color: #11999e">{{ "性价比" }}</b>
        <b>{{ "      vs      " }}</b>
        <b style="color: #88304e">{{ "量管饱" }}</b>
      </h1>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-row class="cmp-left">
          <el-col :span="12">
            <div class="chart-wrapper">
              <simpleChart :config="configL" />
            </div>
          </el-col>
          <el-col :span="10" :offset="2">
            <div class="chart-text">
              <h2>
                健康的BUAAer<br />对这几道菜给出<br /><b
                  style="font-size: 45px; color: #6e7955"
                  >好评!</b
                >
              </h2>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div class="cmp-right">
          <el-row>
            <el-col :span="12">
              <div class="chart-wrapper">
                <simpleChart :config="configR" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="chart-text">
                <h2>
                  无辣不欢?<br />无肉不香?<br /><b
                    style="font-size: 45px; color: #752100"
                    >看这里!</b
                  >
                </h2>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import simpleChart from "@/components/simpleChart.vue";
import useRecommendChartConf from "./cmpRecommendChartConf";
const configL = ref({});
const configR = ref({});
onMounted(() => {
  configL.value = useRecommendChartConf([
    [2, "菜品1"],
    [3.5, "菜品2"],
    [5, "菜品3"]
  ]);
  configR.value = useRecommendChartConf([
    [3.7, "菜品4"],
    [4.8, "菜品5"],
    [4.9, "菜品6"]
  ]);
});
</script>

<style lang="scss" scoped>
.chart-wrapper {
  height: 40vh;
  width: 35vh;
  align-items: center;
}
.cmp-wrapper {
  background: linear-gradient(0deg, #f6416c, #11999e) no-repeat;
  background-size: 4px 0%;
  background-position: 50% 60px;
  transition: background-size 0.5s;
  &:hover {
    background-size: 4px 100%;
  }
}
.cmp-title {
  text-align: center;
  font-size: 35px;
  width: 100vw;
  white-space: pre-wrap;
}
.chart-text {
  margin-top: 50px;
  text-align: center;
  align-items: center;
}
</style>
