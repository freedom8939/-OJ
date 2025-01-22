<template>
  <Viewer :plugins="plugins" :value="value" />
</template>

<script lang="ts" setup>
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import { ref } from "vue";

const plugins = [gfm(), highlight()];
const value = ref();
</script>
<style>
/*去除ad信息*/
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
