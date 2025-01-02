<template>
    <Breadcrumb/>
    <div class="outbox">
      <!-- 搜索框 -->
        <div style="margin-bottom: 5px; margin-top: 20px; text-align: center;">
            <el-input
                v-model="searchEtd"
                placeholder="请输入要查询的材料标题"
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
            <el-table-column width="120px" prop="id" label="材料编号"/>
            <el-table-column prop="title" label="材料标题"/>
            <el-table-column prop="message" label="材料内容"/>
            <el-table-column prop="operare" label="操作">
              <template v-slot="scope">
                  <el-button type="success" @click="modifyBtn(scope.row)"
                  >修改</el-button
                  >
                  <el-popconfirm
                  title="确认删除?"
                  @confirm="deleteReco(scope.row.id)"
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
            <el-form-item label="材料标题" prop="title">
                <el-input v-model="cpyForm.title"></el-input>
            </el-form-item>
            <el-form-item label="材料内容" prop="message">
                <el-input v-model="cpyForm.message" :rows="2"
                type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="doSave"> 确定 </el-button>
            </span>
        </template>
      </el-dialog>
      <!-- 修改表单 -->
      <el-dialog 
        v-model="centerDialogVisible1"
        title="修改"
        width="50%"
        align-center
        >
        <!-- 修改dialog -->
        <el-form ref="form" :model="modifyForm" label-width="120px" :rules="rules">
          <el-form-item label="材料标题" prop="title">
                <el-input v-model="modifyForm.title"></el-input>
            </el-form-item>
            <el-form-item label="材料内容" prop="message">
                <el-input v-model="modifyForm.message" :rows="2"
                type="textarea"></el-input>
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
  import { pcTextArr } from 'element-china-area-data'
  
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
        title: [{ required: true,  message: "请输入材料标题", trigger: "blur" }],
        message: [{ required: true, message: "请输入材料内容", trigger: "blur" 
               }],
      },
      cpyForm: {//新增弹出框
        name: "",
        phone: "",
      },
      modifyForm: {},
      centerDialogVisible1: false, // 修改触发的dialog窗口
      pcTextArr,
      selectedOptions: []// 城市二级选择
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
        .get(`/material?pn=${this.currentPage}&size=${this.pageSize}&keyword=${this.searchEtd}`)
        .then((res) => {
          console.log("初始页面(搜索)，加载必备材料信息res", res);
          if (res.data.code == 200 && res.data.data != null) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.list.length;
          } else {alert(res.data.message);
            this.$router.push("/login")}
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
    doSave() {// 新增城市信息
      this.$http.post(`/material`, this.cpyForm).then((res) => {
        console.log("新增材料信息res", res);
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
    
   
    deleteReco(id) {
      console.log("delete");
      console.log(id);
      this.$http.delete(`/material/${id}`).then((res) => {
        console.log("删除材料信息res", res);
        if (res.data.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.loadInfo();
        } else this.$message.error(res.data.message);
      });
    },
    doModify() {
      this.$http.put(`/material/${this.modifyForm.id}`, this.modifyForm).then((res) => {
        console.log("修改材料res", res);
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
      this.searchEtdName = "";
    },
    handleChange (value) {
      console.log("城市级联下拉菜单", value)
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
  