<template>
  <div id="exampleView">
    <MdEditor @update:editor="onSubChange" />
  </div>
</template>

<script lang="ts" setup>
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";

const editorValue = ref();
const onSubChange = (e: Event) => {
  editorValue.value = e.value;
};
</script>
