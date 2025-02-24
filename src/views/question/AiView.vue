<template>
  <div class="container">
    <div class="ai_assist">
      <icon-send />
      <span>AI代码小助手</span>
    </div>

    <div class="profile">
      <div>
        您好，{{ store.state.user.loginUser.userName }}
        <br />
        <span class="subtitle">我是您的代码小助手，您可以问我：</span>
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
      停止生成
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
    `http://脱敏:8101/api/question/connect?message=${encodeURIComponent(
      v
    )}`
  );

  eventSource.onmessage = (event) => {
    if (event.data.length <= 0) {
      mdEditor.value += event.data.replace("", "\n");
    }
    mdEditor.value += event.data;
  };

  eventSource.onerror = () => {
    console.log("SSE 连接已断开");
    loading.value = false;
    eventSource?.close();
  };
};

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
  overflow-y: auto;
  min-height: 86vh;
  max-height: 86vh;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.ai_assist {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 24px;
  transition: transform 0.2s ease;
}

.ai_assist:hover {
  transform: translateY(-2px);
}

.profile {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.profile div {
  font-size: 18px;
  line-height: 1.6;
  color: #374151;
}

.subtitle {
  font-size: 14px !important;
  color: #6b7280 !important;
  display: block;
  margin-top: 8px;
}

.prev_question {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.question-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin: 8px 0;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.question-item:hover {
  background: #ffffff;
  border-color: #6366f1;
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.1);
  transform: translateX(4px);
}

.question-content {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #374151;
}

.question-content svg {
  color: #6366f1;
  width: 20px;
  height: 20px;
}

.stop-button {
  position: sticky;
  bottom: 20px;
  margin-top: 24px;
  background: #ef4444;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 120px;
  height: 40px;
}

.stop-button:hover {
  background: #dc2626;
  transform: scale(1.05);
}

.output {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;
  border: 1px solid #e5e7eb;
  font-family: "JetBrains Mono", monospace;
}

@media (max-width: 640px) {
  .container {
    padding: 16px;
    margin: 0 8px;
  }

  .ai_assist {
    padding: 12px 16px;
    font-size: 20px;
  }

  .profile div {
    font-size: 16px;
  }

  .stop-button {
    width: 100%;
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}
</style>
