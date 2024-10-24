import { cloneDeep } from "@pureadmin/utils";
const config = {
  dataset: {
    source: null
  },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" }
  },
  grid: { left: "15%", right: "20%" },
  xAxis: { name: "评分" },
  yAxis: { type: "category" },
  visualMap: {
    orient: "horizontal",
    bottom: "-10%",
    min: 0,
    max: 5,
    // Map the score column to color
    dimension: 0,
    inRange: {
      color: ["#65B581", "#FD665F"]
    }
  },
  series: [
    {
      type: "bar",
      encode: {
        // Map the "amount" column to X axis.
        x: "amount",
        // Map the "product" column to Y axis
        y: "product"
      }
    }
  ]
};

const useRecommendChartConf = dataset => {
  const tmp = cloneDeep(config);
  tmp.dataset.source = dataset;
  return tmp;
};

export default useRecommendChartConf;
