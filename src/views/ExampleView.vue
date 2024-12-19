<template>
  <div id="exampleView">
    <MdEditor @update:editor="onSubChange" />
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";

const editorValue = ref();
const onSubChange = (e: Event) => {
  editorValue.value = e.value;
};
</script>
