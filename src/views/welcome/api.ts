export type totalRankItem = {
  name: string; //菜名
  type: string; //菜系
  rank: number; //排名
  price: number; //价格
  rate: number; //评分
  content: string; //简介
  quantity: number; //菜品分量
};

export const getTotalRank = () => {
  return new Promise<totalRankItem[]>(resolve => {
    resolve(tmpTotalRank);
  });
};

export const tmpTotalRank: totalRankItem[] = [
  {
    name: "炒饭",
    type: "湘菜",
    rank: 1,
    price: 12,
    rate: 5,
    content:
      "炒饭是一种中国传统的烹饪方法，是将米饭和其他食材一起炒制而成的一道菜肴。",
    quantity: 5 // Updated value
  },
  {
    name: "炒面",
    type: "川菜",
    rank: 2,
    price: 10,
    rate: 4,
    content:
      "炒面是一种中国传统的烹饪方法，是将面条和其他食材一起炒制而成的一道菜肴。",
    quantity: 4 // Updated value
  },
  {
    name: "炒菜",
    type: "粤菜",
    rank: 3,
    price: 15,
    rate: 3,
    content:
      "炒菜是一种中国传统的烹饪方法，是将蔬菜和其他食材一起炒制而成的一道菜肴。",
    quantity: 3 // Updated value
  },
  {
    name: "炒饼",
    type: "鲁菜",
    rank: 4,
    price: 8,
    rate: 2,
    content:
      "炒饼是一种中国传统的烹饪方法，是将饼和其他食材一起炒制而成的一道菜肴。",
    quantity: 2 // Updated value
  },
  {
    name: "炒粉",
    type: "闽菜",
    rank: 5,
    price: 11,
    rate: 4,
    content:
      "炒粉是一种中国传统的烹饪方法，是将粉条和其他食材一起炒制而成的一道菜肴。",
    quantity: 4 // Updated value
  },
  {
    name: "炒粿",
    type: "浙菜",
    rank: 6,
    price: 13,
    rate: 5,
    content:
      "炒粿是一种中国传统的烹饪方法，是将粿和其他食材一起炒制而成的一道菜肴。",
    quantity: 5 // Updated value
  }
];
