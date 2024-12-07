import { cloneDeep } from "@pureadmin/utils";
const config = {
  dataset: {
    source: null
  },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" }
  },
  grid: { left: "25%", right: "20%" },
  xAxis: { name: "" },
  yAxis: { type: "category" },
  visualMap: {
    orient: "horizontal",
    bottom: "-10%",
    min: 0,
    max: 5,
    // Map the score column to color
    dimension: 0,
    inRange: {
      color: ["#FD665F", "#65B581"]
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

const useRecommendChartConf = (dataset, type) => {
  const tmp = cloneDeep(config);
  tmp.dataset.source = dataset;
  tmp.xAxis.name = type;
  return tmp;
};

export default useRecommendChartConf;
