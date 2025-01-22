<template>
  <div id="ViewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-space>
          <a-tabs default-active-key="question" style="min-width: 600px">
            <a-tab-pane key="question" title="题目">
              <a-descriptions
                :column="{ xs: 1, md: 3, lg: 4 }"
                title="判题条件"
              >
                <a-descriptions-item label="时间限制">
                  {{ question?.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question?.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question?.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <a-card title="question.title">
                <MdViewer :value="question?.content" />
                <template #extra>
                  <a-space wrap>
                    <a-tag
                      v-for="(tag, index) of question?.tags"
                      :key="index"
                      color="green"
                    >
                      {{ tag }}
                    </a-tag>
                  </a-space>
                </template>
              </a-card>
            </a-tab-pane>
            <a-tab-pane key="comment" disabled title="评论">
              评论区
            </a-tab-pane>
            <a-tab-pane key="answer" disabled title="提示">提示</a-tab-pane>
          </a-tabs>
        </a-space>
      </a-col>

      <a-col :md="12" :xs="24">
        <!-- 添加语言选择框 -->
        <div class="language-selector">
          <span> 选择语言</span>
          <a-select
            v-model="form.language"
            :style="{ width: '120px' }"
            placeholder="选择语言"
          >
            <a-option>java</a-option>
            <a-option>cpp</a-option>
            <a-option>go</a-option>
            <a-option>html</a-option>
          </a-select>
        </div>
        <!-- 代码编辑器 -->
        <CodeEditor :language="form.language" @update:code-update="getCode" />
        <a-button class="run" type="primary" @click="doSubmit">运行</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, withDefaults } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { useRoute } from "vue-router";

const form = ref<QuestionSubmitAddRequest>({
  language: "java", // 默认语言
  code: "",
  questionId: 0,
});

const question = ref<QuestionVO>();

interface Props {
  id: string;
}

const getCode = (v: string) => {
  form.value.code = v;
};
const props = withDefaults(defineProps<Props>(), {
  id: "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
const route = useRoute();
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败" + res.message);
  }
};
</script>

<style>
#ViewQuestionView {
  max-width: 1280px;
  margin: 0 auto;
  background-color: #ffffff; /* 设置白色背景 */
  border-radius: 12px; /* 添加圆角 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
  padding: 20px; /* 增加内边距 */
  border: 1px solid #e0e0e0; /* 可选：添加边框 */
}

#ViewQuestionView .arco-space-item {
  margin-bottom: 0 !important;
}

.language-selector {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.run {
  margin-top: 25px;
  min-width: 80px;
}
</style>
