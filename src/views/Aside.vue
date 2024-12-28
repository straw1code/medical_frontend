<!-- http://localhost:8080/swagger-ui/index.html#/ -->
<template>
  <el-menu
    background-color="#6699CC"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height: 100%"
  >
    <el-menu-item>
      <el-icon><HomeFilled /></el-icon>
      <router-link tag="span" to="/index/petadopt">首页</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/index/petlost">医药公司管理</router-link>
      <!-- <span slot="title">寻宠启示</span> -->
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/index/blacklist">销售地点管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/index/stationInfo">城市信息管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/index/stationInfo">药品信息管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/index/stationInfo">医保政策管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/index/stationInfo">医药公司政策管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/index/stationInfo">医生信息管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/index/stationInfo">必备材料管理</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.router-link-active {
  text-decoration: none;
  color: orange;
}
a {
  text-decoration: none;
  color: #fff;
}
</style>
