<template>
  <div class="overview-wrapper">
    <el-row>
      <el-col :span="24">
        <el-card>
          <template #header>
            <h1 class="card-title">美食一览表</h1>
          </template>
          <overviewTable />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import overviewTable from "./component/overviewTable.vue";
</script>

<style scoped lang="scss">
.rp {
  font-size: large;
}
.card-title {
  text-align: center;
  color: #513743;
  font-size: 30px;
  background: linear-gradient(90deg, #f6416c, #11999e) no-repeat;
  background-size: 0% 2px;
  background-position: 50% 100%;
  transition: background-size 0.2s;
  &:hover {
    background-size: 13% 2px;
  }
}
</style>
