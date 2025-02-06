<template>
  <div class="container">
    <div class="ai_assist">
      <icon-send />
      <span>AI代码小助手</span>
    </div>

    <div class="profile">
      <div>
        您好，{{ store.state.user.loginUser.userName }}
        <br />我是您的代码小助手，您可以问我:
      </div>
    </div>

    <div class="prev_question" v-if="!loading">
      <div class="question-item" @click="aiQuestion">
        <div class="question-content">
          <icon-settings />
          <span>题目无头绪，请给我一些提示</span>
        </div>
        <icon-right />
      </div>
      <div class="question-item" @click="aiCheck">
        <div class="question-content">
          <icon-settings />
          <span>检查我的代码错误</span>
        </div>
        <icon-right />
      </div>
      <div class="question-item" @click="aiPrefer">
        <div class="question-content">
          <icon-settings />
          <span>有无更优解法呢</span>
        </div>
        <icon-right />
      </div>
    </div>

    <a-button
      type="primary"
      @click="stopAI"
      :disabled="!loading"
      class="stop-button"
    >
      停止
    </a-button>

    <div class="output" v-if="output_loading">
      <MdViewer :value="mdEditor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, withDefaults } from "vue";
import store from "../../store";
import MdViewer from "@/components/MdViewer.vue";

const loading = ref(false);
const output_loading = ref(false);
let eventSource: EventSource | null = null;
const mdEditor = ref("");

interface Props {
  code: string;
  question: string;
}

const props = withDefaults(defineProps<Props>(), {
  code: "",
  question: "",
});

const aiQuestion = () => {
  const prompt = "请给我代一些代码的思路,注意只是思路即可";
  const data = prompt + props.question;
  connectAI(data);
};
const aiCheck = () => {
  const prompt = "请你检查我的代码并指出我代码中的错误";
  const data = prompt + props.code;
  connectAI(data);
};
const aiPrefer = () => {
  const prompt =
    "请你根据我写的代码以及题目问题，给我一个时间复杂度和空间复杂度更优解的答案";
  const data = prompt + props.question + props.code;
  connectAI(data);
};

const connectAI = (v: string) => {
  mdEditor.value = "";
  loading.value = true;
  output_loading.value = true;

  if (eventSource) {
    eventSource.close();
  }
  eventSource = new EventSource(
    `http://localhost:8101/api/question/connect?message=${encodeURIComponent(
      v
    )}`
  );

  eventSource.onmessage = (event) => {
    if (event.data.length <= 0) {
      mdEditor.value += event.data.replace("", "\n"); // 统一使用 \n
    }
    mdEditor.value += event.data; // 统一使用 \n
    // mdEditor.value += event.data;
  };

  eventSource.onerror = () => {
    console.log("SSE 连接已断开");
    loading.value = false;
    // output_loading.value = false;
    eventSource?.close();
  };
};

// 手动停止 SSE
const stopAI = () => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  min-height: 86vh;
  max-width: 600px;
  margin: 0 10px;
  max-height: 80vh; /* 限制最大高度 */
  overflow-y: auto; /* 允许滚动 */
}

.profile {
  font-size: 24px;
  margin: 15px 1px;
}

.stop-button {
  width: 60px;
  padding: 10px;
  flex-wrap: nowrap;
  text-align: center;
  position: absolute;
  bottom: 40px;
  right: 60px;
}

.ai_assist {
  /*圆角边框*/
  font-size: 24px;
  border-radius: 8px; /*文本左对齐*/
  text-align: left; /*宽度设置*/
  width: 250px; /*内边距*/
  padding: 10px; /*背景颜色*/
  background-color: #f3f6f8; /*盒子阴影*/
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /*过渡效果*/
}

.prev_question {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.question-item {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;
  justify-content: space-between; /* 让 icon-right 靠右 */
}

.question-item:hover {
  background: #e9ecef;
  margin: 5px 0;
  cursor: pointer;
}

.output {
  font-size: 17px;
  text-align: left;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
  min-height: 50px;
  white-space: pre-wrap; /* 保留手动换行 */
  word-break: break-word; /* 避免长文本溢出 */
  overflow-wrap: break-word;
}
</style>
