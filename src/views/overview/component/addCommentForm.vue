<template>
  <!-- <el-button @click="open">addNewDish</el-button> -->
  <el-dialog v-model="dialogEnable">
    <template #header>
      <h3>添加菜品评价</h3>
      <el-divider />
    </template>
    <el-form ref="formRef" :model="formModel" label-width="80px">
      <el-row>
        <el-form-item label="评分" prop="rate" :rules="notEmptyRule">
          <el-rate v-model="formModel.rate" allow-half />
        </el-form-item>
        <el-form-item label="菜品分量" prop="quantity" :rules="notEmptyRule">
          <el-rate
            v-model="formModel.quantity"
            allow-half
            :colors="colors"
            :icons="icons"
            :void-icon="Chicken"
          />
        </el-form-item>
      </el-row>
      <el-col :span="22">
        <el-form-item label="简介" :rules="notEmptyRule">
          <el-input
            v-model="formModel.content"
            clearable
            maxlength="60"
            show-word-limit
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 12 }"
          />
        </el-form-item>
      </el-col>
    </el-form>
    <el-row>
      <el-col :span="4" :offset="8">
        <el-button @click="handelSubmit(formRef)">提交评价</el-button>
      </el-col>
      <el-col :span="4" :offset="2">
        <el-button @click="handelClear(formRef)">重置</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "element-plus";
import { Chicken } from "@element-plus/icons-vue";
import { message } from "@/utils/message";
import { addComment } from "@/api/common";
import { cloneDeep } from "@pureadmin/utils";
const init = {
  rate: null,
  quantity: null,
  content: ""
};
const formRef = ref<FormInstance>();
const icons = [Chicken, Chicken, Chicken];
const colors = ["#f85f73", "#00adb5", "#ff9a00"];

const dialogEnable = ref(false);
const formModel = ref(null);
const notEmptyRule = [{ required: true, message: "不能为空", trigger: "blur" }];

let id = null;
const handelClick = (id: number, data) => {
  addComment(id, data)
    .then(res => {
      message("添加成功", { type: "success" });
    })
    .catch(err => {
      message("添加失败", { type: "error" });
    });
};

const handelSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      handelClick(id, formModel.value);
      dialogEnable.value = false;
      handelClear(formEl);
    } else {
      message("缺少必填项!", { type: "error" });
    }
  });
};
const handelClear = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  formModel.value = cloneDeep(init);
};

//expose func
const open = (dishId: number) => {
  dialogEnable.value = true;
  formModel.value = cloneDeep(init);
  id = dishId;
};
defineExpose({
  open
});
</script>

<style lang="sass" scoped></style>
