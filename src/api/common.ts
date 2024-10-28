export type dishInfo = {
  id: number; // ID
  name: string; //菜名
  type: string; //菜系
  rank: number; //排名
  price: number; //价格
  rate: number; //评分
  content: string; //简介
  quantity: number; //菜品分量
  canteen: string; //菜品提供的食堂
};

export type commentInfo = {
  comment: string; // 评论
  rate: number; // 评分
  quantity: number; //菜品分量
};

export type response<T> = {
  //自动化生成相应数据类型
  code: number;
  message: string;
  data: T;
};

import { http } from "@/utils/http";
import { baseUrlApi } from "./baseurl";

export const getDishInfoById = (
  dishId: number
): Promise<response<dishInfo>> => {
  return http.request("get", baseUrlApi("info/getById/" + dishId));
};

export const addDishInfoById = (data: dishInfo) => {
  return http.request("put", baseUrlApi("info/add"), { data });
};

export const updateDishInfo = (id: number, data: dishInfo) => {
  return http.request("put", baseUrlApi("info/update/" + id), {
    data
  });
};

export const addComment = (id: number, data: commentInfo) => {
  return http.request("put", baseUrlApi("comment/add/" + id), {
    data
  });
};

export const getCommentsById = (
  id: number
): Promise<response<commentInfo[]>> => {
  return http.request("put", baseUrlApi("comment/get/" + id));
};
