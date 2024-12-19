<template>
  <Editor :value="userInput" :plugins="plugins" @change="handleChange" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";
import { ref } from "vue";

const plugins = [gfm(), highlight()];

const userInput = ref("");

const handleChange = (value: string) => {
  userInput.value = value;
  console.log(userInput.value);
};
</script>

<style scoped>
@import "bytemd/dist/index.css";
</style>
