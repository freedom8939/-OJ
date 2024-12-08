<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img
            class="logo"
            src="https://github.githubassets.com/favicons/favicon.png"
          />
          <div>蓝签OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/freedom8939" target="_blank">
          蓝书签-OJ判题系统 by 王金园</a
        >
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script></script>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
  padding: 32px 0px 24px;
}

#userLayout .logo {
  width: 64px;
}

#userLayout .header {
  margin: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
