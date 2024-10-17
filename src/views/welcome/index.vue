<script setup lang="ts">
import { number } from "echarts";
import { ref, onMounted } from "vue";
import { getTotalRank } from "./api";
import { Chicken } from "@element-plus/icons-vue";
defineOptions({
  name: "Welcome"
});

const total_rank_datalist = ref([]);
const total_rank_active = ref(1);
const icons = [Chicken, Chicken, Chicken];
const colors = ["#f85f73", "#00adb5", "#ff9a00"];
onMounted(() => {
  // 获取最近一周的食物排行榜
  getTotalRank().then(res => {
    total_rank_datalist.value = res;
  });
});
</script>

<template>
  <div class="welcome-wrapper">
    <el-row>
      <el-col :span="8">
        <el-card>
          <div class="welcome-card">
            <h1>食光航迹</h1>
            <p>北航师生专属的美食导航仪</p>
          </div>
        </el-card>
        <el-card>
          <div class="total-rank">
            <h2>最近一周BUAAer都在吃的:<b style="color: #ff9a00">TOP10</b></h2>
            <br />
            <el-collapse v-model="total_rank_active" accordion>
              <el-collapse-item
                v-for="(item, index) in total_rank_datalist"
                :key="index"
                :name="item.rank"
              >
                <template #title>
                  <h3>{{ "NO." + item.rank + "---" + item.name }}</h3>
                </template>
                <template #default>
                  <el-row>
                    <el-col :span="3">
                      <h1 style="color: #f85f73; margin-bottom: 2px">
                        ¥{{ item.price }}
                      </h1>
                      <h2 style="color: #00adb5">{{ item.type }}</h2>
                    </el-col>
                    <el-col :span="21">
                      <el-row>
                        <el-col :span="12">
                          <el-rate v-model="item.rate" disabled />
                        </el-col>
                        <el-col :span="12">
                          <el-rate
                            v-model="item.quantity"
                            :icons="icons"
                            :void-icon="Chicken"
                            :colors="colors"
                            disabled
                          />
                        </el-col>
                      </el-row>
                      <p>{{ item.content }}</p>
                    </el-col>
                  </el-row>
                </template>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-card) {
  margin-bottom: 20px;
}
</style>
