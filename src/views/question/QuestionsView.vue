<template>
  <div id="questionsView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="name" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="搜索题目" />
      </a-form-item>

      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="搜索标签" />
      </a-form-item>

      <a-space class="difficult" direction="horizontal" size="large">
        <a-select :style="{ width: '90px' }" placeholder="难度">
          <a-option>简单</a-option>
          <a-option>中等</a-option>
          <a-option>困难</a-option>
        </a-select>
      </a-space>

      <a-form-item>
        <a-button type="primary" @click="doSubmit">查询</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :bordered="{ wrapper: true }"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)">
            进入
          </a-button>
        </a-space>
      </template>

      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>

      <template #acceptedRate="{ record }">
        {{
          record.submitNum === 0
            ? "0"
            : `${((record.acceptedNum / record.submitNum) * 100).toFixed(
                2
              )}% (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>

      <template #rateDifficulty="{ record }">
        <a-tag :color="getDifficultyColor(record)">
          {{ getDifficultyText(record) }}
        </a-tag>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const getDifficultyColor = (record: any) => {
  const rate =
    record.submitNum === 0 ? 0 : (record.acceptedNum / record.submitNum) * 100;
  if (rate >= 70) {
    return "green"; // 简单 - 绿色
  } else if (rate >= 40) {
    return "#FEB858"; // 中等 - 黄色
  } else {
    return "red"; // 难 - 红色
  }
};

const getDifficultyText = (record: any) => {
  const rate =
    record.submitNum === 0 ? 0 : (record.acceptedNum / record.submitNum) * 100;
  if (rate >= 70) {
    return "简单";
  } else if (rate >= 40) {
    return "中等";
  } else {
    return "困难";
  }
};
const columns = [
  {
    title: "题号",
    dataIndex: "id",
    align: "center",
    width: 200,
  },
  {
    title: "题目名称",
    dataIndex: "title",
    width: 150,
  },
  {
    title: "通过率",
    dataIndex: "acceptNum",
    slotName: "acceptedRate",
    width: 150,
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
    width: 150,
  },
  {
    title: "难度",
    dataIndex: "hard",
    slotName: "rateDifficulty",
    width: 150,
  },
  {
    title: "操作",
    slotName: "optional",
    width: 150,
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

//跳转到做题页面
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};
const doSubmit = async () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}

.difficult {
  display: inline-block;
}
</style>
