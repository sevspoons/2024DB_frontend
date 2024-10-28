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
              <el-tooltip content="修改" placement="left">
                <el-button
                  size="small"
                  type="primary"
                  :icon="EditPen"
                  circle
                  @click="openUpdateDish(scope.row)"
                />
              </el-tooltip>
              <el-tooltip content="评价" placement="right">
                <el-button
                  size="small"
                  type="info"
                  :icon="Comment"
                  circle
                  @click="openDishComment(scope.row)"
                />
              </el-tooltip>
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
    <!-- 添加菜品信息表单 -->
    <dishInfoForm
      ref="addDishInfoRef"
      class="add-dish-info-form"
      :init="getPaleDishInfo()"
      :handelClick="addDishInfo"
      btnText="添加"
    />
    <!-- 修改菜品信息表单 -->
    <dishInfoForm
      ref="editDishInfoRef"
      class="edit-dish-info-form"
      :init="dishInfoId"
      :handelClick="
        dishInfo => {
          updateDish(dishInfo);
          updateTable();
        }
      "
      btnText="修改"
    />
    <comment ref="commentRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, nextTick } from "vue";
import { getOverview } from "../api";
import {
  dishInfoColums,
  canteenList,
  getDishInfo,
  addDishInfo,
  getPaleDishInfo,
  updateDish
} from "./dataStore";
import { Chicken, EditPen, Comment } from "@element-plus/icons-vue";
import dishInfoForm from "./dishInfoForm.vue";
import comment from "./comment.vue";
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
const editDishInfoRef = ref(null);
const commentRef = ref(null);
const dishInfoId = ref({});

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

const openUpdateDish = row => {
  dishInfoId.value = row;
  nextTick(() => {
    editDishInfoRef.value.open();
  });
};

const openDishComment = row => {
  commentRef.value.open(row);
};
</script>

<style scoped lang="scss"></style>
