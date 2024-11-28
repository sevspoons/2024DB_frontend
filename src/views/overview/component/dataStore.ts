import type { dishInfo } from "@/api/common";
import { getDishInfoById, addDishInfo, updateDishInfo } from "@/api/common";
import { message } from "@/utils/message";

export const dishInfoColumns = [
  { prop: "name", label: "菜名" },
  { prop: "type", label: "菜系" },
  { prop: "price", label: "价格" },
  { prop: "rate", label: "评分" },
  { prop: "quantity", label: "菜品分量" },
  { prop: "canteen", label: "食堂" },
  { prop: "content", label: "简介" }
];

export const getPaleDishInfo = (): dishInfo => {
  return {
    id: null, // ID
    name: "", //菜名
    type: "", //菜系
    rank: null, //排名
    price: null, //价格
    rate: null, //评分
    content: "", //简介
    quantity: null, //菜品分量
    canteen: "" //菜品提供的食堂
  };
};

export const getDishInfo = async (id: number): Promise<dishInfo> => {
  return getDishInfoById(id)
    .then(res => {
      message("查询成功", { type: "success" });
      return res.data;
    })
    .catch(err => {
      message("查询失败", { type: "error" });
      console.log(err);
      return null;
    });
};

export const addDish = (dishInfo: dishInfo) => {
  addDishInfo(dishInfo)
    .then(() => {
      message("添加成功", { type: "success" });
    })
    .catch(err => {
      message("添加失败", { type: "error" });
      console.log(err);
    });
};

export const updateDish = async (dishInfo: dishInfo) => {
  await updateDishInfo(dishInfo.id, dishInfo)
    .then(() => {
      message("更新成功", { type: "success" });
    })
    .catch(err => {
      message("更新失败", { type: "error" });
      console.log(err);
    });
};
