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
  dishId: number; // 菜品ID
  userName: string; // 用户名
  comment: string; // 评论
  rate: number; // 评分
};
