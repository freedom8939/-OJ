import { RouteRecordRaw } from "vue-router";
import AccessEnum from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import QuestionsSubmitView from "@/views/question/QuestionsSubmitView.vue";
import AiView from "@/views/question/AiView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: QuestionsView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionsView,
  },
  {
    path: "/ai",
    name: "AI问答",
    component: AiView,
  },
  {
    path: "/user",
    name: "用户",
    meta: {
      hideInMenu: true,
    },
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/question_submit",
    name: "浏览题目提交",
    component: QuestionsSubmitView,
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: () => import("../views/question/ViewQuestionsView.vue"),
    //动态的变量以属性的方式拿到
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: () => import("../views/question/AddQuestionView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/update/question",
    name: "修改题目",
    component: () => import("../views/question/AddQuestionView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: () => import("../views/question/ManageQuestionView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "无权限访问",
    component: () => import("../views/NoAuthView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
];
