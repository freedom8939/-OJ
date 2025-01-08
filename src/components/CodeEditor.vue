<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 60vh; height: 600px"
  ></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import {
  defineEmits,
  onMounted,
  ref,
  toRaw,
  withDefaults,
  defineProps,
  watchEffect,
} from "vue";

const codeEditorRef = ref(); //dom元素
const codeEditor = ref(); //代码
const emit = defineEmits(["update:codeUpdate"]);

interface Props {
  language: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: "java",
});

onMounted(() => {
  if (!codeEditorRef.value) {
    return; //dom未加载成功
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value:
      "/*\n\tplease input your code here\n" +
      "\tproject copyright: 王金园 辽宁师范大学 89398368@qq.com" +
      "\t\n*/\n" +
      "public Main{\n" +
      "\tpublic static void main(String[] args){\n" +
      "\n" +
      "\t}\n}",
    language: "java",
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: false,
    },
    readOnly: false,
    theme: "vs-dark",
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });

  codeEditor.value.onDidChangeModelContent(() => {
    // console.log("目前内容为：", toRaw(codeEditor.value).getValue());
    emit("update:codeUpdate", toRaw(codeEditor.value).getValue()); //向上传递
  });
});
</script>

<style scoped>
#code-editor {
  min-height: 400px;
}
</style>
