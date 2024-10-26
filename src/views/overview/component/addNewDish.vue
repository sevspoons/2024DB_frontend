<template>
  <!-- <el-button @click="open">addNewDish</el-button> -->
  <el-dialog v-model="dialogEnable">
    <el-form ref="formRef" :model="formModel" label-width="80px">
      <el-form-item label="菜名">
        <el-input v-model="formModel.name" clearable />
      </el-form-item>
      <el-form-item label="菜系">
        <el-input v-model="formModel.type" clearable />
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="formModel.price" clearable />
      </el-form-item>
      <el-form-item label="评分">
        <el-input v-model="formModel.rate" clearable />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formModel.content" clearable />
      </el-form-item>
      <el-form-item label="菜品分量">
        <el-input v-model="formModel.quantity" clearable />
      </el-form-item>
      <el-form-item label="食堂">
        <el-input v-model="formModel.canteen" clearable />
      </el-form-item>
    </el-form>
    <el-button @click="addDish">上传</el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from "vue";
import type { dishInfo } from "@/api/common";

const dialogEnable = ref(false);
const formModel = reactive<dishInfo>({
  id: null, // ID
  name: "", //菜名
  type: "", //菜系
  rank: null, //排名
  price: null, //价格
  rate: null, //评分
  content: "", //简介
  quantity: null, //菜品分量
  canteen: "" //菜品提供的食堂
});

const addDish = () => {
  console.log(toRaw(formModel));
};

const open = () => {
  dialogEnable.value = true;
};

defineExpose({
  open
});
</script>

<style lang="sass" scoped></style>
