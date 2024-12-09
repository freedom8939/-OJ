<template>
  <div id="UserLoginView">
    <div class="content">
      <div>欢迎来到</div>
      <div>蓝签-OJ系统</div>
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
      <a-space :size="235">
        <div>
          <a-checkbox>记住账号</a-checkbox>
        </div>
        <a href="" class="forget_pass">忘记密码</a></a-space
      >
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

<script setup lang="ts">
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
  margin: 0 auto;
}

#UserLoginView {
  overflow-y: hidden;
  margin: 3% 0 0 1%;
}

.copyright {
  position: relative;
  top: 190px;
  color: #beb4b2;
  font-size: 15px;
}

.content {
  font-weight: 700;
  margin-bottom: 20px;
  color: #0782e3;
  text-align: left;
  clear: both;
  font-size: 30px;
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
