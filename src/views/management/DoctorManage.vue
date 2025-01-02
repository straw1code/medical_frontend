<template>
    <Breadcrumb/>
    <div class="outbox">
      <!-- 搜索框 -->
        <div style="margin-bottom: 5px; margin-top: 20px; text-align: center;">
            <el-input
                v-model="searchEtd"
                placeholder="请输入要查询的医生级别"
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
            <el-table-column prop="name" label="医生姓名"/>
            <el-table-column prop="age" label="年龄"/>
            <el-table-column prop="sex" label="性别">
              <template #default="scope">
                {{ scope.row.sex == 1 ? "男" : "女"  }}
              </template>
            </el-table-column>
            <el-table-column prop="level" label="级别"/>
            <el-table-column prop="phone" label="手机号"/>
            <el-table-column prop="type" label="诊治类别"/>   
            <el-table-column prop="hospital" label="所属医院"/>   
            <el-table-column prop="operate" label="操作" width="260px">
              <template v-slot="scope">
                <el-button type="success" @click="modifyBtn(scope.row)"
                >修改</el-button>
                <el-popconfirm
                    title="确认删除?"
                    @confirm="deleteReco(scope.row.id)"
                    >
                    <template #reference>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
                <el-button round type="plain" @click="resetCode(scope.row)"
                >重置密码</el-button>
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
        width="30%"
        align-center
        >
          <el-form ref="form" :model="cpyForm" label-width="120px" :rules="rules">
              <el-form-item label="医生姓名" prop="name">
                  <el-input v-model="cpyForm.name"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                  <el-input v-model="cpyForm.username"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="psw">
                  <el-input v-model="cpyForm.psw"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="cpyForm.age"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-cascader
                    size="mini"
                    :props="props"
                    placeholder="请选择性别"
                    :options="sex"
                    v-model="cpyForm.sex">
                </el-cascader>
              </el-form-item>
              <el-form-item label="级别" prop="levelId">
                <el-cascader
                    :props="props"
                    placeholder="请选择级别"
                    size="large"
                    :options="levelOptions"
                    v-model="cpyForm.levelId">
                </el-cascader>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                  <el-input v-model="cpyForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="诊治类别" prop="typeId">
                <el-cascader
                    :props="props"
                    placeholder="请选择诊治类别"
                    size="large"
                    :options="typeOptions"
                    v-model="cpyForm.typeId">
                </el-cascader>
              </el-form-item>
              <el-form-item label="所属医院" prop="hospital">
                  <el-input v-model="cpyForm.hospital"></el-input>
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
                <el-form-item label="医生姓名" prop="name">
                    <el-input v-model="modifyForm.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="modifyForm.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-cascader
                        placeholder="请选择性别"
                        size="large"
                        :props="props"
                        :options="sex"
                        v-model="modifyForm.sex">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="级别" prop="levelId">
                    <el-cascader
                        :props="props"
                        placeholder="请选择医生级别"
                        size="large"
                        :options="levelOptions"
                        v-model="modifyForm.levelId">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="modifyForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="诊治类别" prop="typeId">
                  <el-cascader
                        :props="props"
                        placeholder="请选择医生诊治类别"
                        size="large"
                        :options="typeOptions"
                        v-model="modifyForm.typeId">
                  </el-cascader>
                </el-form-item>
                <el-form-item label="所属医院" prop="hospital">
                    <el-input v-model="modifyForm.hospital"></el-input>
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
    created() {
      this.loadInfo();
    },
  data() {
    return {
      tableData: [],
      pageSize: 12,
      currentPage: 1,
      total: 0,
      searchEtd: "",
      centerDialogVisible: false,
      rules: {
        name: [{ required: true,  message: "请输入医生姓名", trigger: "blur" }],
        age: [{ required: true,  message: "请输入医生年龄", trigger: "blur" }],
        levelId: [{ required: true,  message: "请选择医生级别", trigger: "blur" }],
        sex: [{ required: true,  message: "请选择医生性别", trigger: "blur" }],
        phone: [{ required: true, 
                  pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                  message: "请输入有效的公司电话", 
                  trigger: "blur" 
               }],
        typeId: [{ required: true,  message: "请选择医生的诊治类别", trigger: "blur" }],
        hospital: [{ required: true,  message: "请输入医生所属的医院", trigger: "blur" }],
        
      },
      cpyForm: {//新增弹出框
      },
      modifyForm: {},
      centerDialogVisible1: false, // 修改触发的dialog窗口
      sex: [
        {
          id: 2,
          name: '女',
        },
        {
          id: 1,
          name: '男',
        },
      ],
      levelOptions: [],
      typeOptions: [],
      props: { 
        multiple: false ,
        emitPath: false,
        value: 'id',
        label: 'name'
      },//新增dialog中的级联组件要用
    }
  },
  methods: {
    search() {
      this.loadInfo()
    },
    loadInfo() {
      this.$http
        .get(`/doctor?pn=${this.currentPage}&size=${this.pageSize}&keyword=${this.searchEtd}`)
        .then((res) => {
          console.log("初始页面(搜索)，加载医生信息", res);
          if (res.data.code == 200 && res.data.data != null) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.list.length;
          } else {alert(res.data.message);
            this.$router.push("/login")}
        });
    },
    getLevelOptions() {
      this.$http.get(`/doctor_level`).then((res) => {
        console.log("获得医生级别列表res", res);
        if (res.data.code == 200) {
          this.levelOptions = res.data.data;
        } else this.$message.error(res.data.message);
      });
    },
    getTypeOptions() {
      this.$http.get(`/treat_type`).then((res) => {
        console.log("获得诊治类型列表res", res);
        if (res.data.code == 200) {
          this.typeOptions = res.data.data;
        } else this.$message.error(res.data.message);
      });
    },
    modifyBtn(row) {
      this.getLevelOptions();
      this.getTypeOptions();
      this.centerDialogVisible1 = true;
    
      this.$nextTick(() => {
        this.modifyForm = row;
        console.log("modifyForm");
        console.log(this.modifyForm);
      });
  },
    doSave() {// 新增城市信息
      this.$http.post(`/doctor`, this.cpyForm).then((res) => {
        console.log("新增医生信息res", res);
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
      console.log("doModify modifyForm", this.modifyForm);
      // console.log(typeof(this.modifyForm.id));
      this.$http.put(`/doctor/${this.modifyForm.id}`, this.modifyForm).then((res) => {
        console.log("修改医生信息res", res);
        if (res.data.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.centerDialogVisible1 = false;
          this.loadInfo();
        } else this.$message.error(res.data.message);
      })
    },
   
    deleteReco(id) {
      console.log("delete");
      console.log(id);
      this.$http.delete(`/doctor/${id}`).then((res) => {
        console.log("删除医生信息res", res);
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
      this.getLevelOptions();
      this.getTypeOptions();
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
}
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
  