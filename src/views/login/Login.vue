<template>
  <div class="loginBody">
    <div class="loginDiv">
      <div class="login-content">
        <h1 class="login-title">登 录</h1>
        <el-form
          :model="loginForm"
          label-width="100px"
          :rules="rules"
          ref="loginForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              style="width: 200px"
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              style="width: 200px"
              type="password"
              v-model="loginForm.password"
              show-password
              autocomplete="off"
              size="small"
              @keyup.enter.native="confirm"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="confirm"
              :disabled="confirm_disabled"
              >确 定</el-button
            >
          </el-form-item>
        </el-form>
        
        <div style="float: right; font-size: small">
          还没有账号？请
          <router-link to="/register" tag="span">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      confirm_disabled: false,
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
              { required: true, message: "请输入您的用户名", trigger: "blur" },
            ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      curUser: null,
    };
  },
  methods: {
    confirm() {
      console.log(this.loginForm);
      this.$http
        .post(`/user/login?username=${this.loginForm.username}&password=${this.loginForm.password}`)
        .then((res) => res.data)
        .then((res) => {
          console.log("login返回的数据")
          console.log(res);
          if (res.code == 200 && res.data != null) {
            
            //存储
            sessionStorage.setItem("CurUser", JSON.stringify(res.data));
            //跳转到主页
            this.$router.push("/main")
            // if (res.data.username == "admin_12345") // 在这做判断，如果是管理员账号，跳转到main路由
            // else // 普通用户到petadopt路由
          } else {
              this.$message.error(res.message);
          }
      });
    },
  },
};
</script>

<style scoped>
.loginBody {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: -10px;
  margin-left: -10px;
  background-image: url("../../../public/static/img/loginbg.jpg");
  background-size: cover;
  background-color: rgb(246, 194, 83);
}
.loginDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
  width: 450px;
  height: 330px;
  background: #fff;
  border-radius: 5%;
}
.login-title {
  margin: 20px 0;
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
}
.login-content {
  width: 400px;
  height: 250px;
  position: absolute;
  top: 25px;
  left: 25px;
}
.router-link-active {
  text-decoration: none;
  color: orange;
}
a {
  text-decoration: none;
  color: orange;
}
</style>
