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

export type canteenInfo = {
  zones: [
    {
      id: number;
      name: string;
      inschool: boolean;
      popularity: number;
      areas: [
        {
          id: number;
          name: string;
          zone: string;
          canteens: [
            {
              id: number;
              name: string;
              area: string;
              dishNum: number;
              rate: number;
            }
          ];
        }
      ];
    }
  ];
};

export type pRecInfo = {
  rec1: dishInfo;
  rec2: dishInfo;
  rec3: dishInfo;
  recent: dishInfo;
};

export type response<T> = {
  //自动化生成相应数据类型
  code: number;
  message: string;
  data: T;
};

import { http } from "@/utils/http";
import { baseUrlApi } from "./baseurl";

// 获取菜品榜单
export const getRank = (type: string): Promise<response<dishInfo[]>> => {
  return http.request("get", baseUrlApi("rank/get/" + type));
};

// 获取菜品分页总览
export type overviewConfig = {
  config: {
    canteen: string;
    maxPrice: number;
  };
};
export type overview = {
  total: number;
  dish: dishInfo[];
};
export const getOverviewByPage = (
  curPage: number,
  pageSize: number,
  data: overviewConfig
): Promise<response<overview>> => {
  return http.request(
    "post",
    baseUrlApi("info/getByCond/" + curPage + "/" + pageSize),
    {
      data
    }
  );
};

// 用id获取菜品详情
export const getDishInfoById = (
  dishId: number
): Promise<response<dishInfo>> => {
  return http.request("get", baseUrlApi("info/getById/" + dishId));
};

//添加菜品信息
export const addDishInfo = (data: dishInfo) => {
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
  return http.request("get", baseUrlApi("comment/get/" + id));
};

export const getPersonalRecommend = (): Promise<response<pRecInfo>> => {
  return http.request("get", baseUrlApi("other/personalRecommend"));
};

export const getCanteenInfo = (): Promise<response<canteenInfo>> => {
  return http.request("get", baseUrlApi("canteen/get"));
};

export const addCanteenInfo = (data: string, inschool: boolean) => {
  return http.request(
    "put",
    baseUrlApi("canteen/add/" + data + "/" + inschool)
  );
};
