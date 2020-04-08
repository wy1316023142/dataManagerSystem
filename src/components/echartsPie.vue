<template>
    <div :id="ids" style="width: 100%;height:100%"></div>
</template>

<script>
export default {
  props: {
    ids: {
      default: "myPie"
    },
    data: {
      //中心饼图数据
      default: function() {
        return [
          { value: 210, name: "邮件营销" },
          { value: 190, name: "视频广告" }
        ];
      }
    }
  },
  watch: {
    data(newval, ooldval) {
      this.data = newval;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts();
    });
  },
  methods: {
    initEcharts() {
      var echarts = this.$echarts;
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
           icon: "circle",
           itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
        //    orient: "vertical",
         bottom: 10,
         left: 'center',
          type: "scroll",
         textStyle: {
            fontSize: "12",
            color: "#fff",
            fontWeight: "normal"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "34%"],
            label:{
               normal: {
                       position: 'inner',
                       show : false
                    }
            },
            color: [
              "#00ffff",
              "#2a4ef9",
              "#5697fe",
              "#f5f5f5",
             
            ],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      let myChart = this.$echarts.init(document.getElementById(this.ids));
      myChart.setOption(option);
    
    }
  }
};
</script>
<style>
</style>
