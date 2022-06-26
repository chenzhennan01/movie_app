<template>
<!-- 根据路由模块来决定显示什么，router-view就是根据路径来决定显示什么 -->
  <router-view></router-view> 
</template>

<script setup>
import { provide, ref } from 'vue';
//定义全局变量
const baseURL = ref("http://www.softeem.xin:9999");
//将baseURL注入到程序中
provide("baseURL", baseURL);
</script>

<style>
@import url("https://at.alicdn.com/t/font_3453823_bpbvlxqa3nj.css");
* {
  margin: 0;
  padding: 0;
  /*取消移动端点击后的高亮效果*/
  -webkit-tap-highlight-color: transparent;
}
#app {
  /* 网页全屏方法1 */
  /* height: 100%;
  width: 100%;
  overflow: auto; */

  /* 网页全屏方法2 */
  /* vw全称 viewport width */
  width: 100vw;
  height: 100vh;
}

</style>