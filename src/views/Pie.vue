<template>
    <div id="container">
      <div id="pie" style="width: 600px;height:400px;"></div> 
    </div>
  </template>

<script>

export default {
    data() {
      return {
        pieData: [],
      }
    },
    mounted() {
      this.initPie();
    },
    methods: {
      showPie() {
        var chartDom = document.getElementById('pie');
        var myChart = this.$echarts.init(chartDom);
        var option;
        var data = this.pieData
        option = {
          title: {
            text: '科室人数',
            // subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              // name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
  
        option && myChart.setOption(option);
      },
      async initPie() {
        await this.$http.get("/doctor/pie").then((res) => {
          console.log("initPie res", res);
          if(res.data.code == 200) {
            this.pieData = res.data.data;
            console.log("pieData", this.pieData);
          }
        }).catch(err => console.log(err))
        this.showPie()
      }
    }
  }
  </script>
  
  <style scoped>
    #container {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    height: 100vh; /* 占满整个视口高度 */
  }
  </style>