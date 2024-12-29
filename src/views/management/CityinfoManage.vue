<template>
    <Breadcrumb/>
    <div class="outbox">
        <!-- 查询框 -->
        <div style="margin-bottom: 5px; margin-top: 20px; text-align: center;">
            <el-input
                v-model="searchEtd"
                placeholder="请输入要查询的城市或者省份"
                style="width: 70%"
                @keyup.enter.native="search"
            >
            </el-input>
            <el-button type="primary" @click="search" style="margin-left: 12px;">查询</el-button>
            <el-button type="success" @click="addBtn">新增</el-button>
        </div>
        <el-scrollbar>
            <!-- 数据表 -->
        <el-table :data="tableData" :row-style="{height: '160px'}" 
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        >
            <el-table-column prop="number" label="城市编号"/>
            <el-table-column prop="provinceName" label="所属省"/>
            <el-table-column prop="cityName" label="城市名称"/>           
            <el-table-column prop="operare" label="操作">
              <template v-slot="scope">
                  <el-button type="success" @click="modifyBtn(scope.row)"
                  >修改</el-button
                  >
                  <el-popconfirm
                  title="确认删除?"
                  @confirm="deleteReco(scope.row.pid)"
                  >
                  <template #reference>
                      <el-button type="danger">删除</el-button>
                  </template>
                  </el-popconfirm>
              </template>
            </el-table-column>
        </el-table>
        <br />
        <!-- 分页组件 -->
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[4, 6, 8, 10]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="justify-content: center"
        />
        <!-- 新增表单 -->
        <el-dialog
        v-model="centerDialogVisible"
        title="新增"
        width="50%"
        align-center
        >
        <el-form ref="form" :model="cpyForm" label-width="120px" :rules="rules">
            <el-form-item label="公司名称" prop="company_name">
                <el-input v-model="cpyForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公司电话" prop="company_phone">
                <el-input v-model="cpyForm.phone"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="doSave"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog 
        v-model="centerDialogVisible1"
        title="修改"
        width="50%"
        align-center
        >
        <!-- 修改dialog -->
        <el-form ref="form" :model="modifyForm" label-width="120px" :rules="rules">
            <el-form-item label="公司编号" prop="company_name">
                <el-input disabled v-model="modifyForm.id"></el-input>
            </el-form-item>
            <el-form-item label="公司名称" prop="company_name">
                <el-input v-model="modifyForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公司电话" prop="company_phone">
                <el-input v-model="modifyForm.phone"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="centerDialogVisible1 = false">取消</el-button>
            <el-button type="primary" @click="doModify"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
        </el-scrollbar>
    </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 12,
      currentPage: 1,
      total: 0,
      searchEtd: "",
      centerDialogVisible: false,
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入公司电话", trigger: "blur" }],
      },
      cpyForm: {//新增弹出框
        name: "",
        phone: "",
      },
      modifyForm: {},
      centerDialogVisible1: false, // 修改触发的dialog窗口
    };
  },
  created() {
    this.loadInfo();
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    search() {
      this.loadInfo()
    },
    loadInfo() {
      this.$http
        .get(`/city?pn=${this.currentPage}&size=${this.pageSize}&keyword=${this.searchEtd}`)
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data.data != null) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            console.log(this.tableData);
            console.log(this.total);
          } else alert("获取数据失败");
        });
    },
    doSave() {// 添加宠物
      this.petInfoForm.isNeutered = this.transfer(this.petInfoForm.isNeutered);
      this.petInfoForm.isVaccinated = this.transfer(this.petInfoForm.isVaccinated);
      if (this.petInfoForm.stationId == "春田花花")
        this.petInfoForm.stationId = 1
      else if (this.petInfoForm.stationId == "梦想小屋")
        this.petInfoForm.stationId = 2
      else 
        this.petInfoForm.stationId = 3
      this.$http.post("/pet/saveOrModify", this.petInfoForm).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.centerDialogVisible = false;
          this.loadPetsInfo();
        } else this.$message.error("数据提交失败");
      });
    },
    doModify() {
      this.modifyForm.isNeutered == "是" ? this.modifyForm.isNeutered = 1 : this.modifyForm.isNeutered = 0;

      this.modifyForm.isVaccinated == "是" ? this.modifyForm.isVaccinated = 1 : this.modifyForm.isVaccinated = 0;

      if (this.modifyForm.stationId == "春田花花")
        this.modifyForm.stationId = 1
      else if (this.modifyForm.stationId == "梦想小屋")
        this.modifyForm.stationId = 2
      else 
        this.modifyForm.stationId = 3

      this.$http.post("/pet/saveOrModify", this.modifyForm).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.centerDialogVisible1 = false;
          this.loadPetsInfo();
        } else this.$message.error("数据提交失败");
      });
    },
    logout() {
      this.$confirm("确认退出登录吗？", "提示", {
        confirmButtonText: "Yes",
        type: "warning",
        center: true,
      }).then(() => {
        this.$router.push("/");
        sessionStorage.clear();
      });
    },
    modifyBtn(row) {
      this.centerDialogVisible1 = true;
      this.$nextTick(() => {
        this.modifyForm = row;
      });
    },
    deleteReco(pid) {
      console.log("delete");
      console.log(pid);
      this.$http.get("/pet/delete?pid=" + pid).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.loadPetsInfo();
        } else this.$message.error("数据提交失败");
      });
    },
    
    
    save() {
      // 新增（记录）按钮
      this.$refs.form.validate((valid) => {
        //输入数据通过验证才能提交
        if (valid) {
          if (this.form.uid) {
            this.doModify();
          } else this.doSave();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.cpyForm.resetFields();
    },
    addBtn() {
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.resetForm();
      });
    },
    resetInput() {
      this.searchEtdName = "";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.loadInfo();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadInfo();
    },
  },
};
</script>
<style scoped>
.welcome{
  display: inline-block;
  font-size: larger;
  float: left;
  margin-top: 15px;
  
}
.logoutBtn{
  float: right;
  margin-right: 9px;
  margin-top: 9px;
}
.header {
  margin-top: -10px;
  margin-left: -9px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.234);
}
.outbox {
  height: 100%;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
