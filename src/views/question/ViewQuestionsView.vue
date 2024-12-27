<template>
  <div id="ViewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-space>
          <a-tabs default-active-key="question" style="min-width: 600px">
            <a-tab-pane key="question" title="题目">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 3, lg: 4 }"
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
            <a-tab-pane key="comment" title="评论" disabled>
              评论区
            </a-tab-pane>
            <a-tab-pane key="answer" title="提示" disabled>提示</a-tab-pane>
          </a-tabs>
        </a-space>
      </a-col>
      <a-col :md="12" :xs="24">
        <CodeEditor />
        <a-button @click="doSubmit" type="primary" class="run">运行</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
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

const question = ref<QuestionVO>();

interface Props {
  id: string;
}

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

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});
const doSubmit = async () => {
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost(
    form.value
  );
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
}

#ViewQuestionView .arco-space-item {
  margin-bottom: 0 !important;
}

.run {
  margin-top: 25px;
  min-width: 80px;
}
</style>
