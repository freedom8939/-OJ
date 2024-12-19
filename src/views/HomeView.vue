<template>
  <div class="home">
    <!-- 绑定 value 和 handle-change 属性 -->
    <MdEditor @update-value="handleUpdatedValue" />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import MdEditor from "@/components/MdEditor.vue"; // @ is an alias to /src

const handleUpdatedValue = (newValue: string) => {
  console.log("从子组件传来的值", newValue);
};
</script>
