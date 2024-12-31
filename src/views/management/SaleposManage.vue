<template>
  <Breadcrumb/>
  <div class="outbox">
    <!-- 搜索框 -->
      <div style="margin-bottom: 5px; margin-top: 20px; text-align: center;">
          <el-input
              v-model="searchEtd"
              placeholder="请输入要查询的药店名称"
              style="width: 70%"
              @keyup.enter.native="search"
          >
          </el-input>
          <el-button type="primary" @click="search" style="margin-left: 12px;">查询</el-button>
          <el-button type="success" @click="addBtn">新增</el-button>
      </div>
      <el-scrollbar>
      <el-table :data="tableData" :row-style="{height: '160px'}" 
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      >
          <el-table-column prop="saleId" label="药店编号"/>
          <el-table-column prop="saleName" label="药店名称"/>
          <el-table-column prop="salePhone" label="药店电话"/>           
          <el-table-column prop="address" label="药店地址"/>           
          <el-table-column prop="operare" label="操作">
            <template v-slot="scope">
                <el-button type="success" @click="modifyBtn(scope.row)"
                >修改</el-button>
                <el-popconfirm
                title="确认删除?"
                @confirm="deleteReco(scope.row)"
                >
                <template #reference>
                    <el-button type="danger">删除</el-button>
                </template>
                </el-popconfirm>
            </template>
          </el-table-column>
      </el-table>
      <br />
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
          <el-form-item label="药店名称" prop="saleName">
              <el-input v-model="cpyForm.saleName"></el-input>
          </el-form-item>
          <el-form-item label="药店电话" prop="salePhone">
              <el-input v-model="cpyForm.salePhone"></el-input>
          </el-form-item>
          <el-form-item label="药店地址" prop="address">
              <el-input v-model="cpyForm.address"></el-input>
          </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="doSave"> 确定 </el-button>
          </span>
      </template>
  </el-dialog>

  <!-- 修改dialog -->
  <el-dialog 
      v-model="centerDialogVisible1"
      title="修改"
      width="50%"
      align-center
      >
      <el-form ref="form" :model="modifyForm" label-width="120px" :rules="rules">
          <el-form-item label="药店编号" prop="saleId">
              <el-input disabled v-model="modifyForm.saleId"></el-input>
          </el-form-item>
          <el-form-item label="药店名称" prop="saleName">
              <el-input v-model="modifyForm.saleName"></el-input>
          </el-form-item>
          <el-form-item label="药店电话" prop="salePhone">
              <el-input v-model="modifyForm.salePhone"></el-input>
          </el-form-item>
          <el-form-item label="药店地址" prop="address">
              <el-input v-model="modifyForm.address"></el-input>
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
      saleName: [{ required: true,  message: "请输入药店名称", trigger: "blur" }],
      address: [{ required: true,  message: "请输入药店地址", trigger: "blur" }],
      salePhone: [{ required: true, 
                pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                message: "请输入有效的药店电话", 
                trigger: "blur" 
             }],
    },
    cpyForm: {//新增弹出框
      saleName: "",
      salePhone: "",
      address : "",
    },
    modifyForm: {},
    centerDialogVisible1: false, // 修改触发的dialog窗口
  };
},
created() {
  this.loadInfo();
},
methods: {
  search() {
    this.loadInfo()
  },
  loadInfo() {
    this.$http
      .get(`/sale?pn=${this.currentPage}&size=${this.pageSize}`)
      .then((res) => {
        console.log("loadSaleInfo");
        console.log(res);
        if (res.data.code == 200 && res.data.data.list != null) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else alert("获取数据失败");
      });
  },
  doSave() {// 新增公司信息
    this.$http.post("/sale", this.cpyForm).then((res) => {
      console.log("新增药店信息");
      console.log(res);
      if (res.data.code == 200) {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        this.centerDialogVisible = false;
        this.loadInfo();
      } else this.$message.error(res.data.message);
    });
  },
  doModify() {
    this.$http.put(`/sale/${this.modifyForm.saleId}`, this.modifyForm).then((res) => {
      console.log("修改请求返回数据", res);
      if (res.data.code == 200) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.centerDialogVisible1 = false;
        this.loadInfo();
      } else this.$message.error(res.data.message);
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
      console.log("modifyForm");
      console.log(this.modifyForm);
    });
  },
  deleteReco(row) {
    console.log("delete");
    console.log(row);
    this.$http.delete(`/sale/${row.saleId}`).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.loadInfo();
      } else this.$message.error(res.data.message);
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
    this.$refs.form.resetFields();
  },
  addBtn() {
    this.centerDialogVisible = true;
    this.$nextTick(() => {
      this.resetForm();
    });
  },
  resetInput() {
    this.searchEtd = "";
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
