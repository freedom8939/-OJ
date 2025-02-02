# 蓝签 OJ

## 项目介绍：

基于 Spring Boot+Spring Cloud 微服务+Docker(+Vue3+Arco Design)的编程题目在线评测系统。

在系统前台，管理员可以创建、管理题目；用户可以自由搜索题目、阅读题目、编写并提交代码。

在系统后端，能够根据管理员设定的题目测试，用例在自主实现的代码沙箱中对代码进行编译、运行、判
断输出是否正确。

### 生成api
```node
openapi --input http://localhost:8101/api/v2/api-docs --output ./generated --client axios
```
