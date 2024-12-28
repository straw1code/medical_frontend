<template>
  <div class="toolbar">
    <el-dropdown>
      <!-- <el-icon style="margin-right: 8px; margin-top: 1px"><setting /></el-icon> -->
      <el-icon style="margin-right: 8px; margin-top: 1px"
        ><ArrowDownBold
      /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="toUser">个人资料</el-dropdown-item>
          <el-dropdown-item @click.native="toMyAdop">我的预约</el-dropdown-item>
          <el-dropdown-item @click.native="toMyPost">我的发布</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span style="font-size: 14px">{{ user.name }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("CurUser")),
    };
  },

  methods: {
    toMyPost() {
      this.$router.push("/index/mypost");

    },
    toMyAdop() {
      this.$router.push("/index/myadopt");
    },
    toUser() {
      this.$router.push("/index/usercenter");
    },
    logout() {
      this.$confirm("确认退出登录吗？", "提示", {
        confirmButtonText: "退出",
        cancelButtonText: '取消',
        type: "warning",
        center: true,
      }).then(() => {
        this.$router.push("/");
        sessionStorage.clear();
      });
    },
  },
};
</script>
<style scoped>

</style>
