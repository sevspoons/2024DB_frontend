<template>
  <!-- <el-button @click="open">addNewDish</el-button> -->
  <el-dialog v-model="dialogEnable">
    <template #header>
      <h3>{{ props.btnText + "菜品信息" }}</h3>
      <el-divider />
    </template>
    <el-form ref="formRef" :model="formModel" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="菜名" prop="name" :rules="notEmptyRule">
            <el-input
              v-model="formModel.name"
              clearable
              maxlength="10"
              show-word-limit
              autofocus
              :disabled="props.canteenInfo == null"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="菜系" prop="type" :rules="notEmptyRule">
            <el-input
              v-model="formModel.type"
              clearable
              maxlength="5"
              show-word-limit
              :disabled="props.canteenInfo == null"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!props.canteenInfo">
        <el-form-item label="位置" prop="canteen" :rules="notEmptyRule">
          <el-input v-model="formModel.canteen" clearable disabled />
        </el-form-item>
      </el-row>
      <el-row v-else>
        <el-col :span="10">
          <el-form-item label="位置" prop="canteen" :rules="notEmptyRule">
            <el-select v-model="formModel.canteen" filterable>
              <el-option
                v-for="(item, index) in props.canteenInfo"
                :key="index"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="价格" prop="price" :rules="notEmptyRule">
          <el-input v-model="formModel.price" clearable type="number">
            <template #append>元</template>
          </el-input>
        </el-form-item>
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
        <el-button @click="handelSubmit(formRef)">{{
          props.btnText
        }}</el-button>
      </el-col>
      <el-col :span="4" :offset="2">
        <el-button @click="handelClear(formRef)">重置</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import type { dishInfo } from "@/api/common";
import { Chicken } from "@element-plus/icons-vue";
import { message } from "@/utils/message";
import { cloneDeep } from "@pureadmin/utils";
const formRef = ref<FormInstance>();
const icons = [Chicken, Chicken, Chicken];
const colors = ["#f85f73", "#00adb5", "#ff9a00"];
const props = defineProps({
  init: {},
  handelClick: Function,
  btnText: String,
  canteenInfo: []
});

const dialogEnable = ref(false);
const formModel = ref<dishInfo>(null);
const notEmptyRule = [{ required: true, message: "不能为空", trigger: "blur" }];
onMounted(() => {
  formModel.value = cloneDeep(props.init);
});
const handelSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      props.handelClick(formModel.value);
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
  formModel.value = cloneDeep(props.init);
};

//expose func
const open = () => {
  formModel.value = cloneDeep(props.init);
  dialogEnable.value = true;
};
defineExpose({
  open
});
</script>

<style lang="sass" scoped></style>
