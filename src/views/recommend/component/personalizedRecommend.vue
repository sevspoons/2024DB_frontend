<template>
  <div class="psr-wrapper">
    <h1 class="psr-title">个性化推荐</h1>
    <p class="sub-title">依据你的评价历史生成,评价越多推荐越精准~</p>
    <el-divider>
      <el-icon :size="30"><Dessert /></el-icon>
    </el-divider>
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="psr-item">
          <el-card>
            <h2>您最近似乎常吃{{ "dishName1" }}</h2>
            <h2>
              同在{{ "place1" }}的菜品:<br />{{ "dishName2" }}评价似乎不错
            </h2>
            <h1>快去试试?</h1>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="psr-item">
            <h2>别总是在{{ "place1" }}</h2>
            <h2>{{ "place2" }}的{{ "dishName2" }}人气高涨</h2>
            <h1>换个口味,换个心情!</h1>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <div class="psr-item last">
          <el-card>
            <h2>不少同学和你一样爱吃{{ "dishName1" }}</h2>
            <h2>他们最近还尝过{{ "place1" }}的{{ "dishName2" }}</h2>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Dessert } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.psr-wrapper {
  .psr-title {
    font-size: 25px;
    transition:
      font-size 0.3s,
      color 0.3s;
  }
  .sub-title {
    font-size: 15px;
    color: #666;
  }
  &:hover {
    .psr-title {
      font-size: 28px;
      color: #752100;
    }
  }
}
</style>
