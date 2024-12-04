export type userInfo = {
  avatar: string;
  nickname: string;
  address: string;
  phone: string;
  tag: string;
  place: string;
};

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
// import { baseUrlApi } from "./baseurl";

export const getUserInfo = (): Promise<responseget<userInfo>> => {
  return http.request(
    "get",
    "http://127.0.0.1:4523/m1/5193970-4859780-default/user/getInfo"
  );
};

export const putUserInfo = (userInfo: userInfo): Promise<responseput> => {
  return http.request(
    "put",
    "http://127.0.0.1:4523/m1/5193970-4859780-default/user/updateInfo",
    { data: userInfo }
  );
};
