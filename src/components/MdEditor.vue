<template>
  <Editor
    :value="value"
    :plugins="plugins"
    mode="split"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";
import { defineEmits, ref } from "vue";

//自定义事件
const emit = defineEmits(["update:editor"]);

const plugins = [gfm(), highlight()];
const value = ref();

const handleChange = (v: string) => {
  value.value = v;
  emit("update:editor", value); //向上传递
};
</script>
<style>
/*去除ad信息*/
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
