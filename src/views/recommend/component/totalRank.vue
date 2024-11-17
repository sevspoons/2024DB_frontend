<script lang="tsx" setup>
import { ref, onMounted } from "vue";
import { getTotalRank } from "../api";
import { Chicken } from "@element-plus/icons-vue";
const total_rank_datalist = ref([]);
const total_rank_active = ref(1);
const icons = [Chicken, Chicken, Chicken];
const colors = ["#f85f73", "#00adb5", "#ff9a00"];
onMounted(() => {
  // 获取最近一周的食物排行榜 插入到total_rank_datalist中
  getTotalRank().then(res => {
    res.data.forEach(item => {
      total_rank_datalist.value.push(item);
    });
  });
});
</script>

<template>
  <div class="total-rank">
    <h2>最近一周BUAAer都在吃的:<b style="color: #ff9a00">TOP10</b></h2>
    <p style="font-size: 12px; color: #1f1f1f">
      我们北航们也有自己的<b style="color: #ff9a00">必吃榜</b>
    </p>
    <br />
    <el-collapse v-model="total_rank_active" accordion>
      <el-collapse-item
        v-for="(item, index) in total_rank_datalist"
        :key="index"
        :name="item.rank"
      >
        <template #title>
          <h1>{{ "NO." + item.rank + "    " + item.name }}</h1>
          <h4 style="color: #50616d; white-space: pre-wrap">
            {{ "     - - - -    " + item.canteen }}
          </h4>
        </template>
        <template #default>
          <el-row>
            <el-col :span="3">
              <h1 style="color: #f85f73; margin-bottom: 2px">
                ¥{{ item.price }}
              </h1>
              <h2 style="color: #ff7e67">{{ item.type }}</h2>
            </el-col>
            <el-col :span="21">
              <el-row>
                <el-col :span="12">
                  <el-rate
                    v-model="item.rate"
                    show-score
                    score-template="评分: {value}"
                    disabled
                  />
                </el-col>
                <el-col :span="12">
                  <el-rate
                    v-model="item.quantity"
                    :icons="icons"
                    :void-icon="Chicken"
                    :colors="colors"
                    show-score
                    score-template="份量: {value}"
                    disabled
                  />
                </el-col>
              </el-row>
              <b class="total-rank-content">{{ item.content }}</b>
            </el-col>
          </el-row>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-rate__text) {
  color: #b25d25;
}
.total-rank-content {
  color: #493131;
}
.total-rank {
  background: linear-gradient(90deg, #f6416c, #11999e) no-repeat;
  background-size: 0% 4px;
  background-position: 0 60px;
  transition: background-size 0.5s;
  &:hover {
    background-size: 100% 4px;
  }
}
</style>
