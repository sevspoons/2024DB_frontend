<template>
  <!-- <el-button @click="open">addNewDish</el-button> -->
  <el-dialog v-model="dialogEnable">
    <el-form ref="formRef" :model="formModel" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="菜名" :rules="notEmptyRule">
            <el-input
              v-model="formModel.name"
              clearable
              maxlength="10"
              show-word-limit
              autofocus
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="菜系" :rules="notEmptyRule">
            <el-input
              v-model="formModel.type"
              clearable
              maxlength="5"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="位置" :rules="notEmptyRule">
          <el-input v-model="formModel.canteen" clearable />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="价格" :rules="notEmptyRule">
          <el-input v-model="formModel.price" clearable type="number">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="评分" :rules="notEmptyRule">
          <el-rate v-model="formModel.rate" allow-half />
        </el-form-item>
        <el-form-item label="菜品分量" :rules="notEmptyRule">
          <el-rate
            v-model="formModel.quantity"
            allow-half
            :colors="colors"
            :icons="icons"
            :void-icon="Chicken"
          />
        </el-form-item>
      </el-row>
      <el-form-item label="简介">
        <el-input
          v-model="formModel.content"
          clearable
          maxlength="60"
          show-word-limit
          type="textarea"
          :autosize="{ minRows: 12, maxRows: 14 }"
        />
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="4" :offset="10">
        <el-button @click="handelClick(formModel)">{{
          props.btnText
        }}</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, onMounted } from "vue";
import type { dishInfo } from "@/api/common";
import { Chicken } from "@element-plus/icons-vue";
const icons = [Chicken, Chicken, Chicken];
const colors = ["#f85f73", "#00adb5", "#ff9a00"];
const props = defineProps({
  getInit: Function,
  handelClick: Function,
  btnText: String
});

const dialogEnable = ref(false);
const formModel = ref<dishInfo>(null);
const notEmptyRule = [{ required: true, message: "不能为空", trigger: "blur" }];
onMounted(() => {
  formModel.value = props.getInit();
});

const open = () => {
  dialogEnable.value = true;
};

defineExpose({
  open
});
</script>

<style lang="sass" scoped></style>
