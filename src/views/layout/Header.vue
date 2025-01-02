<template>
  <div class="toolbar">
    <span style="font-size: 15px; color: rgb(162, 165, 180);">欢迎来到慧医数字医疗应用系统，当前用户：</span>
    <span style="font-size: 16px; color: rgb(136, 141, 160); font-style: italic; font-weight: bold; margin-right: 20px;">{{ user == null ? "未登录" : user }}</span>
    <el-button type="danger" round @click="logout">退出登录</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("CurUser")),
    };
  },
  created() {
    console.log("当前用户");
    console.log(this.user);
  },

  methods: {
    logout() {
      this.$confirm("确认退出登录吗？", "提示", {
        confirmButtonText: "退出",
        cancelButtonText: '取消',
        type: "warning",
        center: true,
      }).then(() => {
        this.$http
        .post(`/user/logout`)
        .then((res) => {
          console.log("用户退出登录res");
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: this.data.message,
              type: "success",
            });
            this.$router.push("/");
            sessionStorage.clear();
          } else {
            alert(res.data.message);
          }
        });
        
      });
    },
  },
};
</script>
<style scoped>

</style>
