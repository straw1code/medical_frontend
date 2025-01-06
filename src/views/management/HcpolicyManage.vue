<!-- 医保政策管理界面 -->
<template>
    <Breadcrumb/>
    <div class="outbox">
      <!-- 搜索框 -->
        <div style="margin-bottom: 5px; margin-top: 20px; text-align: center;">
            <!-- <span>医保编号</span> -->
            <el-input
                v-model="searchEtd"
                placeholder="请输入医保编号"
                style="width: 70%"
            >
            </el-input>
            <!-- <span>政策标题</span>
            <el-input
                v-model="searchEtd.title"
                placeholder="请输入"
                style="width: 17%"
            >
            </el-input>
            <span>发布时间</span>
            <el-date-picker
                v-model="searchEtd.time"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            <span>城市</span>
                <el-cascader
                    placeholder="请选择要查询的城市"
                    size="large"
                    :options="pcTextArr"
                    v-model="searchEtd.city">
                </el-cascader> -->
                <!-- v-model="selectedOptions" -->
            <!-- <el-input
                v-model="searchEtd.city"
                placeholder="请选择要查询的城市"
                style="width: 17%"
            >
            </el-input> -->
            <el-button type="primary" @click="search" style="margin-left: 12px;">查询</el-button>
            <el-button type="success" @click="addBtn">新增</el-button>
        </div>
        <el-scrollbar>
    <!-- 数据表 -->
        <el-table :data="tableData" :row-style="{height: '160px'}" 
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        >
            <el-table-column prop="id" label="医保编号"/>
            <el-table-column prop="title" label="政策标题"/>
            <el-table-column prop="message" label="政策标题"/>
            <el-table-column prop="city.cityName" label="城市"> 
                <template #default="scope">
                    {{ scope.row.city ? scope.row.city.cityName : '暂无数据' }}
                </template>    
            </el-table-column>
            <el-table-column prop="updateTime" label="发布时间"> 
                <template #default="scope">
                    {{ formatDateTime(scope.row.updateTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="operare" label="操作">
              <template v-slot="scope">
                  <el-button type="success" @click="modifyBtn(scope.row)"
                  >修改</el-button
                  >
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
            <el-form-item label="政策标题" prop="title">
                <el-input v-model="cpyForm.title"></el-input>
            </el-form-item>
            <el-form-item label="政策内容" prop="message">
              <el-input 
                    :rows="5"
                    type="textarea"
                    v-model="cpyForm.message">
              </el-input>
            </el-form-item>
            <el-form-item label="生效城市" prop="cityName">
              <el-cascader
                  placeholder="请选择要新增的城市"
                  size="large"
                  :options="pcTextArr"
                  v-model="cpyForm.cityName">
              </el-cascader>
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
                <el-form-item label="政策标题" prop="title">
                    <el-input v-model="modifyForm.title"></el-input>
                </el-form-item>
                <el-form-item label="政策内容" prop="message">
                    <el-input 
                    :rows="5"
                    type="textarea"
                    v-model="modifyForm.message"></el-input>
                </el-form-item>
                <el-form-item label="生效城市" prop="city.cityName">
                    <el-cascader
                        placeholder="请选择要新增的城市"
                        size="large"
                        :options="pcTextArr"
                        v-model="modifyForm.city.cityName">
                    </el-cascader>
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
        title: [{ required: true,  message: "请输入政策标题", trigger: "blur" }],
        message: [{ required: true, message: "请输入政策内容",  trigger: "blur" }],
        cityName: [{ required: true,  message: "请输入选择对应城市", trigger: "blur" }],
      },
      cpyForm: {//新增弹出框
        title: '',
        message: '',
        cityName: '',
      },
      modifyForm: {
        title:'',
        message:'',
        city: {
            cityName:''
        }
      },
      mform: {
        id:'',
        title:'',
        message:'',
        cityId:'',
      },
      centerDialogVisible1: false, // 修改触发的dialog窗口
      pcTextArr,
      selectedOptions: []// 城市二级选择
    };
  },
  created() {
    this.loadInfo();
  },
  methods: {
    search() {//todo
      this.loadInfo()
    },
    loadInfo() {
      this.$http
        .get(`/medical_policy?pn=${this.currentPage}&size=${this.pageSize}&keyword=${this.searchEtd}`)
        .then((res) => {
          console.log("加载医保返回数据" ,res);
          if (res.data.code == 200 && res.data.data != null) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {alert(res.data.message);
            this.$router.push("/login")}
        });
    },
    doSave() {// 新增公司信息
      this.cpyForm.cityName = this.cpyForm.cityName[1];
      console.log("即将提交的新增表单", this.cpyForm);
      this.$http.post(`/medical_policy?city=${this.cpyForm.cityName}`, this.cpyForm).then((res) => {
        console.log("新增医保政策信息", res);
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
      this.mform.id = this.modifyForm.id;
      this.mform.title = this.modifyForm.title;
      this.mform.message = this.modifyForm.message;
      this.mform.cityId = this.modifyForm.city.id;
      console.log("提交的mform", this.mform);
      this.$http.put(`/medical_policy/${this.mform.id}`, this.mform).then((res) => {
        console.log("doModify修改返回数据", res);
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
  
    modifyBtn(row) {
      this.centerDialogVisible1 = true;
      this.$nextTick(() => {
        this.modifyForm = row;
        console.log("modifyFormthis",this.modifyForm);
        // console.log("mform",this.mform);

      });
    },
    deleteReco(row) {
      console.log("delete");
      console.log(row);
      this.$http.delete(`/medical_policy/${row.id}`).then((res) => {
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
      this.searchEtdName = "";
    },
    formatDateTime(dateTime) {//格式化日期信息
        if (!dateTime) return '暂无数据';
        const date = new Date(dateTime);
        return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
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
