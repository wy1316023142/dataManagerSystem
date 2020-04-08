<template>
    <div  ref="allHeight" style="height:100%" class="">
          <div style="height:3rem;" ref="topHeight">
              <el-col :span="24"  >
                <el-row :gutter="20" >
                <el-col :span="8">
                    <el-card class="box-card " >
                      <div slot="header" class="clearfix header">
                          <span style="font-size:0.2rem;margin-right:0.1rem">今日抓拍数量</span>
                          <span>NUMBER OF SNAPSHOTS TODAY</span>
                      </div>
                      <div class="flex card_content" style="height:2rem;">
                          <div v-for="(o,index) in todayCaptureNumber" :key="index" class=" item flexItem" >
                              <img src="../../assets/image/homePage/1.png" v-if="index==0" class="snapshots_img">
                              <img src="../../assets/image/homePage/2.png" v-else-if="index==1" class="snapshots_img">
                              <p class="title">{{o.title}}</p>
                              <p class="number">{{ String(o.number).replace(/(\d)(?=(\d{3})+$)/g, "$1,")}}</p>
                          </div>
                      </div>
                    </el-card>
                </el-col>
                <el-col :span="11">
                      <el-card class="box-card "  >
                          <div slot="header" class="clearfix header">
                              <span style="font-size:0.2rem;margin-right:0.1rem">服务器状态</span>
                              <span>SERVER STETAS</span>
                          </div>
                          <div class="flex card_content" style="height:2rem">
                              <div class=" item flexItem" >
                                  <el-row :gutter="20" style="display:flex;justify-content: space-between;" >
                                      <el-col :span="11" class="  cpu ">
                                          <div class=" itemlist1">
                                              <img src="../../assets/image/homePage/3.png" alt="">
                                              <p>CPU使用</p>
                                          </div>
                                          <div class="flexItem itemlist2">
                                              <p>CPU/{{cpuIfo.ghz}}  {{cpuIfo.temperature}}</p>
                                              <el-progress :text-inside="false"  :stroke-width="10" :percentage='cpuIfo.used'></el-progress>
                                          </div>
                                      </el-col>
                                      <el-col :span="11" class=" flex hardDisk  ">
                                          <div class=" itemlist1">
                                              <img src="../../assets/image/homePage/4.png" alt="">
                                              <p>硬盘使用</p>
                                          </div>
                                          <div class="flexItem itemlist2">
                                              <p>已用{{diskIfo.usable}}</p>
                                              <el-progress :text-inside="false"  :stroke-width="10" :percentage="diskIfo.used"></el-progress>
                                          </div>
                                      </el-col>
                                  </el-row>
                                  <el-row :gutter="20" style="display:flex;justify-content: space-between;" >
                                      <el-col :span="11" class=" flex memory ">
                                          <div class=" itemlist1">
                                              <img src="../../assets/image/homePage/5.png" alt="">
                                              <p>内存使用</p>
                                          </div>
                                          <div class="flexItem itemlist2">
                                              <p>已用{{ramIfo.usable}}</p>
                                              <el-progress :text-inside="false"  :stroke-width="10" :percentage="ramIfo.used"></el-progress>
                                          </div>
                                      </el-col>
                                      <el-col :span="11" class=" flex network ">
                                          <div class=" itemlist1 left">
                                              <img src="../../assets/image/homePage/6.png" alt="">
                                              <p>网络使用</p>
                                          </div>
                                          <div class=" itemlist2">
                                              <p>上下行流量</p>
                                              <div class=" flex network_content">
                                                <div class="network_img bg_blue" >
                                                    <img src="../../assets/image/homePage/7.png" alt="">
                                                </div>
                                                <span class="network_number blue">{{networkIfo.upload}}</span>
                                                 <!-- <span class="network_number blue">222KB/M</span> -->
                                                <div class="network_img bg_green">
                                                    <img src="../../assets/image/homePage/8.png" alt="">
                                                </div>
                                                <span class="network_number green">{{networkIfo.download}}</span>
                                                <!-- <span class="network_number blue">222KB/M</span> -->
                                              </div>
                                          </div>
                                      </el-col>
                                  </el-row>
                              </div>
                          </div>
                    </el-card>
                </el-col>
                <el-col :span="5">
                     <el-card class="box-card "  >
                      <div slot="header" class="clearfix header">
                          <span style="font-size:0.2rem;margin-right:0.1rem">接入设备数量</span>
                          <span>ACCESS WQUIPMENT</span>
                      </div>
                      <div class="flex card_content" style="height:2rem">
                        <IEcharts :option="pie" style="height: 100%;width:100%" ></IEcharts>
                      </div>
                    </el-card>
                </el-col>
                </el-row>
            </el-col>
          </div>
          <div class="collectionBox" style="width:100%;height:calc(100% - 3rem)">
             <el-col :span="24">
                 <el-card class="box-card ">
                    <div slot="header" class="clearfix header">
                        <span style="font-size:0.2rem;margin-right:0.1rem">24小时采集数量</span>
                        <span>COLLECTION QUANTITY</span>
                    </div>
                    <div class="flex card_content" :style="{height: buttomHeight + 'rem'}">
                          <IEcharts :option="line" style="width:100%;" :style="{height: buttomHeight + 'rem'}"></IEcharts>
                    </div>
                    </el-card>
            </el-col>
          </div>
            
    </div>
