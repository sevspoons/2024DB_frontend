<template>
  <el-descriptions
    title=""
    direction="vertical"
    border
    style="margin-top: 20px"
  >
    <el-descriptions-item
      :rowspan="2"
      label="头 像"
      align="center"
      label-align="center"
    >
      <el-image
        style="width: 100px; height: 100px"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </el-descriptions-item>
    <el-descriptions-item
      :rowspan="2"
      label="用户名"
      align="center"
      label-align="center"
    >
      <el-input
        v-model="username.username"
        style="width: 240px"
        :disabled="true"
        placeholder="Please input"
      />
    </el-descriptions-item>
    <el-descriptions-item
      :rowspan="2"
      label="手机号码"
      align="center"
      label-align="center"
    >
      <el-input
        v-model="username.telephone"
        style="width: 240px"
        placeholder="Please input"
      />
    </el-descriptions-item>
    <el-descriptions-item
      :rowspan="2"
      label="地区"
      align="center"
      label-align="center"
    >
      <el-input
        v-model="username.place"
        style="width: 240px"
        placeholder="Please input"
      />
    </el-descriptions-item>
    <el-descriptions-item
      :rowspan="2"
      label="个人标签"
      align="center"
      label-align="center"
    >
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item
      :rowspan="2"
      label="住址"
      align="center"
      label-align="center"
    >
      <el-input
        v-model="username.address"
        style="width: 240px"
        placeholder="Please input"
      />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { ref } from "vue";

const username = ref({
  username: "hello",
  password: "12345678l",
  telephone: "188xxxxxxxx",
  place: "BeiJing",
  address: "No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Provinc"
});
</script>
