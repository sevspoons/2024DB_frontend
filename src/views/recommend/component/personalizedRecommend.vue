<template>
  <div class="psr-wrapper">
    <h1 class="psr-title">个性化推荐</h1>
    <p class="sub-title">依据你的评价历史生成,评价越多推荐越精准~</p>
    <el-divider>
      <el-icon :size="30"><Dessert /></el-icon>
    </el-divider>
    <el-row :gutter="10" style="text-align: center">
      <el-col :span="8">
        <div class="psr-item">
          <el-card>
            <h3>
              您最近似乎常吃
              <h2 class="rec-name">{{ rec.recent.name }}</h2>
            </h3>
            <h3>
              同在
              <h3 class="rec-canteen">{{ rec.recent.canteen }}</h3>
              的菜品:
              <h2 class="rec-name">{{ rec.rec1.name }}</h2>
              评价似乎不错,快去试试?
            </h3>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="psr-item">
            <h3>
              除了
              <h3 class="rec-canteen">{{ rec.recent.canteen }}</h3>
            </h3>
            <h3>
              在
              <h3 class="rec-canteen">{{ rec.rec2.canteen }}</h3>
              的
              <h2 class="rec-name">{{ rec.rec2.name }}</h2>
              人气高涨
            </h3>
            <h3>换个口味,换个心情!</h3>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <div class="psr-item last">
          <el-card>
            <h3>
              和你一样爱吃
              <h2 class="rec-name">{{ rec.recent.name }}</h2>
              的同学们最近还尝过<br />
              <h3 class="rec-canteen">{{ rec.rec3.canteen }}</h3>
              的
              <h2 class="rec-name">{{ rec.rec3.name }}</h2>
            </h3>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { Dessert } from "@element-plus/icons-vue";
import { getPersonalRecommend } from "@/api/common";

const data = ref(null);
const rec = computed(() => {
  return {
    rec1: {
      name: data.value?.rec1?.name,
      canteen: data.value?.rec1?.canteen
    },
    rec2: {
      name: data.value?.rec2?.name,
      canteen: data.value?.rec2?.canteen
    },
    rec3: {
      name: data.value?.rec3?.name,
      canteen: data.value?.rec3?.canteen
    },
    recent: {
      name: data.value?.recent?.name,
      canteen: data.value?.recent?.canteen
    }
  };
});

onMounted(() => {
  getPersonalRecommend().then(res => {
    data.value = res.data;
    console.log(data.value);
  });
});
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
.rec-canteen {
  display: inline;
  color: #8d6262;
}
.rec-name {
  color: #88304e;
}
</style>
