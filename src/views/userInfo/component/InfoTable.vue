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
      <el-image style="width: 100px; height: 100px" :src="userInfo.avatar" />
    </el-descriptions-item>
    <el-descriptions-item
      :rowspan="2"
      label="用户名"
      align="center"
      label-align="center"
    >
      <el-input
        v-model="userInfo.nickname"
        style="width: 240px"
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
        v-model="userInfo.phone"
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
        v-model="userInfo.place"
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
      <el-input
        v-model="userInfo.tag"
        style="width: 240px"
        placeholder="Please input"
      />
    </el-descriptions-item>
    <el-descriptions-item
      :rowspan="2"
      label="住址"
      align="center"
      label-align="center"
    >
      <el-input
        v-model="userInfo.address"
        style="width: 240px"
        placeholder="Please input"
      />
    </el-descriptions-item>
  </el-descriptions>

  <el-button
    type="primary"
    style="display: block; margin: 20px auto 0 auto"
    @click="handleSubmit"
  >
    提交
  </el-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUserInfo, putUserInfo } from "@/api/userInfo";

// 用于存储用户信息的对象
const userInfo = ref({
  avatar: "",
  nickname: "",
  address: "",
  phone: "",
  tag: "",
  place: ""
});

// 在组件挂载时调用后端 API 获取用户信息
onMounted(async () => {
  try {
    const response = await getUserInfo();
    if (response.success) {
      // 将获取到的用户信息赋值给 userInfo
      userInfo.value = response.data;
    } else {
      alert("获取用户信息失败");
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    alert("获取用户信息失败");
  }
});

const handleSubmit = async () => {
  try {
    console.log("提交的数据：", userInfo.value);
    const res = await putUserInfo(userInfo.value); // 使用 await 等待异步返回结果
    if (res.success) {
      alert("修改用户信息成功");
    } else {
      alert("修改用户信息失败");
    }
  } catch (error) {
    console.log("提交的数据：", userInfo.value);
    console.error("修改失败:", error);
    alert("修改失败，请稍后再试");
  }
};
</script>
