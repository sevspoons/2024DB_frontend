export type userInfo = {
  avatar: "";
  nickname: "";
  address: "";
  phone: "";
  tag: "";
  place: "";
};

export type response<T> = {
  //自动化生成相应数据类型
  success: boolean;
  data: T;
};

import { http } from "@/utils/http";
// import { baseUrlApi } from "./baseurl";

export const getUserInfo = (): Promise<response<userInfo>> => {
  return http.request(
    "get",
    "http://127.0.0.1:4523/m1/5193970-4859780-default/user/getInfo"
  );
};
