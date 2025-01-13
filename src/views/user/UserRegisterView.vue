<template>
  <div id="UserLoginView">
    <div class="content">
      <div>欢迎注册</div>
      <div>蓝签-OJ系统</div>
      <img class="bc_img" src="@/assets/register.svg" alt="" />
    </div>
    <a-form
      label-align="left"
      :model="form"
      style="max-width: 380px"
      @submit="handleSubmit"
      auto-label-width
    >
      <a-form-item field="userAccount" label="用户账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号..." />
      </a-form-item>

      <a-form-item
        field="userPassword"
        tooltip="密码不小于八位"
        label="请输入密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码..."
        />
      </a-form-item>

      <a-form-item
        field="checkPassword"
        tooltip="二次输入密码不小于八位"
        label="请确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请确认密码..."
        />
      </a-form-item>
      <div class="hasAccount" @click="goto_login">已有账号? 立即登录</div>
      <a-form-item>
        <a-button class="submit" html-type="submit" type="primary"
          >注册
        </a-button>
      </a-form-item>
      <a-space :size="20" class="code_phone_login">
        <div>二维码注册</div>
        <span>|</span>
        <div>手机号注册</div>
      </a-space>
    </a-form>
  </div>
  <div class="copyright">
    @CopyRight:版权属于
    <a href="https://www.github.com/freedom8939" target="_blank">蓝书签</a>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

//提交表单
const handleSubmit = async () => {
  if (form.checkPassword != form.userPassword) {
    message.error("两次输入密码不一致");
    return;
  }
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    message.success("注册成功");
    //注册成功
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error(res.message);
  }
};

const goto_login = () => {
  router.push({
    path: "/user/login",
    replace: true,
  });
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
  color: #7c74ff;
}

.code_phone_login div {
  cursor: pointer;
  color: #7c74ff;
}

.submit {
  width: 350px;
  height: 40px;
  margin: 10px auto 0;
}

#UserLoginView {
  overflow-y: hidden;
  margin: 3% 0 0 1%;
}

.bc_img {
  position: fixed; /* 固定在视口位置 */
  top: 20%; /* 距离视口顶部 */
  right: 10%; /* 距离视口右侧 */
  width: 35vw; /* 宽度为视口宽度的40% */
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

.hasAccount {
  cursor: pointer;
  margin-left: 240px;
  color: #7c74ff;
}
</style>
