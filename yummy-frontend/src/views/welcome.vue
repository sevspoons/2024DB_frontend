<script setup lang="ts">
import { ref } from 'vue';
import Header from '../components/Header.vue';
import { useUserStore } from '../store/user';

const userStore = useUserStore();
const welcomeMsg = ref("WeLcOmE! You are the user with ID:\n" + userStore.id);
const handleIdPlusOne = () : void => {
  userStore.id += 1;
  welcomeMsg.value = "WeLcOmE! You are the user with ID:\n" + userStore.id;
  console.log(userStore.id);
}
</script>

<template>
  <Header msg="EAT OR DIE, THAT IS A QUESTION!" class="welcome-header"/>
  <Header :msg="welcomeMsg"/>
  <el-button :onclick="handleIdPlusOne">id + 1</el-button>
</template>

<style scoped>
</style>