<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span style="float: left; font-size: 40px; color:rgb(82, 92, 118);">
          <img src="../../../public/static/img/logo.jpg" height="50px" style="vertical-align: middle;" >
          慧医数字医疗应用系统</span>
          <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./Aside.vue";
import Header from "./Header.vue";

export default {
  components: {
    Aside,
    Header,
  },
};
</script>

<style scoped>
.layout-container-demo .el-header {
  height: 80px;
  position: relative;
  background-color: 243, 243, 244;
  /* background-color: var(--el-color-primary-light-7); */
  color: var(--el-text-color-primary);
  /* margin-top: -10px; */
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  margin-top: -10px;
  margin-left: -10px;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
