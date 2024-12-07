<template>
  <!-- <el-button @click="open">addNewDish</el-button> -->
  <el-dialog v-model="dialogEnable">
    <template #header>
      <h3>{{ title }}</h3>
    </template>
    <div v-if="commentList.length" class="comments">
      <el-collapse
        v-for="(item, index) in commentList"
        :key="index"
        v-model="commentActive"
      >
        <el-collapse-item :name="index">
          <template #title>
            <div style="width: 100%">
              <el-row :gutter="3">
                <el-col :span="2">
                  <h2>{{ index + 1 + ". " }}</h2>
                </el-col>
                <el-col :span="2">
                  <el-rate v-model="item.rate" disabled />
                </el-col>
                <el-col :span="2" :offset="2">
                  <el-rate
                    v-model="item.quantity"
                    :icons="icons"
                    :void-icon="Chicken"
                    :colors="colors"
                    disabled
                  />
                </el-col>
                <el-col :span="2" :offset="14">
                  <el-button
                    type="info"
                    :icon="Delete"
                    size="small"
                    circle
                    style="opacity: 0.5"
                    @click="deleteComment(item.id)"
                  />
                </el-col>
              </el-row>
            </div>
          </template>
          <p style="font-size: 16px; margin-left: 10px">{{ item.comment }}</p>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-else class="comments">
      <h3>暂无评论</h3>
    </div>
    <el-divider>
      <el-icon><Chicken /></el-icon>
    </el-divider>
    <!-- 添加评论 -->
    <el-button @click="openAddComment">添加评价</el-button>
    <addCommentForm ref="addCommentRef" :report="refreshData" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import addCommentForm from "./addCommentForm.vue";
import type { dishInfo, commentInfo } from "@/api/common";
import { getCommentsById, deleteCommentById } from "@/api/common";
import { message } from "@/utils/message";
import { Chicken, Delete } from "@element-plus/icons-vue";

const icons = [Chicken, Chicken, Chicken];
const colors = ["#f85f73", "#00adb5", "#ff9a00"];
const dialogEnable = ref(false);
const commentActive = ref([0, 1]);
const commentList = ref<commentInfo[]>([]);
const addCommentRef = ref(null);
let title = "";
let id = null;

const openAddComment = () => {
  addCommentRef.value.open(id);
};

const getComments = (dishId: number) => {
  getCommentsById(dishId)
    .then(res => {
      if (res.data.length > 0) {
        message("获取评论成功", { type: "success" });
      } else {
        message("暂无评论, 快来留下你的笔迹吧!", { type: "info" });
      }
      commentList.value = res.data;
    })
    .catch(err => {
      message("获取评论失败", { type: "error" });
    });
};

const deleteComment = commentId => {
  deleteCommentById(commentId)
    .then(res => {
      if (res.code == 200) {
        console.log(res);
        message("删除成功", { type: "success" });
        refreshData();
      } else {
        message("您只能删除您自己的评论!", { type: "error" });
      }
    })
    .catch(err => {
      message("删除失败", { type: "error" });
    });
};

const refreshData = () => {
  getComments(id);
};

//expose func
const open = (data: dishInfo) => {
  dialogEnable.value = true;
  id = data.id;
  title = data.name;
  getComments(data.id);
};
defineExpose({
  open
});
</script>

<style lang="sass" scoped></style>
