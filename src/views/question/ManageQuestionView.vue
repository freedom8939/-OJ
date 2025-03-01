<template>
  <div id="manageQuestionView">
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
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>

      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>

      <template #judgeSlot="{ record }">
        <a-space wrap>
          <span> 内存限制：{{ record.judgeConfig.memoryLimit }} </span>
          <span> 时间限制：{{ record.judgeConfig.timeLimit }}</span>
          <span> 堆栈限制：{{ record.judgeConfig.stackLimit }} </span>
        </a-space>
      </template>
      <template #createTimeSlot="{ record }">
        <a-space wrap>
          {{ moment(record.createTime).format("YYYY年MM月DD日") }}
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    const temp = res.data.records;
    for (let i = 0; i < temp.length; i++) {
      temp[i].tags = JSON.parse(temp[i].tags);
      temp[i].judgeConfig = JSON.parse(temp[i].judgeConfig);
    }
    console.log(temp);
    dataList.value = temp;
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
  // loadData();
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
    align: "center",
    width: 200,
  },
  {
    title: "标题",
    dataIndex: "title",
    width: 150,
  },
  {
    title: "内容",
    dataIndex: "content",
    ellipsis: true,
    width: 240,
  },
  {
    title: "标签",
    dataIndex: "tags",
    width: 200,
    slotName: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
    ellipsis: true,
    width: 90,
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
    width: 140,
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    slotName: "judgeSlot",
    width: 160,
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
    ellipsis: true,
    width: 20,
  },
  {
    title: "用户id",
    dataIndex: "userId",
    ellipsis: true,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTimeSlot",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
