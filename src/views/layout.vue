<template>
    <div class="hdp-container">
        <div class="hdp-header flex">
            <img src="@/assets/image/common/logo.png" class="hdp-header-logo">
            <div class="flexItem info text_r">
                <div class="equipmentInfo">
                    <i class="el-icon-tickets"></i>离线设备<span>{{number}}</span>项
                </div>
                <div class="userInfo">欢迎您 admin</div>
            </div>
            <div class="userImage ">
                <img src="@/assets/image/common/rm.png">
            </div>
        </div>
        <div class="hdp-content">
            <div class="hdp-side">
                <div class="menu-icon">MENU</div>
                <ul class="timeline">
                    <li class="timeline-item active">
                        <div class="timeline-item__tail"></div>
                        <div class="timeline-item__node"></div>
                        <div class="timeline-item__wrapper">
                            <i class="el-icon-s-home"></i>
                            <span @click="select(1)" class="cursor" :class="{to_active:shows==1}">首页</span>
                        </div>
                    </li>
                    <li class="timeline-item">
                        <div class="timeline-item__tail"></div>
                        <div class="timeline-item__node"></div>
                        <div class="timeline-item__wrapper">
                            <i class="el-icon-notebook-2"></i>
                            <span @click="select(2)" class="cursor" :class="{to_active:shows==2}" >设备列表</span>
                        </div>
                    </li>
                    <li class="timeline-item" >
                        <div class="timeline-item__tail"></div>
                        <div class="timeline-item__node"></div>
                        <div class="timeline-item__wrapper">
                            <i class="el-icon-s-order"></i>
                            <span @click="select(3)" class="cursor" :class="{to_active:shows==3}" style="padding-bottom:5px;">实时查看</span>
                            <p v-for="(item,index) in chooseData" :key="index" v-show="showFlag" class="DeviceListOne cursor" @click='getDeviceListOne(item,index)'
                             :title='item.name' :class="{to_active:index == cuerrIndex}"> 
                                {{ item.name }}
                            </p>
                        </div>
                    </li>
                      
                    <li class="timeline-item">
                        <div class="timeline-item__tail"></div>
                        <div class="timeline-item__node"></div>
                        <div class="timeline-item__wrapper">
                            <i class="el-icon-setting"></i>
                            <span @click="select(4)" class="cursor" :class="{to_active:shows==4}">参数设置</span>
                        </div>
                    </li>
                </ul>
                <div class="exit">
                    <div class="exit-main">
                        <i class="el-icon-arrow-left"></i>
                        <i class="el-icon-arrow-left"></i>
                         <!-- <form th:action="@{/logout}" method="get"> -->
                          <!-- <form   > -->
                            <!-- <input type="submit" class="exit_submit cursor" value="EXIT"  />  -->
                          <!-- </form>  -->
                        <a  class="cursor" @click="back"><span>EXIT</span></a>
                    </div>
                    
                    <p class="time">
                        <span class="text1">{{nowDate}}</span>&nbsp;<span class="text2">{{nowTime}}</span>
                    </p>

                </div>
            </div>
            <div class="hdp-main">
                <div class="hdp-main-content">
                    <router-view></router-view>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import Api from "@/common/api.js";
import Bus from "@/common/bus.js";
export default {
  name: "layout",
  data() {
    return {
      number: "",
      shows: 1,
      cuerrIndex: -1,
      filter: {
        pageNumber: 1,
        pageSize: 15,
        name: ""
      },
      showFlag: false,
      chooseData: [],
      nowDate: moment().format("YYYY/MM/D"),
      nowTime: moment().format("HH:mm:ss")
    };
  },
  methods: {
    select(type) {
      switch (type) {
        case 1:
          this.shows = 1;
          this.showFlag = false;
          this.cuerrIndex = -1;
          this.$router.push({ name: "index" });
          break;
        case 2:
          this.shows = 2;
          this.showFlag = false;
          this.cuerrIndex = -1;
          this.$router.push({ name: "deviceList" });
          break;
        case 3:
          this.shows = 3;
          this.showFlag = !this.showFlag;
          this.cuerrIndex = -1;
          this.getDeviceList();
          this.$router.push({ path: "/video" });
          Bus.$emit("deviceInfoMeum", {});
          break;
        case 4:
          this.shows = 4;
          this.showFlag = false;
          this.cuerrIndex = -1;
          this.$router.push({ name: "parameterSetting" });
          break;
      }
    },
    getDeviceList() {
      this.chooseData = [];
      var obj = {};
      Api.getDeviceList.post(this.filter, {}).then(res => {
        res.data.result.records.map(item => {
          this.chooseData.push(item);
        });
      });
    },
    uploadDeviceIfo(deviceId, rtmpUrl, whetherPush) {
      Api.uploadDeviceIfo
        .post(
          {
            deviceId,
            rtmpUrl,
            whetherPush
          },
          {}
        )
        .then(res => {});
    },
    getDeviceListOne(item, index) {
      var changeId = localStorage.getItem("changeId");

      this.uploadDeviceIfo(item.deviceId, item.rtmpUrl, true);
      this.cuerrIndex = index;
      Api.getDeviceById.get({ id: item.id }, {}).then(res => {
        localStorage.setItem("changeId", item.deviceId);
        if (changeId == item.deviceId) {
          this.uploadDeviceIfo(item.deviceId, item.rtmpUrl, true);
        } else {
          this.uploadDeviceIfo(changeId, item.rtmpUrl, false);
        }

        Bus.$emit("deviceListOne", res.data.result);
      });
    },
    offlineDeviceCount() {
      Api.offlineDeviceCount.get({}, {}).then(res => {
        this.number = res.data.result;
      });
    },
    back() {
         Api.back.get({}, {}).then(res => {
            window.location.href = `/logout`
      });
    },
  },
  mounted() {
    setInterval(() => {
      this.nowDate = moment().format("YYYY/MM/D");
      this.nowTime = moment().format("HH:mm:ss");
    }, 1000);
    this.offlineDeviceCount();
    Bus.$on("demo", msg => {
      console.log(msg);
      this.getDeviceList();
    });
    // this.getDeviceList()
    // this.clearCookie()
  }
};
</script>

<style lang="less">
.cursor {
  cursor: pointer;
}
.exit_submit {
  color: #cfdaff;
  background: transparent;
  border: none;
  margin-left: 14px;
  font-size: 20px;
  outline: none;
}
.to_active {
  color: #1b73d6;
}
.DeviceListOne {
  font-size: 14px;
  padding: 5px 0 5px 24px;
  // padding-left: 10px;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
a{
    color: #cfdaff;
}
</style>
