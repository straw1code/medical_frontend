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
      <router-link tag="span" to="/main">首页</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/company_manage">医药公司管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/salepos_manage">销售地点管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/cityinfo_manage">城市信息管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/medinfo_manage">药品信息管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/hcpolicy_manage">医保政策管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/medipolicy_manage">医药公司政策管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/docinfo_manage">医生信息管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/material_manage">必备材料管理</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/data_dashboard">柱状图统计</router-link>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Promotion /></el-icon>
      <router-link tag="span" to="/main/pie">饼状图统计</router-link>
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
