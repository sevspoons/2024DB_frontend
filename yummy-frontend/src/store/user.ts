import { defineStore } from "pinia";

type userData = {
  id: number;
  name: string;
  age: number;
}

const user: userData = {
  id: 0,
  name: "default",
  age: 0
}

export const useUserStore = defineStore("user", {
  state: () => user,
})