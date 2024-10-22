import type { dishInfo } from "@/api/common";

export const getOverview = config => {
  return new Promise<overview>(resolve => {
    resolve(tmpOverview);
  });
};

type overview = {
  total: number;
  data: dishInfo[];
};

const tmpOverview: overview = {
  total: 30,
  data: [
    {
      id: 1,
      name: "炒饭",
      type: "湘菜",
      rank: 1,
      price: 12,
      rate: 4.5,
      content:
        "炒饭是一种中国传统的烹饪方法，是将米饭和其他食材一起炒制而成的一道菜肴。",
      quantity: 5,
      canteen: "食堂A"
    },
    {
      id: 2,
      name: "炒面",
      type: "川菜",
      rank: 2,
      price: 10,
      rate: 4.3,
      content:
        "炒面是一种中国传统的烹饪方法，是将面条和其他食材一起炒制而成的一道菜肴。",
      quantity: 4,
      canteen: "食堂B"
    },
    {
      id: 3,
      name: "炒菜",
      type: "粤菜",
      rank: 3,
      price: 15,
      rate: 3,
      content:
        "炒菜是一种中国传统的烹饪方法，是将蔬菜和其他食材一起炒制而成的一道菜肴。",
      quantity: 3,
      canteen: "食堂C"
    },
    {
      id: 4,
      name: "炒饼",
      type: "鲁菜",
      rank: 4,
      price: 8,
      rate: 2,
      content:
        "炒饼是一种中国传统的烹饪方法，是将饼和其他食材一起炒制而成的一道菜肴。",
      quantity: 2,
      canteen: "食堂D"
    },
    {
      id: 5,
      name: "炒粉",
      type: "闽菜",
      rank: 5,
      price: 11,
      rate: 4,
      content:
        "炒粉是一种中国传统的烹饪方法，是将粉条和其他食材一起炒制而成的一道菜肴。",
      quantity: 4,
      canteen: "食堂E"
    },
    {
      id: 6,
      name: "炒粿",
      type: "浙菜",
      rank: 6,
      price: 13,
      rate: 4.8,
      content:
        "炒粿是一种中国传统的烹饪方法，是将粿和其他食材一起炒制而成的一道菜肴。",
      quantity: 5,
      canteen: "食堂F"
    },
    {
      id: 7,
      name: "炒年糕",
      type: "苏菜",
      rank: 7,
      price: 14,
      rate: 4.6,
      content:
        "炒年糕是一种中国传统的烹饪方法，是将年糕和其他食材一起炒制而成的一道菜肴。",
      quantity: 3,
      canteen: "食堂G"
    },
    {
      id: 8,
      name: "炒米粉",
      type: "徽菜",
      rank: 8,
      price: 9,
      rate: 4.2,
      content:
        "炒米粉是一种中国传统的烹饪方法，是将米粉和其他食材一起炒制而成的一道菜肴。",
      quantity: 4,
      canteen: "食堂H"
    },
    {
      id: 9,
      name: "炒河粉",
      type: "豫菜",
      rank: 9,
      price: 11,
      rate: 4.1,
      content:
        "炒河粉是一种中国传统的烹饪方法，是将河粉和其他食材一起炒制而成的一道菜肴。",
      quantity: 3,
      canteen: "食堂I"
    },
    {
      id: 10,
      name: "炒乌冬面",
      type: "晋菜",
      rank: 10,
      price: 16,
      rate: 4.7,
      content:
        "炒乌冬面是一种中国传统的烹饪方法，是将乌冬面和其他食材一起炒制而成的一道菜肴。",
      quantity: 5,
      canteen: "食堂J"
    }
  ]
};
