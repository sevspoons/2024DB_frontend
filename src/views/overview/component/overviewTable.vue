<template>
  <div class="ovTable-wrapper">
    <el-row>
      <el-col :span="2">
        <h3>选择食堂</h3>
      </el-col>
      <el-col :span="4">
        <el-select v-model="tableConf.canteen" style="width: 200px">
          <el-option
            v-for="(item, index) in canteenList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="2">
        <h3>预算价格</h3>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="maxPrice"
          type="number"
          placeholder="请输入预算最大价格"
          style="width: 200px"
          @blur="tableConf.maxPrice = maxPrice"
        />
      </el-col>
      <el-col :span="3" :offset="8">
        <el-button @click="openAddDish">添加新菜品</el-button>
      </el-col>
    </el-row>
    <el-divider><Chicken /></el-divider>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" table-layout="auto" stripe>
          <el-table-column
            v-for="(item, index) in dishInfoColums"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          />
          <el-table-column label="操作" render>
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                :icon="EditPen"
                circle
                @click="editDishInfo(scope.row)"
              />
              <el-button
                size="small"
                type="info"
                :icon="Comment"
                circle
                @click="commentDish(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination
        v-model:current-page="tableConf.currentPage"
        v-model:page-size="tableConf.pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      />
    </el-row>
    <dishInfoForm
      ref="addDishInfoRef"
      :getInit="getPaleDishInfo"
      :handelClick="addDishInfo"
      btnText="添加"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import { getOverview } from "../api";
import {
  dishInfoColums,
  canteenList,
  getDishInfo,
  addDishInfo,
  getPaleDishInfo
} from "./dataStore";
import { Chicken, EditPen, Comment } from "@element-plus/icons-vue";
import dishInfoForm from "./dishInfoForm.vue";
const tableConf = reactive({
  currentPage: 1,
  pageSize: 10,
  canteen: "",
  maxPrice: null
});
import { message } from "@/utils/message";
const tableData = ref([]);
const maxPrice = ref(null);
const total = ref(0);
const addDishInfoRef = ref(null);

watch(
  () => tableConf,
  () => updateTable(),
  { deep: true }
);

onMounted(() => updateTable());

const updateTable = () => {
  console.log("update table data!");
  getOverview(tableConf).then(res => {
    tableData.value = res.data;
    total.value = res.total;
  });
};

const openAddDish = () => {
  addDishInfoRef.value.open();
};

const editDishInfo = row => {
  console.log("edit dish info", row);
  message("修改信息", { type: "info" });
};

const commentDish = row => {
  console.log("comment dish info", row);
  message("评价菜品", { type: "info" });
};
</script>

<style scoped lang="scss"></style>
