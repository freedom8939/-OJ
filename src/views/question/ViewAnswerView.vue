<template>
  <div id="viewAnswerView">
    <div v-if="loading" class="loading">
      <a-spin dot tip="兄弟别急，我在加急判题..." />
    </div>
    <div v-else>{{ props.judgeInfo }}</div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref, watch, withDefaults } from "vue";

interface Props {
  judgeInfo: string;
}

const props = withDefaults(defineProps<Props>(), {
  judgeInfo: "{}",
});

const loading: any = ref(true);

watch(
  () => props.judgeInfo,
  () => {
    loading.value = false;
  }
);
</script>
<style scoped>
.viewAnswerView {
}

.loading {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
