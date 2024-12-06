<script setup lang="ts">
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { title, bgn, bread, bg, avatar, illustration } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import { defineFakeRoute } from "vite-plugin-fake-server/client";

const show = ref(true);
defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);

//获取用户输入的用户名和密码
const ruleForm = reactive({
  username: "",
  password: "",
  password_again: ""
});

//登录按钮处罚登录尝试
const onLogin = async (formEl: FormInstance | undefined) => {
  //前端基本检测
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      //前端基本检测通过,登录按钮置为loading状态
      loading.value = true;
      //获取用户仓库钩子调用登录操作
      useUserStoreHook()
        //使用用户名与密码登录
        .loginByUsername({
          username: ruleForm.username,
          password: ruleForm.password
        })
        .then(res => {
          //检查登录结果
          if (res.success) {
            //登录成功
            // 获取后端路由
            return initRouter().then(() => {
              //跳转到主页面
              router.push(getTopMenu(true).path).then(() => {
                message("登录成功", { type: "success" });
              });
            });
          } else {
            message("登录失败", { type: "error" });
          }
        })
        .finally(() => (loading.value = false));
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="bgn" class="wave" />
    <!-- <div class="flex-c absolute right-5 top-3">
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
    </div> -->
    <div class="login-container">
      <!-- <div class="img">
        <component :is="toRaw(illustration)" />
      </div> -->
      <div class="login-box">
        <div class="login-form">
          <!-- <avatar class="avatar" /> -->
          <img :src="bread" class="avatar_bread" @dragstart.prevent />
          <img :src="title" class="avatar_title" @dragstart.prevent />
          <div class="text-center">
            <div class="block-color">
              <!-- <div class="text-left">
                <el-button
                  size="default"
                  type="primary"
                  color="#906C22"
                  round
                  @click="show = !show"
                  >{{ show ? "去注册" : "去登录" }}</el-button
                >
              </div> -->
              <Motion>
                <h2>{{ show ? "Login" : "Register" }}</h2>
              </Motion>
              <div style="margin-top: 20px">
                <el-collapse-transition>
                  <div v-show="show" class="transition-box">
                    <el-form
                      ref="ruleFormRef"
                      :model="ruleForm"
                      :rules="loginRules"
                      size="large"
                    >
                      <Motion :delay="100">
                        <el-form-item
                          :rules="[
                            {
                              required: true,
                              message: '请输入账号',
                              trigger: 'blur'
                            }
                          ]"
                          prop="username"
                        >
                          <el-input
                            v-model="ruleForm.username"
                            clearable
                            placeholder="账号"
                            :prefix-icon="useRenderIcon(User)"
                          />
                        </el-form-item>
                      </Motion>
                      <Motion :delay="150">
                        <el-form-item prop="password">
                          <el-input
                            v-model="ruleForm.password"
                            clearable
                            show-password
                            placeholder="密码"
                            :prefix-icon="useRenderIcon(Lock)"
                          />
                        </el-form-item>
                      </Motion>
                      <Motion :delay="250">
                        <el-button
                          class="w-full mt-4"
                          size="default"
                          type="primary"
                          color="#906C22"
                          :loading="loading"
                          @click="onLogin(ruleFormRef)"
                        >
                          登录
                        </el-button>
                      </Motion>
                    </el-form>
                  </div>
                </el-collapse-transition>
                <el-collapse-transition>
                  <div v-show="!show" class="transition-box">
                    <el-form
                      ref="ruleFormRef"
                      :model="ruleForm"
                      :rules="loginRules"
                      size="large"
                    >
                      <Motion :delay="100">
                        <el-form-item
                          :rules="[
                            {
                              required: true,
                              message: '请输入账号',
                              trigger: 'blur'
                            }
                          ]"
                          prop="username"
                        >
                          <el-input
                            v-model="ruleForm.username"
                            clearable
                            placeholder="账号"
                            :prefix-icon="useRenderIcon(User)"
                          />
                        </el-form-item>
                      </Motion>
                      <Motion :delay="150">
                        <el-form-item prop="password">
                          <el-input
                            v-model="ruleForm.password"
                            clearable
                            show-password
                            placeholder="密码"
                            :prefix-icon="useRenderIcon(Lock)"
                          />
                        </el-form-item>
                      </Motion>
                      <Motion :delay="150">
                        <el-form-item prop="password">
                          <el-input
                            v-model="ruleForm.password_again"
                            clearable
                            show-password
                            placeholder="重复密码"
                            :prefix-icon="useRenderIcon(Lock)"
                          />
                        </el-form-item>
                      </Motion>
                      <Motion :delay="250">
                        <el-button
                          class="w-full mt-4"
                          size="default"
                          type="primary"
                          color="#906C22"
                          :loading="loading"
                          @click="onLogin(ruleFormRef)"
                        >
                          注册
                        </el-button>
                      </Motion>
                    </el-form>
                  </div>
                </el-collapse-transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.scss");
</style>

<style lang="scss" scoped>
.text-left {
  text-align: left;
}

.block-color {
  // position: absolute;
  // /*定位方式绝对定位absolute*/
  // top: 50%;
  // left: 50%;
  // /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
  // transform: translate(-50%, -50%);
  // /*实现块元素百分比下居中*/
  width: 450px;
  padding: 50px;
  background: rgba(0, 0, 0, 0.5);
  /*背景颜色为黑色，透明度为0.8*/
  box-sizing: border-box;
  /*box-sizing设置盒子模型的解析模式为怪异盒模型，
  将border和padding划归到width范围内*/
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
  /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
  border-radius: 15px;
  /*边框圆角，四个角均为15px*/
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
