<template>
    <Breadcrumb />
    <div style="margin-left: 48px; margin-top: 20px">
        <el-input
          v-model="searchName"
          placeholder="请输入姓名"
          style="width: 200px"
          @keyup.enter.native="search"
        >
        </el-input>
        <el-button type="primary" @click="search" style="margin-left: 12px;">查询</el-button>
    </div>
    <div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%; line-height: 40px;"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            >
            </el-table-column>
            <el-table-column
            prop="realname"
            label="姓名"
            >
            </el-table-column>
            <el-table-column
            prop="uname"
            label="用户名"
            >
            </el-table-column>
            <el-table-column
            prop="phonenumber"
            label="联系方式"
            >
            </el-table-column>
            <el-table-column
            prop="utype"
            label="用户类型"
            >
            </el-table-column>
            <el-table-column
            prop="updatetime"
            label="创建时间"
            >
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="createtime"
            label="修改时间"
            >
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="pagesizes"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue';
export default {
  components: { Breadcrumb },
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        pageNum: 1,
        pagesizes: [3,5,8,10],
        pagesize: 5,
        total: 0,
        searchName: "",
      }
    },
    created() {
        this.userList();
    },
    mounted() {

    },
    methods: {
      userList(){
        this.$http.get("/").then((res) => {
        console.log(res);
        if (res.status == 200 && res.data != null) {
          this.tableData = res.data;
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.userList();
        } else this.$message.error("数据加载失败");
      });
      },
      search() { // 按品种搜索宠物
        this.$http
            .post("/", {
              pageSize: this.pageSize,
              pageNum: this.currentPage,
              param: {
                breed: this.searchEtdBreed,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.status == 200 && res.data != null) {
                console.log(res.data);
                this.petInfo = res.data.list;
                this.total = res.data.total;
                this.searchName = "";
              } else alert("获取数据失败");
            });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
}
</script>

<style>

</style>