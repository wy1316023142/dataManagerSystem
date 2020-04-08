<template>
    <div id="myLine" style="width: 100%;height:100%"></div>
</template>
<script>
export default {
  props: {
    personNumber: {
      default: function() {
        return [];
      }
    },
    carNumber: {
      default: function() {
        return [];
      }
    },
    dataxAxis: {
      default: function() {
        return [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ];
      }
    }
  },
  // watch:{
  //     personNumber(newval,oldval){
           
  //     },
  //      deep: true
  // },
    mounted() {
        this.$nextTick(() => {
            this.initEcharts()
        })
    },
  methods: {
    initEcharts() {


      var option = {
        animationDuration: 2000,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          right: 10
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "0%",
          top: "22%",
          containLabel: true
        },
        legend: {
          icon: "circle",
          x: "right", //可设定图例在左、右、居中
          y: "center",
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          top: 0,
          textStyle: {
            color: "#fff",
            fontSize: "12px"
          }
        },
        xAxis: [
          {
            type: "category",
            data: [
              "2019-12-12",
              "2019-12-13",
              "2019-12-14",
              "2019-12-15",
              "2019-12-16",
              "2019-12-17",
              "2019-12-18"
            ],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#153555"
              }
            },
            axisLabel: {
              interval: 1,
              textStyle: {
                color: "#719db3",
                fontSize: "12px"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#153555"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#719db3",
                fontSize: "12px"
              }
            }
          }
        ],
        series: [
          {
            name: "人脸采集",
            type: "line",
            // data: [373, 442, 264, 196, 423, 341, 0],
            data:this.personNumber,
            itemStyle: {
              normal: {
                color: "#335ecf"
              }
            },
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#335ecf"
                  },
                  {
                    offset: 0.34,
                    color: "#1c3483"
                  },
                  {
                    offset: 1,
                    color: "#0d2446"
                  }
                ])
              }
            },
            smooth: true
          },
          {
            name: "车辆采集",
            type: "line",

            // data: [2103, 2322, 1996, 1903, 2038, 1705, 0],
            data:this.carNumber,
            itemStyle: {
              normal: {
                color: "#03eaf1"
              }
            },
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#109463"
                  },
                  {
                    offset: 0.34,
                    color: "#10628d"
                  },
                  {
                    offset: 1,
                    color: "#0b304e"
                  }
                ])
              }
            },
            smooth: true
          }
        ]
      };

      var myChart = this.$echarts.init(document.getElementById("myLine"));
      myChart.setOption(option);
    },
  },
  mounted() {
    this.initEcharts();
  }
};
</script>
<style lang="scss" scoped>
</style>
