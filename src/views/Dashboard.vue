<template>
    <el-carousel :interval="3000" arrow="always" height="373px" style="margin-top: -40px;">
      <el-carousel-item v-for="img in imgs">
        <img :src=img style="height: 100%; width: 100%;margin-left: -0px;">
      </el-carousel-item>
    </el-carousel>
    <el-card shadow="hover" @click="goTo(card.rou)" v-for="card in cardinfo" class="box-card" :body-style="{ padding: '0px' }" >
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
                desc: '医药公司信息管理',
                img: '../../public/static/img/loginbg.jpg',
                rou: '/main/company_manage'
            },
            {
                desc: '药品信息管理',
                img: '../../public/static/img/loginbg.jpg',
                rou: '/main/medinfo_manage'

            },
            {
                desc: '医保政策管理',
                img: '../../public/static/img/loginbg.jpg',
                rou: '/main/hcpolicy_manage'
                
            },
            {
                desc: '医药公司政策管理',
                img: '../../public/static/img/loginbg.jpg',
                rou: '/main/medipolicy_manage'

            },
            {
                desc: '医生信息管理',
                img: '../../public/static/img/loginbg.jpg',
                rou: '/main/docinfo_manage'

            },
            {
                desc: '必备材料管理',
                img: '../../public/static/img/loginbg.jpg',
                rou: '/main/material_manage'

            },
        ],
        
        user: JSON.parse(sessionStorage.getItem("CurUser")),
      };
    },
    methods: {
      goTo(rou) {
        console.log("goTo(rou)", rou);
        this.$router.push(rou);
      }
    },
  };
  </script>
  <style scoped>
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
  