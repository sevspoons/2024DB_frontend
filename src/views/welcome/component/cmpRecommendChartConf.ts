export const config_Light = {
  dataset: {
    source: [
      [9, "菜品1"],
      [8, "菜品2"],
      [3, "菜品3"]
    ]
  },
  grid: { left: "15%", right: "20%" },
  xAxis: { name: "好评数" },
  yAxis: { type: "category" },
  visualMap: {
    orient: "horizontal",
    bottom: "-10%",
    min: 0,
    max: 10,
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
