<template>
    <el-carousel :interval="3000" arrow="always" height="373px" style="margin-top: -40px;">
      <el-carousel-item v-for="img in imgs">
        <img :src=img style="height: 100%; width: 100%;margin-left: -0px;">
      </el-carousel-item>
    </el-carousel>
    <el-card v-for="card in cardinfo" class="box-card" :body-style="{ padding: '0px' }" >
    <img :src="card.img" class="image">
        <div style="padding: 14px;">
            <div class="bottom clearfix">
                <span style="font-weight: bolder;">{{ card.desc }}</span>
            </div>
        </div>
    </el-card>
    
  </template>
  <script>
  export default {
    data() {
      return {
        imgs:[
                "../../public/static/img/carousel1.png",
                "../../public/static/img/carousel2.jpg",
                "../../public/static/img/carousel3.jpg",
            ],
        cardinfo:[
            {
                desc: '基础信息管理',
                img: '../../public/static/img/loginbg.jpg',
            },
            {
                desc: '药品信息管理',
                img: '../../public/static/img/loginbg.jpg',
            },
            {
                desc: '医保政策管理',
                img: '../../public/static/img/loginbg.jpg',
            },
            {
                desc: '医药公司政策管理',
                img: '../../public/static/img/loginbg.jpg',
            },
            {
                desc: '医生信息管理',
                img: '../../public/static/img/loginbg.jpg',
            },
            {
                desc: '必备材料管理',
                img: '../../public/static/img/loginbg.jpg',
            },
        ],
        
        user: JSON.parse(sessionStorage.getItem("CurUser")),
      };
    },
    // 获取宠物对象，给uid赋值为当前用户的uid，再提交给后端数据库修改uid的值
    created() {
      this.listPet();
    },
    methods: {
      
      preAdopt(pet) { // 预约领养按钮
        pet.btnIsDisabled = 1; // 禁用按钮
        pet.uid = this.user.uid;
        console.log("预约领养");
        console.log(pet);
        this.$http.post("/pet/preAdopt", pet).then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.centerDialogVisible = false;
            this.listPet();
          } else this.$message.error("数据提交失败");
        });
      },
      listPet() { // 初始化加载
        this.$http
          .post("/pet/getPetAndSta", {
            pageSize: this.pageSize,
            pageNum: this.currentPage,
          })
          .then((res) => {
            console.log(res.data);
            if (res.status == 200) {
              this.petInfo = res.data.list;
              this.total = res.data.total;
            } else alert("获取数据失败");
          });
        // this.$http
        //   .get("/pet/getPetAndSta")
        //   .then((res) => {
        //     console.log(res.data);
        //     if (res.status == 200) {
        //       this.petInfo = res.data;
        //     } else alert("获取数据失败");
        //   });
      },
      handleSizeChange(val) { // 以下这俩是分页组件的
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.listPet();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.listPet();
      },
    },
  };
  </script>
  <style scoped>
  /* img {
    height: 200px;
    width: 200px;
    margin-left: 30px;
    margin-top: 37px;
  } */
  .box-card {
    float: left;
    width: 200px;
    height: 180px;
    margin-left: 20px;
    margin-top: 10px;
    }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  </style>
  