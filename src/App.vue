<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else-if="route.path.startsWith('/view/question')">
      <DoQuestionLayOut />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<script lang="ts" setup>
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import DoQuestionLayOut from "@/layouts/DoQuestionLayOut.vue";

const route = useRoute();

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {
  // console.log("hello 欢迎来到我的项目");
};

onMounted(() => {
  doInit();
});
</script>

<style scoped></style>
