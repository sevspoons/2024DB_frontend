<template>
  <div class="psr-wrapper">
    <h1 class="psr-title">个性化推荐</h1>
    <el-row>
      <el-col :span="8">
        <div class="psr-item not-last">content1</div>
      </el-col>
      <el-col :span="8">
        <div class="psr-item not-last">content2</div>
      </el-col>
      <el-col :span="8">
        <div class="psr-item">content3</div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.psr-item.not-last {
  height: 50vh;
  border-right: 2px dashed #ce5242;
}
.psr-wrapper {
  .psr-title {
    font-size: 25px;
    transition:
      font-size 0.3s,
      color 0.3s;
  }
  &:hover {
    .psr-title {
      font-size: 28px;
      color: #752100;
    }
  }
}
</style>
