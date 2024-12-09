<template>
  <div id="userLayout">
    <a-layout style="min-height: calc(100vh - 60px)">
      <a-layout-header class="header">
        <a-space style="margin-left: 40px">
          <img
            class="logo"
            src="https://github.githubassets.com/favicons/favicon.png"
          />
          <div style="font-size: 24px; margin-left: 10px">蓝签OJ</div>
        </a-space>
      </a-layout-header>

      <a-layout-content class="content">
        <router-view />
      </a-layout-content>

      <!--      <a-layout-footer class="footer">
              <a href="https://github.com/freedom8939" target="_blank">
                蓝书签-OJ判题系统 by 王金园</a
              >
            </a-layout-footer>-->
    </a-layout>
  </div>
</template>

<script></script>

<style scoped>
#userLayout {
  overflow-y: hidden;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
  padding: 32px 0px 24px;
}

#userLayout .logo {
  width: 44px;
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
