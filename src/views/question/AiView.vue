<template>
  <div class="container">
    <h1>AI 流式推送</h1>
    <input v-model="input" placeholder="输入内容..." class="input" />
    <button @click="startAI" :disabled="loading" class="button">
      {{ loading ? "AI 生成中..." : "开始" }}
    </button>
    <div class="output">
      <p>{{ responseText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const input = ref("");
const responseText = ref(""); // 让 AI 内容拼接到同一行
const loading = ref(false);
let eventSource: EventSource | null = null;

const startAI = () => {
  if (!input.value) return;
  responseText.value = "";
  loading.value = true;

  // 关闭之前的 SSE 连接
  if (eventSource) {
    eventSource.close();
  }

  eventSource = new EventSource(
    `http://localhost:8101/api/question/chat?userMessage=${encodeURIComponent(
      input.value
    )}`
  );

  eventSource.onmessage = (event) => {
    responseText.value += event.data; // 直接拼接数据到同一行
  };

  eventSource.onerror = () => {
    console.log("SSE 连接已断开");
    loading.value = false;
    eventSource?.close();
  };
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

.input {
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.output {
  text-align: left;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
  min-height: 50px;
  white-space: pre-wrap; /* 保持流式拼接的格式 */
}
</style>
