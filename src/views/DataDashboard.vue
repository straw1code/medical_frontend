<template>
   <div id="main" style="width: 600px;height:400px;"></div>
</template>

<script>
export default {
  data() {
    return {
      docLev: [],
      docCount: [],
    }
  },
  mounted() {
    this.initBar();;
  },
  methods: {
    showBar() {
      var chartDom = document.getElementById('main');
      var myChart = this.$echarts.init(chartDom);
      var option;
      var datax = this.docLev;
      var datay = this.docCount;

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: datax,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: datay
          }
        ]
      };

      option && myChart.setOption(option);

    },
    async initBar() {
      await this.$http.get("/doctor/bar").then((res) => {
        console.log("initBar res", res);
        if(res.data.code == 200) {
          this.docLev = res.data.data.level;
          this.docCount = res.data.data.count;
        }
      }).catch(err => console.log(err))
      this.showBar()
    }
  }
}
</script>

<style>

</style>