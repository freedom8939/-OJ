<template>
  <div id="DoQuestionLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <!-- 确保事件名一致 -->
        <DoQuestionHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!-- <a-layout-footer class="footer">
        <div class="footer-content">
          <a
            href="https://github.com/freedom8939"
            target="_blank"
            class="footer-link"
          >
            蓝书签-OJ判题系统 by 王金园
          </a>
          <div class="footer-icons">
            <a
              href="https://github.com/freedom8939"
              target="_blank"
              class="icon-link"
            >
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
                alt="GitHub"
              />
            </a>
            <a href="#" target="_blank" class="icon-link">
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/linkedin.png"
                alt="LinkedIn"
              />
            </a>
            <a href="#" target="_blank" class="icon-link">
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/twitter.png"
                alt="Twitter"
              />
            </a>
          </div>
        </div>
      </a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
import DoQuestionHeader from "@/components/DoQuestionHeader.vue";

export default {
  components: { DoQuestionHeader },
};
</script>
<style scoped>
#DoQuestionLayout {
}

#DoQuestionLayout .header {
  box-shadow: #eee 1px 1px 5px;
}

#DoQuestionLayout .content {
  background: linear-gradient(to left, #fefefe, #fff);
  margin-bottom: 16px;
  padding: 0 20px;
}

#DoQuestionLayout .footer {
  background: #2c3e50; /* 深色背景 */
  max-height: 45px;
  color: #fff; /* 文字颜色 */
  padding: 14px 16px; /* 增加上下内边距 */
  text-align: center;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100; /* 确保 footer 在最上层 */
}

.footer-content {
  max-width: 1200px; /* 限制内容宽度 */
  margin: 0 auto; /* 居中 */
}

.footer-link {
  color: #fff; /* 链接颜色 */
  text-decoration: none; /* 去掉下划线 */
  font-size: 16px;
  transition: color 0.3s ease; /* 添加过渡效果 */
}

.footer-link:hover {
  color: #42b983; /* 鼠标悬停颜色 */
}

.footer-icons {
  margin-top: 12px; /* 图标与文字间距 */
}

.icon-link {
  margin: 0 8px; /* 图标间距 */
  display: inline-block;
  transition: transform 0.3s ease; /* 添加缩放效果 */
}

.icon-link:hover {
  transform: scale(1.2); /* 鼠标悬停时放大 */
}

.icon-link img {
  width: 24px; /* 图标大小 */
  height: 24px;
  filter: brightness(0) invert(1); /* 图标颜色调整为白色 */
}
</style>
