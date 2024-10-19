<template>
  <div class="chart-container">
    <div ref="chartRef" class="chart" />
    <!-- <el-popover
      :virtual-ref="chartRef"
      trigger="click"
      virtual-triggering
      placement="top"
      transition="el-zoom-in-center"
      :popper-style="{ minWidth: '80px', width: 'auto', padding: '0' }"
    >
      <el-button @click="downloadSvg" text>下载 SVG</el-button>
    </el-popover> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue";
import * as echarts from "echarts"; // 确保 ECharts 库导入
import { useDark } from "@pureadmin/utils"; // 确保 useDark 正确导入
// 接收父组件传递的 props
const props = defineProps<{
  config;
}>();
// 兼容 dark 主题
const { isDark } = useDark();
const theme = computed(() => (isDark.value ? "dark" : "default"));

// 初始化 ECharts
const chartRef = ref(null);
let chartInstance;
// 组件ref
const initChart = () => {
  //chartRef获取到外部传递过来的相关的组件信息，然后再根据外部的DOM信息来更新当前子组件的相关信息（例如长/宽等）
  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.dispose(); // 销毁已存在的实例
    }
    chartInstance = echarts.init(chartRef.value, theme.value, {
      renderer: "svg"
    });
    updateChart();
  }
};

const updateChart = () => {
  //监听到initChart函数后则开始赋值config和datalist
  if (chartInstance && props.config) {
    // console.log(props.config)
    const options = { ...props.config };
    chartInstance.setOption(options);
  }
};

//更新chart的比例大小
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

const getSvg = () => {
  return chartInstance.getDom().querySelector("svg");
};

async function downloadSvg() {
  const svg = chartInstance.getDom().querySelector("svg");
  //转字符串
  const svgString = new XMLSerializer().serializeToString(svg);

  // 创建 Blob 对象
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

  // 创建下载链接
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "chart.svg";

  // 触发下载
  link.click();

  //移除链接
  URL.revokeObjectURL(link.href);
}
onMounted(() => {
  initChart();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
});

watch(theme, () => {
  if (chartInstance) {
    chartInstance.dispose(); // 重新创建实例以应用新主题
  }
  initChart();
});

// 监听配置变化
watch(
  () => props.config,
  () => {
    updateChart();
  },
  { deep: true }
);

defineExpose({
  initChart,
  resizeChart,
  getSvg
});
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 80vw;
  max-height: 80vh;
  margin: auto; /* Center the container */
}

.explain,
.chart-title {
  width: 100%;
  text-align: center;
  border: 0.1em solid black; /* 使用相对较小的单位设置边框 */
  background-color: #f8f8f8; /* 设置背景颜色 */
  padding: 0.5em; /* 使用相对较小的单位设置内边距 */
  height: 10%; /* 设置固定的高度比例 */
  margin: 0.5em 0; /* 使用相对较小的单位设置上下外边距 */
  font-size: 2vh; /* 使用视口单位设置字体大小 */
}

.chart {
  flex: 1;
  width: 100%;
}
</style>
