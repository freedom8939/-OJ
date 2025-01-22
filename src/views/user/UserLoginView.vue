<template>
  <div id="UserLoginView">
    <div class="content">
      <div>欢迎来到</div>
      <div>蓝签-OJ系统</div>
      <img alt="" class="bc_img" src="@/assets/login-back.svg" />
    </div>
    <a-form
      :model="form"
      auto-label-width
      label-align="left"
      style="max-width: 380px"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="用户账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号..." />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="请输入密码"
        tooltip="密码不小于八位"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码..."
        />
      </a-form-item>
      <a-space :size="235">
        <div>
          <a-checkbox>记住账号</a-checkbox>
        </div>
        <div>
          <a class="forget_pass" href="" @click="goto_register">注册账号</a>
        </div>
      </a-space>
      <a-form-item>
        <a-button class="submit" html-type="submit" type="primary"
          >登录
        </a-button>
      </a-form-item>
      <a-space :size="20" class="code_phone_login">
        <div>二维码登录</div>
        <span>|</span>
        <div>手机号登陆</div>
      </a-space>
    </a-form>
  </div>
  <div class="copyright">
    @CopyRight:版权属于
    <a href="https://www.github.com/freedom8939" target="_blank">蓝书签</a>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const goto_register = () => {
  router.push({
    path: "/user/register",
  });
};

//提交表单
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    message.success("登陆成功");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登陆失败" + res.message);
  }
};
</script>

<style scoped>
#UserLoginView {
  height: 100%;
  position: relative;
}

a {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 使用继承的文本颜色 */
  background: none; /* 去掉背景色 */
  border: none; /* 去掉边框 */
  padding: 0; /* 去掉内边距 */
  margin: 0; /* 去掉外边距 */
}

.code_phone_login {
  color: #0782e3;
}

.code_phone_login div {
  cursor: pointer;
  color: #0782e3;
}

.submit {
  width: 350px;
  height: 40px;
  margin: 20px auto 0;
}

.bc_img {
  position: fixed; /* 固定在视口位置 */
  top: 20%; /* 距离视口顶部 */
  right: 5%; /* 距离视口右侧 */
  width: 45vw; /* 宽度为视口宽度的40% */
  max-width: 800px; /* 最大宽度800px */
  min-width: 300px; /* 最小宽度300px */
  z-index: 999; /* 确保图片在内容后方 */
  pointer-events: none; /* 防止鼠标事件干扰 */
}

.copyright {
  position: sticky;
  color: #7c74ff;
  top: 100%;
}

.content {
  font-weight: 700;
  margin-bottom: 20px;
  color: #0782e3;
  text-align: left;
  clear: both;
  font-size: 30px;
  position: relative; /* 确保文字内容独立于图片布局 */
}

.arco-form-item {
  display: inline-block;
}

.content > div {
  margin-top: 20px;
}

.forget_pass {
  margin-bottom: 20px;
  color: #0782e3;
}
</style>
