<template>
  <div class="container">
    <h1>AI 流式推送</h1>
    <input v-model="input" placeholder="输入内容..." class="input" />
    <button @click="startAI" :disabled="loading" class="button">
      {{ loading ? "AI 生成中..." : "开始" }}
    </button>
    <button @click="stopAI" :disabled="!loading" class="stop-button">
      停止
    </button>
    <div class="output">
      <p>{{ responseText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const input = ref("");
const responseText = ref("");
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
    `http://localhost:8101/api/question/connect?message=${encodeURIComponent(
      input.value
    )}`
  );

  eventSource.onmessage = (event) => {
    responseText.value += event.data;
    console.log(responseText.value);
  };

  eventSource.onerror = () => {
    console.log("SSE 连接已断开");
    loading.value = false;
    eventSource?.close();
  };
};

// 手动停止 SSE
const stopAI = () => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
    loading.value = false;
    console.log("用户主动关闭 SSE 连接");
  }
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

.button,
.stop-button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}

.button {
  background-color: #007bff;
}

.button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.stop-button {
  background-color: #dc3545;
}

.stop-button:disabled {
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
  white-space: pre-wrap;
}
</style>