</template>

<script>
import echartsPie from "@/components/echartsPie.vue";
import EchartsLine from "@/components/EchartsLine.vue";
import IEcharts from "vue-echarts-v3/src/full.js";
import Api from "@/common/api.js";
import { log } from 'util';
export default {
  components: {
    IEcharts,
    echartsPie,
    EchartsLine
  },
  data() {
    return {
      allHeight: "0",
      topHeight: "0",
      buttomHeight: 3,
      line: {
        animationDuration: 2000,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter:function(value){
             for(var i=0;i<value.length;i++){
              return "<span style='display:inline-block;width:10px;height:10px;border-radius:50%; margin-right:4px;background:"+value[0].color+"'></span>"+
                    value[0].seriesName+'  :  '+value[0].data+ "<br/>"+
                    "<span style='display:inline-block;width:10px;height:10px;border-radius:50%; margin-right:4px;background:"+value[1].color+"'></span>"+
                    value[1].seriesName+'  :  '+value[1].data
             }
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
            data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#153555"
              }
            },
            axisLabel: {
              // interval: 1,
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
            data: [10,20],
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

            data: [30,40],
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
      },
      pie: {
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
          left: "center",
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
            label: {
              normal: {
                position: "inner",
                show: false
              }
            },
            color: ["#00ffff", "#2a4ef9", "#5697fe", "#f5f5f5"],
            // data: this.data,
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      todayCaptureNumber: [
        {
          title: "人脸抓拍",
          number: "578220"
        },
        {
          title: "车辆抓拍",
          number: "200158"
        }
      ],
      cpuIfo:{},
      diskIfo:{},
      ramIfo:{},
      networkIfo:{},
      timeInterval:null,
    };
  },
  mounted() {
    this.allHeight = this.$refs.allHeight.offsetHeight;
    this.topHeight = this.$refs.topHeight.offsetHeight;
    this.buttomHeight = (this.allHeight - this.topHeight - 110) / 100;
    this.getTodayCaptureNumber()
    this.getServerState()
    this.deviceCounte()
    this.getGatherCount()
  },
  beforeDestroy(){
    clearTimeout(this.timeInterval)
  },
  methods:{
    getTodayCaptureNumber(){
      var that = this
       Api.getTodayCaptureNumber
            .get({}, {})
            .then(res => {
              for(var i = 0; i<that.todayCaptureNumber.length;i++){
                  that.todayCaptureNumber[0].number =  String(res.data.result.faceCount).replace(/(\d)(?=(\d{3})+$)/g, "$1,")
                  that.todayCaptureNumber[1].number = String(res.data.result.vehicleCount ).replace(/(\d)(?=(\d{3})+$)/g, "$1,")
              }
            })
        that.timeInterval = setInterval(function(){
          clearTimeout(that.timeInterval)
          that.getTodayCaptureNumber()
       },60000)
    },
    getServerState(){
         Api.getServerState
        .get({}, {})
        .then(res => {
          this.cpuIfo = res.data.result.cpuIfo
          this.cpuIfo.used = this.cpuIfo.used
          this.diskIfo = res.data.result.diskIfo
          this.diskIfo.used = this.diskIfo.used
          this.ramIfo = res.data.result.ramIfo
          this.ramIfo.used = this.ramIfo.used
          this.networkIfo = res.data.result.networkIfo
        })
    },
    deviceCounte(){
        Api.deviceCounte
        .get({}, {})
        .then(res => {
          this.pie.series[0].data = res.data.result
        })
    },
    getGatherCount(){
       var xAxis = []
       var yData1 = []
       var yData2 = []
       Api.getGatherCount
        .get({}, {})
        .then(res => {
          this.line.xAxis[0].data
          res.data.result.vehicleViewData.map(item=>{
            xAxis.push(item.name)
            yData1.push(item.value)
          })
          res.data.result.faceViewData.map(item=>{
            yData2.push(item.value)
          })
          // this.line.xAxis[0].data = xAxis
          this.line.series[0].data = yData2
          this.line.series[1].data = yData1
          
        })
    }

  }
};
</script>

<style lang="less">
.box-card {
  .card_content {
    height: 100%;
    .item {
      text-align: center;
      .snapshots_img {
        margin-top: 0.3rem;
      }
      .title {
        color: #fff;
        font-size: 0.14rem;
      }
      .number {
        font-size: 0.24rem;
        font-family: PangMenZhengDao;
        color: #43bcfe;
        margin-top: 0.24rem;
        margin-bottom: 0.3rem;
      }
      .cpu,
      .hardDisk,
      .memory,
      .network {
        background: #153257;
        color: #fff;
        display: flex;
        // height: 0.88rem;
        border-radius: 0.08rem;
        padding-left: 0rem !important;
        padding-right: 0rem !important;

        .itemlist1 {
          width: 0.9rem;
          height: 0.9rem;
          // text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // padding: 0.14rem 0 0 0;
          border-top-left-radius: 0.08rem;
          border-bottom-left-radius: 0.08rem;
        }
        .itemlist2 {
          text-align: left;
          margin-left: 0.14rem;
          // padding: 0.14rem 0 0 0;
          p {
            // margin-bottom: 0.12rem;
            padding-top: 0.1rem;
            padding-bottom: 0.08rem;
          }
        }
      }
      .cpu {
        margin-bottom: 0.3rem;
        // margin: 0.3rem 0;
        .itemlist1 {
          background: #21e2da;
        }
        .itemlist2 {
          .el-progress-bar__inner {
            background: #21e2da;
          }
          .el-progress__text {
            color: #21e2da;
          }
        }
      }
      .hardDisk {
        margin-bottom: 0.3rem;
        // margin: 0.3rem 0;

        .itemlist1 {
          background: #e73848;
        }
        .itemlist2 {
          .el-progress-bar__inner {
            background: #e73848;
          }
          .el-progress__text {
            color: #e73848;
          }
        }
      }
      .memory {
        .itemlist1 {
          background: #f6c095;
        }
        .itemlist2 {
          .el-progress-bar__inner {
            background: #f6c095;
          }
          .el-progress__text {
            color: #f6c095;
          }
        }
      }
      .network {
        .itemlist1 {
          // background: #2786f2;
        }
        .left {
           
          background: #2786f2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // padding: 0.14rem 0;
          border-top-left-radius: 0.08rem;
          border-bottom-left-radius: 0.08rem;
        }
        .itemlist2 {
          .network_content {
            padding-top: 0.1rem;
            .network_img {
              width: 0.2rem;
              line-height: 0.2rem;
              text-align: center;
              border-radius: 50%;
              margin-right: 0.06rem;
            }
            .network_number {
              font-size: 0.15rem;
              font-family: PangMenZhengDao;
              margin-right: 0.09rem;
            }
          }
        }
      }
    }
    justify-content: space-around;
  }
}
.collectionBox {
  // background: red !important;
  margin-top: 0.2rem;
  // .el-card{
  //   height:calc(100% - 3.58rem) !important;
  // }
}
.bg_blue {
  background: #048df6;
}
.blue {
  color: #048df6;
}
.bg_green {
  background: #01ba3e;
}
.green {
  color: #01ba3e;
}
.el-card {
  border: none;
}
.el-card__header {
  background: #2786f2;
  color: #fff;
  border-bottom: none;
}
.el-card {
  //   background: #0d2749;
  background: rgba(#0d2749, 0.5);
}
.el-progress__text {
  display: block;
  font-family: PangMenZhengDao;
  font-size: 0.16rem;
  padding-top: 0.1rem;
}
</style>