<template>
  <div id="ViewQuestionView">
    <a-row :gutter="[24, 24]">
      <!-- 第一列：题目 -->
      <a-col :md="8" :xs="24" class="col-box">
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
              <a-card :title="question?.title">
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
            <a-tab-pane key="comment" disabled title="评论">评论区</a-tab-pane>
            <a-tab-pane key="answer" disabled title="提示">提示</a-tab-pane>
          </a-tabs>
        </a-space>
      </a-col>

      <!-- 第二列：代码编辑器 -->
      <a-col :md="9" :span="4" :xs="24" class="col-box" v-resizable>
        <div class="language-selector">
          <span>选择语言</span>
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
        <CodeEditor
          :language="form.language"
          @update:code-update="getCode"
          class="codeEditor"
        />
      </a-col>

      <!-- 第三列：AI 视图 -->
      <a-col :md="6" :xs="24" class="col-box" v-resizable>
        <AiView :code="form.code" :question="question?.content" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, withDefaults } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import message from "@arco-design/web-vue/es/message";
import emitter from "@/store/bus/EventBus";
import AiView from "@/views/question/AiView.vue";

const form = ref<QuestionSubmitAddRequest>({
  language: "java", // 默认语言
  code: "",
  questionId: 0,
});

const question = ref<QuestionVO | undefined>(undefined);

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
emitter.on("run_code_message", (msg) => {
  console.log("提交代码");
  doSubmit();
});
onMounted(() => {
  loadData();
});

const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
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
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
  max-width: 1920px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid #e0e0e0;
}

/* 为每一列添加阴影和间距 */
.col-box {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 0 12px; /* 控制列之间的间距 */
}

/* 语言选择器样式 */
.language-selector {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 调整 a-row 的 gutter */
.arco-row {
  margin: 0 -12px; /* 抵消列的外边距 */
}
</style>
