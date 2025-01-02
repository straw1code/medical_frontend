<template>
    <Breadcrumb/>
    <div class="outbox">
      <!-- 搜索框 -->
        <div style="margin-bottom: 5px; margin-top: 20px; text-align: center;">
            <el-input
                v-model="searchEtd"
                placeholder="请输入要查询的药品名称"
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
            <el-table-column prop="drugId" label="药品编号"/>
            <el-table-column prop="drugImg" label="药品图片" width="150" >
              <template v-slot="scope">
              <img :src="scope.row.drugImg" alt="" style="width: 120px;">
              </template>
            </el-table-column>
            <el-table-column prop="drugName" label="药品名称"/>
            <el-table-column prop="drugInfo" label="药品信息"/>
            <el-table-column prop="drugEffect" label="药品功效"/>
            <el-table-column prop="saleLocations" label="销售地点">  
              <template #default="scope">
                <div v-for="(location, index) in scope.row.saleLocations" :key="index">
                  {{ location.saleName }}
                </div>
            </template> 
            </el-table-column>
              
            <el-table-column prop="publisher" label="发布者"/>           
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
        <el-form ref="form" :model="addForm" label-width="120px" :rules="rules">
            <el-form-item label="药品名称" prop="drugName">
                <el-input v-model="addForm.drugName"></el-input>
            </el-form-item>
            <el-form-item label="药品信息" prop="drugInfo">
                <el-input v-model="addForm.drugInfo"></el-input>
            </el-form-item>
            <el-form-item label="药品功效" prop="drugEffect">
                <el-input v-model="addForm.drugEffect"></el-input>
            </el-form-item>
            <el-form-item label="药品图片" prop="drugImg">
              <el-upload
                      action="#"
                      :show-file-list="false"
                      :auto-upload="false"
                      :multiple="false"
                      :on-change="uploadFile"
                      drag
                      accept="image/jpg,image/jpeg,image/png">
                      <i v-if="imageUrl" class="el-icon-circle-close deleteImg" @click.stop="handleRemove"></i>
                      <img width="200px" v-if="imageUrl" :src="imageUrl" class="el-upload--picture-car" />
                      <div v-else>
                        <i class="el-icon-picture" style="margin-top: 40px; font-size: 40px; color: #999a9c"></i>
                          <div>上传图片</div>
                          <div>格式为png、jpeg或jpg</div>
                      </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="销售药店" prop="saleId">
              <el-cascader
                ref="cascader"
                placeholder="请选择销售药店"
                :options="options"
                :props="props"
                @change="handleChange"
                clearable>
              </el-cascader>
            </el-form-item>
            <el-form-item label="发布者" prop="publisher">
                <el-input v-model="addForm.publisher"></el-input>
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
            <el-form-item label="药品名称" prop="name">
                <el-input v-model="modifyForm.drugName"></el-input>
            </el-form-item>
            <el-form-item label="药品信息" prop="info">
                <el-input :rows="3"
                type="textarea" v-model="modifyForm.drugInfo"></el-input>
            </el-form-item>
            <el-form-item label="药品功效" prop="effect">
                <el-input :rows="3"
                type="textarea" v-model="modifyForm.drugEffect"></el-input>
            </el-form-item>
            <el-form-item label="药品图片" prop="drugImg">
              <el-upload
                      action="#"
                      :show-file-list="false"
                      :auto-upload="false"
                      :multiple="false"
                      :on-change="uploadFile"
                      drag
                      accept="image/jpg,image/jpeg,image/png">
                      <i v-if="imageUrl" class="el-icon-circle-close deleteImg" @click.stop="handleRemove"></i>
                      <img width="200px" v-if="imageUrl" :src="imageUrl" class="el-upload--picture-car" />
                      <div v-else>
                        <i class="el-icon-picture" style="margin-top: 40px; font-size: 40px; color: #999a9c"></i>
                          <div>上传图片</div>
                          <div>格式为png、jpeg或jpg</div>
                      </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="发布者" prop="publisher">
                <el-input v-model="modifyForm.publisher"></el-input>
            </el-form-item>
            <el-form-item label="销售药店" prop="saleLocations">
              <el-cascader
                ref="cascader"
                placeholder="请选择销售药店"
                :options="options"
                :props="props"
                @change="handleChange"
                clearable>
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
        name: [{ required: true,  message: "请输入药品名称", trigger: "blur" }],
        info: [{ required: true,  message: "请输入药品信息", trigger: "blur" }],
        effect: [{ required: true,  message: "请输入药品功效", trigger: "blur" }],
        store: [{ required: true,  message: "请选择销售药店", trigger: "blur" }],
        img: [{ required: true,  message: "请上传药品图片", trigger: "blur" }],
      },
      cpyForm: {//新增弹出框
        name: "",
        info: "",
        effect: "",
        img: "",
        store: [],
      },
      addForm: {
        drugName: "",
        drugInfo: "",
        drugEffect: "",
        drugImg: "",
        saleId: [],
      },
      modifyForm: {
      },
      centerDialogVisible1: false, // 修改触发的dialog窗口
      imageUrl: "",//上传图片
      props: { 
        multiple: true ,
        emitPath: false,
        value: 'saleId',
        label: 'saleName'
      },//新增dialog中的级联组件要用
      options: []
    };
  },
  watch: {
    // 监听modifyForm.saleLocations的变化并更新selectedSaleLocationIds
    'modifyForm.saleLocations': {
      handler(newVal) {
        console.log("handler newVal", newVal);
        // this.modifyForm.saleLocations = newVal.map(location => location.saleId);
      },
      immediate: true // 立即触发一次handler，确保初始值也被处理
    }
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
        .get(`/drug?pn=${this.currentPage}&size=${this.pageSize}&keyword=${this.searchEtd}`)
        .then((res) => {
          console.log("初试页面加载药品信息", res);
          if (res.data.code == 200 && res.data.data != null) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {alert(res.data.message);
            this.$router.push("/login")}
        });
    },
    doSave() {// 新增药品信息
      console.log("新增药品信息的表单addForm", this.addForm);
      this.$http.post("/drug", this.addForm).then((res) => {
        console.log("新增药品信息res", res);
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
      this.$http.put(`/drug/${this.modifyForm.drugId}`, this.modifyForm).then((res) => {
        console.log("修改药品信息res", res);
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
      this.$http.get(`/sale/all`).then((res) => {
        console.log("下拉选择的药店列表res", res);
        if (res.data.code == 200) {
          console.log("下拉选择的药店列表加载成功");
          this.options = res.data.data;
        } else this.$message.error(res.data.message);
      });
      this.$nextTick(() => {
        this.modifyForm = row;
        

        console.log("modifyBtn modifyForm", this.modifyForm);
      });
    },
    deleteReco(row) {
      console.log("delete row", row);
      this.$http.delete(`/drug/${row.drugId}`).then((res) => {
        console.log("删除药品res", res);
        if (res.data.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.loadInfo();
        } else this.$message.error(res.data.message);
      });
    },
    uploadFile(item) {
        console.log("uploadFile接收的item参数");
        console.log(item);
        let formData = new FormData()
        formData.append('file', item.raw)
        this.formData = item.raw; // 图片文件
        this.$http.post("/image", formData ).then(res => {
          console.log("uploadFile图片上传返回数据");
          console.log(res);
        })
        this.imageUrl = URL.createObjectURL(item.raw); // 图片上传浏览器回显地址
        console.log("uploadFile imageUrl", this.imageUrl);
        console.log("imageUrl", this.imageUrl)
        console.log("formData", this.formData)
        if(this.centerDialogVisible1 == true)
          this.modifyForm.drugImg = this.imageUrl
        if(this.centerDialogVisible == true)
          this.addForm.drugImg = this.imageUrl
        
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
    handleChange(val){
			let nodesInfo = this.$refs['cascader'].getCheckedNodes()
			// 清空 addForm.store
      this.addForm.saleId = [];
      this.modifyForm.saleId = [];
      // 遍历 nodesInfo 数组
      nodesInfo.forEach(node => {
        // 将 data 对象追加到 addForm.store 中
        this.addForm.saleId.push(parseInt(node.data.saleId, 10));
        this.modifyForm.saleId.push(parseInt(node.data.saleId, 10));
      });
      // 更新modifyForm.saleLocations
      // this.modifyForm.saleLocations = val.map(id => this.options.find(option => option.value === id));
		},
    resetForm() {
      this.$refs.form.resetFields();
    },
    addBtn() {
      this.centerDialogVisible = true;
      this.$http.get("/sale/all").then(res => {
          console.log("新增表单选择销售药店");
          console.log(res);
          if(res.data.code == 200){
            this.options = res.data.data
            // this.addForm.store = res.data.data
            // console.log("addForm.store", this.addForm.store);
          }

        })
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
