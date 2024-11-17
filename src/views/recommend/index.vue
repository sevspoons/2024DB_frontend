<script setup lang="ts">
import totalRank from "./component/totalRank.vue";
import cmpRecommend from "./component/cmpRecommend.vue";
import personalizedRecommend from "./component/personalizedRecommend.vue";
import Cook from "@/assets/cook.gif";
</script>

<template>
  <div class="recommend-wrapper">
    <img :src="Cook" alt="cook" class="cook" />
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card body-class="welcome-card">
          <div class="welcome-content">
            <h1>食光航迹</h1>
            <p>北航师生专属的美食导航仪</p>
          </div>
        </el-card>
        <el-card>
          <totalRank />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <cmpRecommend />
        </el-card>
        <el-card>
          <personalizedRecommend />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-card) {
  margin-bottom: 20px;
}
:deep(.welcome-card) {
  background-image: linear-gradient(45deg, #f6416c, #11999e);
  margin: 5%;
  padding: 5px;
  border-radius: 10px;
  background-position: center;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
}
.welcome-content {
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
}
.cook {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 40px;
}
</style>
