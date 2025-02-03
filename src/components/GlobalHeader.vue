<template>
  <div>
    <a-row id="globalHeader" :wrap="false" align="center">
      <a-col flex="800px">
        <a-menu
          :selected-keys="selectedKeys"
          class="logo_and_title"
          mode="horizontal"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
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
          <a-menu-item v-for="item in visibleRoutes" v-bind:key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
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
</script>

<style scoped>
/* 顶部菜单栏 */
#globalHeader {
  display: flex;
  justify-content: center;
  background: white;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.17);
  padding: 3px 20px;
}

.login_or_register {
  position: absolute;
  right: 20px;
  width: 170px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
  width: 170px;
  font-size: 15px;
  transition: transform 0.3s ease; /* 添加过渡效果 */
}

/* 悬停时效果 */
.user-name:hover {
  transform: scale(1.05);
}

.logout {
  cursor: pointer;
  transform: scale(1.05);
  margin-top: 10px;
}
</style>
