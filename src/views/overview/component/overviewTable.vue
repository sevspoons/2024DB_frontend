<template>
  <div class="ovTable-wrapper">
    <el-row>
      <el-col :span="2">
        <h3>选择食堂</h3>
      </el-col>
      <el-col :span="10">
        <el-select
          v-for="(type, index) in ['zone', 'area', 'canteen']"
          :key="index"
          v-model="tableConf.canteen[type]"
          style="width: 150px; margin-right: 10px"
          clearable
        >
          <el-option
            v-for="(item, index) in type == 'zone'
              ? zoneList
              : type == 'area'
                ? areaList
                : canteenList"
            :key="index"
            :label="item.name"
            :value="item"
          />
          <template #footer>
            <el-button
              v-if="!isAdding"
              text
              bg
              size="small"
              @click="onAddOption(type)"
            >
              添加新条目
            </el-button>
            <template v-else>
              <el-input
                v-model="optionName"
                class="option-input"
                placeholder="输入条目名"
                size="small"
                required
              />
              <el-checkbox
                v-if="type == 'zone'"
                v-model="inSchool"
                label="校内"
              />
              <el-button
                type="primary"
                size="small"
                style="margin-left: 50%"
                @click="onConfirm(type)"
              >
                添加
              </el-button>
              <el-button size="small" @click="clear">取消</el-button>
            </template>
          </template>
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
import { getCanteenInfo, addCanteenInfo } from "@/api/common";
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
const tableData = ref([]);
const maxPrice = ref(null);
const total = ref(0);
const addDishInfoRef = ref(null);
const editDishInfoRef = ref(null);
const commentRef = ref(null);
const dishInfoId = ref({});

watch(
  //跨级选中时更新父节点
  () => tableConf.canteen,
  () => {
    if (tableConf.canteen.canteen != null) {
      if (tableConf.canteen.area == null || tableConf.canteen.zone == null) {
        canteenData.value.forEach(zone => {
          zone.areas.forEach(area => {
            area.canteens.forEach(canteen => {
              if (canteen.id == tableConf.canteen.canteen.id) {
                tableConf.canteen.area = area;
                tableConf.canteen.zone = zone;
                return;
              }
            });
          });
        });
      }
    } else if (
      tableConf.canteen.area != null &&
      tableConf.canteen.zone == null
    ) {
      canteenData.value.forEach(zone => {
        zone.areas.forEach(area => {
          if (area.id == tableConf.canteen.area.id) {
            tableConf.canteen.zone = zone;
            return;
          }
        });
      });
    }
  },
  { deep: true }
);

watch(
  () => [tableConf.canteen, tableConf.maxPrice],
  () => {
    tableConf.curPage = 1;
    updateTable();
  },
  { deep: true }
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

var canteenData = ref([]);
const loadCanteenInfo = () => {
  getCanteenInfo()
    .then(res => {
      canteenData.value = res.data.zones;
      console.log(canteenData);
    })
    .catch(err => {
      message("获取食堂信息失败", { type: "error" });
    });
};
//区域表
const zoneList = computed(() => {
  return canteenData.value;
});
//餐饮区表
const areaList = computed(() => {
  if (tableConf.canteen.zone == null) {
    const res = [];
    zoneList.value.forEach(item => {
      item.areas.forEach(area => {
        res.push(area);
      });
    });
    return res;
  } else {
    const zone = tableConf.canteen.zone;
    return zone.areas;
  }
});
//窗口表
const canteenList = computed(() => {
  if (tableConf.canteen.zone == null) {
    //区域级没选择
    const res = [];
    zoneList.value.forEach(zone => {
      zone.areas.forEach(area => {
        area.canteens.forEach(canteen => {
          res.push(canteen);
        });
      });
    });
    return res;
  } else if (tableConf.canteen.area == null) {
    //餐饮区级没选择
    const zone = tableConf.canteen.zone;
    const res = [];
    zone.areas.forEach(area => {
      area.canteens.forEach(canteen => {
        res.push(canteen);
      });
    });
    return res;
  } else {
    //都选择了
    const area = tableConf.canteen.area;
    return area.canteens;
  }
});

const isAdding = ref(false);
const optionName = ref("");
const inSchool = ref(true);
const onAddOption = (type: string) => {
  if (type == "area" && tableConf.canteen.zone == null) {
    message("请先选择前置区域", { type: "warning" });
  } else if (type == "canteen" && tableConf.canteen.area == null) {
    message("请先选择前置餐饮区", { type: "warning" });
  } else {
    isAdding.value = true;
  }
};

const onConfirm = (type: string) => {
  if (optionName.value == "") {
    message("请输入条目名", { type: "warning" });
    return;
  }
  let data = "";
  if (type == "zone") {
    data = optionName.value;
  } else if (type == "area") {
    data = tableConf.canteen.zone.name + "-" + optionName.value;
  } else {
    data =
      tableConf.canteen.zone.name +
      "-" +
      tableConf.canteen.area.name +
      "-" +
      optionName.value;
  }
  addCanteenInfo(optionName.value, inSchool.value).then(() => {
    loadCanteenInfo();
    clear();
  });
};

const clear = () => {
  optionName.value = "";
  isAdding.value = false;
};
</script>

<style scoped lang="scss"></style>
