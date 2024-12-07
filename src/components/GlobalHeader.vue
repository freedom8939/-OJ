<template>
  <div>
    <a-row id="globalHeader" style="margin-bottom: 16px" align="center">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img
                class="logo"
                src="https://github.githubassets.com/favicons/favicon.png"
                alt="OJ"
              />
              <div class="title">蓝签OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in routes" v-bind:key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>{{ store.state.user.loginUser.userName }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const selectedKeys = ref(["/"]); //默认是主页

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({ path: key });
};

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "lanshuqian",
  });
}, 3000);

const store = useStore();
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 48px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
