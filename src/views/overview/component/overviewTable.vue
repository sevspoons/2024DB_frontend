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
        <el-button @click="handelAddNewDish">添加新菜品</el-button>
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
    <addNewDish ref="addNewDishRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import { getOverview } from "../api";
import { dishInfoColums, canteenList } from "./colums";
import { Chicken } from "@element-plus/icons-vue";
import addNewDish from "./addNewDish.vue";
const tableConf = reactive({
  currentPage: 1,
  pageSize: 10,
  canteen: "",
  maxPrice: null
});
const tableData = ref([]);
const maxPrice = ref(null);
const total = ref(0);
const addNewDishRef = ref(null);

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

const handelAddNewDish = () => {
  addNewDishRef.value.open();
};
</script>

<style scoped lang="scss"></style>
