export type userInfo = {
  avatar: string;
  nickname: string;
  address: string;
  phone: string;
  tag: string;
  place: string;
};

export type HistoryList = string[]; // 初始化为空数组

export type responseget<T> = {
  //自动化生成相应数据类型
  success: boolean;
  data: T;
};

export type responseput = {
  //自动化生成相应数据类型
  success: boolean;
};

import { http } from "@/utils/http";
import { baseUrlApi } from "./baseurl";

export const getUserInfo = (): Promise<responseget<userInfo>> => {
  return http.request<responseget<userInfo>>("get", baseUrlApi("user/getInfo"));
};

export const putUserInfo = (userInfo: userInfo): Promise<responseput> => {
  return http.request<responseput>("put", baseUrlApi("user/updateInfo"), {
    data: { data: userInfo }
  });
};

export const getUserHis = (): Promise<responseget<HistoryList>> => {
  return http.request<responseget<HistoryList>>(
    "get",
    baseUrlApi("other/history")
  );
};
