<template>
  <div id="viewAnswerView">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <a-spin dot tip="兄弟别急，我在加急判题..." />
    </div>

    <!-- 判题结果 -->
    <div v-else class="judge-result" :class="getStatusClass">
      <span class="status-icon">●</span>
      <span class="status-text">{{ parsedJudgeInfo.message }}</span>
    </div>

    <!-- 额外信息：时间 & 内存 -->
    <div v-if="!loading" class="extra-info">
      ⏱ 耗时：{{ parsedJudgeInfo.time }} ms ｜ 🖥 内存：{{
        parsedJudgeInfo.memoryLimit
      }}
      KB
    </div>

    <!--    <div class="code-section">{{ props.judgeInfo.code }}</div>-->
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, watch, withDefaults } from "vue";

interface Props {
  judgeInfo: string;
}

const props = withDefaults(defineProps<Props>(), {
  judgeInfo: "{}",
});

const loading = ref(true);

// 监听判题结果变化，切换 loading 状态
watch(
  () => props.judgeInfo,
  () => {
    loading.value = false;
  }
);

// 解析 JSON 并提取字段
const parsedJudgeInfo = computed(() => {
  return {
    message: props.judgeInfo.judgeInfo.message,
    time: props.judgeInfo.judgeInfo.time,
    memoryLimit: props.judgeInfo.judgeInfo.memoryLimit,
  };
});

// 计算样式
const getStatusClass = computed(() => {
  if (parsedJudgeInfo.value.message === "Accepted") return "accepted";
  if (parsedJudgeInfo.value.message === "Wrong Answer") return "wrong-answer";
  return "pending"; // 默认状态
});
</script>

<style scoped>
/* 容器 */
#viewAnswerView {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
}

/* 加载状态 */
.loading {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* 判题结果样式 */
.judge-result {
  font-size: 24px;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

/* 额外信息（时间 & 内存） */
.extra-info {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

/* 结果图标 */
.status-icon {
  margin-right: 8px;
  font-size: 20px;
}

/* Accepted 绿色 */
.accepted {
  background-color: #e6f9e6;
  color: #1dbf73;
  border: 2px solid #1dbf73;
}

.code-section {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  text-align: left;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
  margin-top: 20px;
}

/* Wrong Answer 红色 */
.wrong-answer {
  background-color: #fde7e7;
  color: #ff4d4f;
  border: 2px solid #ff4d4f;
}

/* 其他状态（默认蓝色） */
.pending {
  background-color: #e6f0ff;
  color: #0066cc;
  border: 2px solid #0066cc;
}
</style>
