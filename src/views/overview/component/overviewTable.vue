<template>
  <div class="ovTable-wrapper">
    <el-row>
      <el-col :span="2">
        <h3>选择食堂</h3>
      </el-col>
      <el-col :span="10">
        <el-select
          v-model="tableConf.canteen.zone"
          style="width: 150px; margin-right: 10px"
          clearable
        >
          <el-option
            v-for="(item, index) in zoneList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select
          v-model="tableConf.canteen.area"
          style="width: 150px; margin-right: 10px"
          clearable
        >
          <el-option
            v-for="(item, index) in areaList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select
          v-model="tableConf.canteen.canteen"
          style="width: 150px"
          clearable
        >
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
      <el-col :span="3" :offset="3">
        <el-button @click="openAddDish">添加新菜品</el-button>
      </el-col>
    </el-row>
    <el-divider>
      <el-icon><Chicken /></el-icon>
    </el-divider>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" table-layout="auto" stripe>
          <el-table-column
            v-for="(item, index) in dishInfoColumns"
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
        v-model:current-page="tableConf.curPage"
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
      :handelClick="addDish"
      btnText="添加"
    />
    <!-- 修改菜品信息表单 -->
    <dishInfoForm
      ref="editDishInfoRef"
      class="edit-dish-info-form"
      :init="dishInfoId"
      :handelClick="
        dishInfo => {
          updateDish(dishInfo).then(() => {
            updateTable();
          });
        }
      "
      btnText="修改"
    />
    <comment ref="commentRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, nextTick, computed } from "vue";
import { getOverview } from "../api";
import { getCanteenInfo } from "@/api/common";
import type { canteenInfo } from "@/api/common";
import {
  dishInfoColumns,
  getDishInfo,
  addDish,
  getPaleDishInfo,
  updateDish
} from "./dataStore";
import { Chicken, EditPen, Comment } from "@element-plus/icons-vue";
import dishInfoForm from "./dishInfoForm.vue";
import comment from "./comment.vue";
const tableConf = reactive({
  curPage: 1,
  pageSize: 10,
  canteen: {
    zone: null,
    area: null,
    canteen: null
  },
  maxPrice: null
});
import { message } from "@/utils/message";
import { isNull } from "util";
const tableData = ref([]);
const maxPrice = ref(null);
const total = ref(0);
const addDishInfoRef = ref(null);
const editDishInfoRef = ref(null);
const commentRef = ref(null);
const dishInfoId = ref({});

watch(
  () => [tableConf.canteen, tableConf.maxPrice],
  () => {
    tableConf.curPage = 1;
    updateTable();
  }
);

watch(
  () => tableConf.curPage,
  () => {
    updateTable();
  }
);

onMounted(() => {
  updateTable();
  loadCanteenInfo();
});

const updateTable = () => {
  console.log("update table data!");
  getOverview(tableConf).then(res => {
    tableData.value = [];
    res.data.dish.forEach(item => {
      tableData.value.push(item);
    });
    total.value = res.data.total;
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

var canteenData: canteenInfo;
const loadCanteenInfo = () => {
  getCanteenInfo()
    .then(res => {
      canteenData = res.data;
      zoneList.value = Object.keys(canteenData);
    })
    .catch(err => {
      message("获取食堂信息失败", { type: "error" });
    });
};

const zoneList = ref([]);
const areaList = computed(() => {
  if (tableConf.canteen.zone == null) {
    return [];
  }
  return Object.keys(canteenData[tableConf.canteen.zone].areas);
});
const canteenList = computed(() => {
  if (tableConf.canteen.zone == null || tableConf.canteen.area == null) {
    return [];
  }
  const area =
    canteenData[tableConf.canteen.zone].areas[tableConf.canteen.area];
  return Object.keys(area.canteens);
});
</script>

<style scoped lang="scss"></style>
