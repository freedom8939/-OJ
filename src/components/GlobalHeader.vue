<template>
  <div>
    <a-row id="globalHeader" :wrap="false" align="center">
      <a-col flex="auto">
        <a-menu
          :selected-keys="selectedKeys"
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
      <a-col flex="100px">
        <div
          v-if="store.state.user.loginUser.userName === 'NO_LOGIN'"
          @click="doLogin"
          class="login"
        >
          登录
        </div>
        <div v-else class="user-name">
          {{ store.state.user.loginUser.userName }}
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
import AccessEnum from "@/access/accessEnum";

const router = useRouter();

const store = useStore();

const selectedKeys = ref(["/"]); //默认是主页
//展示在菜单的路由数组

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

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "管理员",
    userRole: AccessEnum.ADMIN,
  });
}, 2000);

const doLogin = () => {
  router.push({
    path: "/user/login",
  });
};
</script>

<style scoped>
/* 顶部菜单栏 */
#globalHeader {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
}

/* 登录按钮 */
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 36px;
  border-radius: 18px;
  background: linear-gradient(135deg, #ff7eb3, #ff758c);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-align: center;
}

.login:hover {
  background: linear-gradient(135deg, #ff758c, #ff7eb3);
  transform: scale(1.05);
}

/* 头像（如果有的话） */
.user-avatar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #ddd;
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
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  color: #444;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  transition: all 0.3s ease-in-out;
}

/* 悬停时效果 */
.user-name:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}
</style>
