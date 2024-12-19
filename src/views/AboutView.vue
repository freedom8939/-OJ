<template>
  <div id="aboutView">
    <CodeEditor @update:code-update="onSubChange" />
  </div>
</template>

<script setup lang="ts">
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";

const code = ref();
const onSubChange = (e: string) => {
  code.value = e;
};
</script>

<style scoped></style>
