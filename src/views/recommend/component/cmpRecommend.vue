<template>
  <div class="cmp-wrapper" style="height: 40vh">
    <el-row>
      <h1 class="cmp-title">
        <b style="color: #11999e">{{ "健康清淡" }}</b>
        <b>{{ "      vs      " }}</b>
        <b style="color: #88304e">{{ "麻辣鲜香" }}</b>
      </h1>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="cmp-left">
          <div class="chart-wrapper">
            <simpleChart :config="props.configL" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="cmp-right">
          <div class="chart-wrapper">
            <simpleChart :config="props.configR" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import simpleChart from "@/components/simpleChart.vue";
const props = defineProps<{
  configL;
  configR;
}>();
</script>

<style lang="scss" scoped>
.chart-wrapper {
  height: 40vh;
  width: 40vh;
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
  width: 100vw;
  white-space: pre-wrap;
}
</style>
