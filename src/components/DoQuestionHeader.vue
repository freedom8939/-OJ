<template>
  <div>
    <a-row id="doQuestionHeader" :wrap="false" align="center">
      <a-col flex="auto">
        <a-menu
          :selected-keys="selectedKeys"
          class="logo_and_title"
          mode="horizontal"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            class="return_index"
            @click="returnIndex"
          >
            <div class="title-bar">
              <img
                alt="OJ"
                class="logo"
                src="https://github.githubassets.com/favicons/favicon.png"
              />
              <div class="title">蓝签OJ</div>
            </div>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div class="run_code" @click="doSubmit">
          <span><icon-send style="margin-right: 10px" /></span>
          <span>运行代码</span>
        </div>
      </a-col>
      <a-col flex="auto">
        <div v-if="store.state.user.loginUser.userName === 'NO_LOGIN'">
          <div class="login_or_register">
            <span class="doLogin" @click="doLogin">登录</span>
            或
            <span class="doRegister" @click="doRegister">注册</span>
          </div>
        </div>

        <div v-else class="user-name">
          <a-popover title="欢迎使用蓝签OJ">
            <span>{{ store.state.user.loginUser.userName }}</span>
            <template #content>
              <div class="logout" @click="accountSetting">
                <span><icon-settings style="margin-right: 10px" /></span>
                <span>账号设置</span>
              </div>
              <div class="logout" @click="logout">
                <span><icon-tag style="margin-right: 10px" /></span>
                <span>退出登录</span>
              </div>
            </template>
          </a-popover>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import emitter from "@/store/bus/EventBus";

const router = useRouter();
const store = useStore();
const selectedKeys = ref(["/"]); //默认是主页
//展示在菜单的路由数组
const logout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  await store.dispatch("/user/logout");
  location.reload();
  message.success("退出成功");
  //回到主页
  router.push({
    path: "/",
    replace: true,
  });
};
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      //手动隐藏
      return false;
    }
    // 根据权限过滤菜单
    if (
      //如果没有特定权限不可访问界面
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({ path: key });
};
const accountSetting = () => {
  alert("开发者暂未开发");
};
/*setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "管理员",
    userRole: AccessEnum.ADMIN,
  });
}, 2000);*/

const doLogin = () => {
  router.push({
    path: "/user/login",
  });
};
const doRegister = () => {
  router.push({
    path: "/user/register",
  });
};
const returnIndex = () => {
  router.push({
    path: "/",
  });
};
const doSubmit = (event: Event) => {
  event.stopPropagation(); // 阻止事件传播
  event.preventDefault(); // 阻止默认行为
  emitter.emit("run_code_message", "Hello from Component DoQuestionHeader");
};
</script>

<style scoped>
/* 顶部菜单栏 */
#doQuestionHeader {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: white;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.17);
}

.return_index {
  cursor: pointer;
  display: block;
  width: 150px;
}

.login_or_register {
  white-space: nowrap;
  position: absolute;
  float: right;
  right: 0;
  font-size: 15px;
  transition: transform 0.3s ease; /* 添加过渡效果 */
}

.doLogin {
  cursor: pointer;
  padding: 0 15px;
  transform: scale(1.2); /* 悬停时放大1.2倍 */
}

.doRegister {
  cursor: pointer;
  padding: 0 15px;
}

.doLogin:hover {
  color: gray;
}

.doRegister:hover {
  color: gray;
}

/* 标题栏 */
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  border-radius: 8px;
}

.title {
  color: #333;
  font-size: 20px;
  font-weight: bold;
  margin-left: 12px;
}

/* 登录成功后显示的用户名 */
.user-name {
  right: 20px;
  float: right;
  width: 170px;
  font-size: 15px;
  transition: transform 0.3s ease; /* 添加过渡效果 */
}

/* 悬停时效果 */
.user-name:hover {
  transform: scale(1.05);
}

.run_code {
  display: inline-block; /* 让它适用于按钮 */
  width: 100px;
  padding: 10px 15px;
  background: linear-gradient(135deg, #89c1ef, #1890ff); /* 蓝色渐变 */
  color: white; /* 文字颜色 */
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  border-radius: 8px; /* 圆角 */
  cursor: pointer; /* 变成可点击 */
  transition: all 0.3s ease; /* 平滑动画 */
  box-shadow: 2px 2px 10px rgba(24, 144, 255, 0.4); /* 按钮阴影 */
}

/* 悬停效果 */
.run_code:hover {
  background: linear-gradient(135deg, #1890ff, #157ab3); /* 渐变改深 */
  box-shadow: 4px 4px 15px rgba(24, 144, 255, 0.6);
  transform: scale(1.05); /* 轻微放大 */
}

/* 按下时效果 */
.run_code:active {
  transform: scale(0.95);
  box-shadow: 1px 1px 5px rgba(24, 144, 255, 0.4);
}

.logout {
  cursor: pointer;
  transform: scale(1.05);
  margin-top: 10px;
}
</style>
