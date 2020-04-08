<template>
    <div class="index">
        <el-row :gutter="20" style="height: 100%">
            <el-col :span="18" style="height: 100%">
                <div class="index-l">
                    <div class="video-box flex">
                        <video id="video" class="video-js vjs-default-skin" data-setup="{}"  ref='video' v-show="videoVisible">
                            <source src="" type="rtmp/flv">
                        </video>
                        <img src="@/assets/image/video/366.png" class="empty-videoImg" v-show="!videoVisible && !sceneImgVisible">
                        <img :src="this.sceneImg" class="sceneImg" v-show="sceneImgVisible && !videoVisible ">
                    </div>
                    <div class="personImg flex">
                        <div class="prev" @click="scrollFunc(1)">
                            <i class="el-icon-arrow-left"></i>
                        </div>
                        <div class="personImg-wrapper flexItem">
                            <div class="personImg-inner">
                                <div class="personImg-item" v-for="(item,index) in data">
                                    <img :src='item.img'>
                                    <div class="personImg-item-des">
                                        <p>{{item.date}} </p>
                                        <p>{{item.address}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="next" @click="scrollFunc(2)">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" style="height: 100%">
                <div class="index-r">
                    <div class="title flex">
                        设备信息<span>Device information</span>
                    </div>
                    <div class="index-r-con">
                        <div class="form-item">
                            <label class="form-item__label">设备名称</label>
                            <div class="form-item__content">
                                <el-input v-model="deviceInfo.name"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item__label">设备类别</label>
                            <div class="form-item__content">
                                <el-select v-model="deviceInfo.deviceCategoryName" @change="deviceCategoryState">
                                    <el-option v-for="(item,index) in deviceCategory" :key="index"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item__label">安装地址</label>
                            <div class="form-item__content">
                                <el-input v-model="deviceInfo.address"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item__label">IP 地 址</label>
                            <div class="form-item__content">
                                <el-input v-model="deviceInfo.ip"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item__label">经　　度</label>
                            <div class="form-item__content">
                                <el-input v-model="deviceInfo.lon"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item__label">维　　度</label>
                            <div class="form-item__content">
                                <el-input v-model="deviceInfo.lat"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item__label">设备厂家</label>
                            <div class="form-item__content">
                                <el-select v-model="deviceInfo.factoryName" @change="factoryListState">
                                    <el-option v-for="(item,index) in factoryList" :key="index"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item__label">设备型号</label>
                            <div class="form-item__content">
                                <el-input v-model="deviceInfo.model"></el-input>
                            </div>
                        </div>
                        <div class="form-textarea">
                            <p class="form-item__label">视频访问地址(rtmp)</p>
                            <div class="form-item__textarea">
                                <el-input v-model="deviceInfo.rtmpUrl" type="textarea"></el-input>
                            </div>
                        </div>
                        <div class="form-submit flex">
                            <div class="button button--primary" @click="deviceUpdate"> 保 存</div>
                            <div class="button button--default">取 消</div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import "video.js/dist/video-js.css";
    import videojs from "video.js/es5/video.js";
    import SWF_URL from "videojs-swf/dist/video-js.swf";
    import Api from "@/common/api.js";
    import Bus from "@/common/bus.js";
    import SockJS from "sockjs-client";
    import Stomp from "stompjs";
    import {log} from 'util';

    videojs.options.flash.swf = SWF_URL;


    export default {
        timer1:null,
        timer2:null,
        components: {},
        name: "index",
        data() {
            return {

                clientHandle: null,
                reTryTime: 0, // 重连次数
                reTryMaxTime: 5, //重连次数
                sceneImg: "",
                videoVisible: true,
                sceneImgVisible: false,
                deviceInfo: {
                    deviceCategoryId: "",
                    factoryId: ""
                },
                filter: {
                    pageNumber: 1,
                    pageSize: 1,
                    sort: "asc",
                    sortBy: "id"
                },
                deviceId: "",
                rtmpUrl: "",
                deviceCategory: [],
                factoryList: [],
                data: [],
                model: {},
                rules: {},
                client: null,
                socket: null,
                lockReconnect: false,
                upDeviceName: "",
                upDeviceId: "",
                upFactoryName: "",
                upFactoryId: "",
            };
        },
        mounted() {
            this.connect();
            this.getDeviceCategoryList();
            this.getFactoryList();
            Bus.$off("deviceListOne", "deviceInfoMeum");
            Bus.$on("deviceInfoMeum", content => {
                this.deviceInfo = content;
            });
            Bus.$on("deviceListOne", content => {
                this.deviceInfo = {};
                this.deviceInfo = content;
                this.deviceId = this.deviceInfo.deviceId;
                this.rtmpUrl = this.deviceInfo.rtmpUrl;
                if (this.rtmpUrl) {
                    this.videoVisible = true;
                    clearTimeout(this.timer1)
                    this.timer1=setTimeout((()=>{
                        videojs("video").src("");
                        videojs("video").src(this.rtmpUrl);
                        clearTimeout(this.timer2)
                        this.timer2=setTimeout((()=>{
                            videojs("video").play();
                        }),500)
                    }),1000)
                } else {
                    this.videoVisible = false;
                    videojs("video").src("");
                    videojs("video").play();
                }
            });

            if (this.$route.query.deviceInfo) {
                this.deviceInfo = this.$route.query.deviceInfo;
                this.deviceId = this.deviceInfo.deviceId;
                this.uploadDeviceIfo(
                    this.deviceInfo.deviceId,
                    this.deviceInfo.rtmpUrl,
                    true
                );
                this.rtmpUrl = this.deviceInfo.rtmpUrl
                if (this.rtmpUrl) {
                    this.videoVisible = true;
                    clearTimeout(this.timer1)
                    this.timer1=setTimeout((()=>{
                        videojs("video").src("");
                        videojs("video").src(this.rtmpUrl);
                        clearTimeout(this.timer2)
                        this.timer2=setTimeout((()=>{
                            videojs("video").play();
                        }),500)
                    }),1000)
                } else {
                    this.videoVisible = false;
                    videojs("video").src("");
                    videojs("video").play();
                }
            }
        },
        beforeDestroy() {
            this.uploadDeviceIfo(this.deviceId, '', false);
            localStorage.removeItem("changeId");

        },
        methods: {
            connect() {
                try {
                    console.log("开始连接");
                    this.socket = new SockJS(`${location.origin}/notify`, null, {
                        transports: ["websocket"]
                    });
                    this.client = Stomp.over(this.socket);
                    this.client.heartbeat.outgoing = 0;
                    this.client.heartbeat.incoming = 0;
                    this.client.connect({}, frame => {
                        this.client.subscribe("/topic/realtime", message => {
                            var frames = JSON.parse(message.body);
                            let img = frames.imageUrl
                                ? frames.imageUrl
                                : "data:image/jpeg;base64," + frames.imageData;
                            let address = frames.device.name
                                ? frames.device.name
                                : frames.device.ip;
                            this.data.unshift({
                                img: img,
                                date: frames.date,
                                address: address
                            });
                            this.sceneImg = frames.sceneImageUrl ? frames.sceneImageUrl : "data:image/jpeg;base64," + frames.sceneImageData;
                            this.sceneImgVisible = (frames.sceneImageUrl || frames.sceneImageData) ? true : false;
                            console.log(this.sceneImgVisible)
                            if (this.data.length >= 100) {
                                this.data.pop();
                            }
                        });
                    });
                } catch (e) {
                    console.log("connect error,reconnect...");
                    this.reconnect();
                }
                this.socket.onclose = evnt => {
                    console.log("连接关闭");
                    this.reconnect();
                };
                this.socket.onerror = evnt => {
                    console.log("websocket server error.");
                    this.reconnect();
                };
            },
            reconnect() {
                if (this.lockReconnect) return false;
                this.socket && this.socket.close();
                this.client && this.client.disconnect();
                if (this.reTryTime > this.reTryMaxTime) {
                    this.client = null;
                    return;
                }
                this.reTryTime++;
                console.log("reconnect...");
                //没连接上会一直重连，设置延迟避免请求过多
                clearTimeout(this.clientHandle);
                this.clientHandle = setTimeout(() => {
                    this.connect();
                }, 2000);
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
                    .then(res => {
                    });
            },
            deviceUpdate() {
                if (this.upDeviceName != "" && this.upDeviceId != '' && this.upFactoryName != "" && this.upFactoryId != '') {
                    this.deviceInfo.deviceCategoryName = this.upDeviceName;
                    this.deviceInfo.deviceCategoryId = this.upDeviceId;
                    this.deviceInfo.factoryName = this.upFactoryName;
                    this.deviceInfo.factoryId = this.upFactoryId;
                }
                Api.deviceUpdate.post(this.deviceInfo, {}).then(res => {
                    this.$message({message: "修改成功", type: "success"});
                    Bus.$emit('demo', 'msg');
                });
            },
            getDeviceCategoryList() {
                Api.getDeviceCategoryList.get(this.deviceInfo, {}).then(res => {
                    this.deviceCategory = res.data.result;
                });
            },
            getFactoryList() {
                Api.getFactoryList.get(this.deviceInfo, {}).then(res => {
                    this.factoryList = res.data.result;
                });
            },
            scrollFunc: function (dir) {
                const item = document.querySelector(".personImg-item");
                const wrapper = document.querySelector(".personImg-inner");
                let width = document.querySelector(".personImg-wrapper").offsetWidth;
                let str = wrapper.style.getPropertyValue("transform") || "translateX(0)";
                let translate = parseFloat(str.match(/\(([^)]*)\)/)[1]);
                let itemWidth =
                    parseFloat(getComputedStyle(item).width) +
                    parseFloat(getComputedStyle(item).marginRight);

                if (dir == 2) {
                    if (itemWidth * this.data.length > Math.abs(translate) + width) {
                        wrapper.style.transform = `translateX(${translate - width}px)`;
                    }
                } else if (dir == 1) {
                    if (translate < 0) {
                        wrapper.style.transform = `translateX(${translate + width}px)`;
                    }
                }
            },
            deviceCategoryState(value) {
                for (var i = 0; i < this.deviceCategory.length; i++) {
                    if (value == this.deviceCategory[i].value) {
                        this.upDeviceName = this.deviceCategory[i].label;
                        this.upDeviceId = value * 1;
                    }

                }
            },

            factoryListState(value) {
                for (var i = 0; i < this.factoryList.length; i++) {
                    if (value == this.factoryList[i].value) {
                        this.upFactoryName = this.factoryList[i].label;
                        this.upFactoryId = value * 1;
                    }
                }
            }
        },
        beforeRouteLeave(to, form, next) {
            this.socket && this.socket.close();
            this.client && this.client.disconnect();
            this.lockReconnect = true;
            videojs('video').dispose()
            next();
        }
    };
</script>

<style lang="less" scoped>
    .index {
        height: 100%;
        .index-l {
            height: 100%;
            box-sizing: border-box;
            background: #0c2344;
            padding: 0.2rem;
            .video-box {
                height: calc(100% - 2.12rem);
                background: #000000;
                overflow: hidden;
                .empty-videoImg {
                    width: 1.01rem;
                    height: 0.92rem;
                    margin: 0 auto;
                }
                .sceneImg {
                    display: block;
                    width: 100%;
                    height: auto;
                    background-size: contain;
                }
                .video-js {
                    width: 100%;
                    height: 100%;
                }
            }
            .personImg {
                position: relative;
                margin-top: 0.19rem;
                height: 1.93rem;
                background: rgba(0, 168, 252, 0.1);
                .prev,
                .next {
                    height: 1.93rem;
                    line-height: 1.93rem;
                    width: 0.26rem;
                    background: #00a8fc;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    &:hover {
                        background: #2886f2;
                    }
                    i {
                        color: #ffffff;
                        font-size: 0.25rem;
                        font-weight: bold;
                    }
                }
                .personImg-wrapper {
                    height: 1.93rem;
                    margin: 0 0.18rem;
                    overflow: hidden;

                    .personImg-inner {
                        width: auto;
                        white-space: nowrap;
                        transition: all 0.5s;
                        transform: translateX(0);

                        &::-webkit-scrollbar {
                            /*滚动条整体样式*/
                            height: 5px;
                        }
                        &::-webkit-scrollbar-thumb {
                            /*滚动条里面小方块*/
                            border-radius: 0px;
                            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                            background: #00a8fc;
                        }
                        &::-webkit-scrollbar-track {
                            /*滚动条里面轨道*/
                            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                            border-radius: 0px;
                            background: #1b4d87;
                        }
                        .personImg-item {
                            width: 1.2rem;
                            display: inline-block;
                            margin-right: 0.15rem;
                            img {
                                display: block;
                                width: 1.2rem;
                                height: 1.4rem;
                                object-fit: cover;
                            }
                            .personImg-item-des {
                                margin-top: 0.1rem;
                                text-align: left;
                                p {
                                    font-size: 0.12rem;
                                    color: #a2cefa;
                                    line-height: 1;
                                    &:last-child {
                                        margin-top: 0.05rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .index-r {
            height: 100%;
            box-sizing: border-box;
            background: #0c2344;
            overflow: auto;
            &::-webkit-scrollbar {
                /*滚动条整体样式*/
                height: 5px;
                width: 5px;
            }
            &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 0px;
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #00a8fc;
            }
            &::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 0px;
                background: #1b4d87;
            }
            .title {
                box-sizing: border-box;
                height: 0.54rem;
                padding: 0.2rem;
                color: #ffffff;
                font-size: 0.18rem;
                background: #2886f2;
                span {
                    display: inline;
                    font-size: 12px;
                    font-family: "TT0142M_";
                    padding-left: 0.06rem;
                }
            }
            .index-r-con {
                box-sizing: border-box;
                margin-top: 0rem;
                padding: 0.22rem 0.2rem;
                .form-item {
                    width: 100%;
                    margin-bottom: 0.17rem;
                    height: 0.39rem;
                    border: 1px solid rgba(27, 115, 214, 1);
                    border-radius: 0.04rem;
                    .form-item__label {
                        width: 1rem;
                        line-height: 0.39rem;
                        color: #2886f2;
                        font-size: 0.13rem;
                        position: relative;
                        text-align: center;
                        float: left;
                        &:before {
                            content: "";
                            position: absolute;
                            width: 1px;
                            height: 0.13rem;
                            right: 0;
                            top: 0.13rem;
                            background: #2886f2;
                        }
                    }
                    .form-item__content {
                        margin-left: 1rem;
                        /deep/ input {
                            width: 100%;
                            -webkit-appearance: none;
                            background: transparent;
                            border: none;
                            box-sizing: border-box;
                            color: #c5e0ff;
                            font-size: 0.13rem;
                            height: 0.39rem;
                            line-height: 0.39rem;
                            outline: none;
                            padding: 0 0.14rem;
                        }
                        /deep/ .el-input__icon {
                            line-height: 0.39rem;
                        }
                    }
                }
                .form-textarea {
                    .form-item__label {
                        color: #2886f2;
                        font-size: 0.13rem;
                        position: relative;
                        text-align: left;
                        margin-bottom: 0.12rem;
                    }
                    .form-item__textarea {
                        border: 1px solid rgba(27, 115, 214, 1);
                        border-radius: 0.04rem;
                        /deep/ textarea {
                            width: 100%;
                            -webkit-appearance: none;
                            background: transparent;
                            border: none;
                            box-sizing: border-box;
                            color: #c5e0ff;
                            font-size: 0.13rem;
                            outline: none;
                            padding: 0.15rem;
                        }
                    }
                }
                .form-submit {
                    margin-top: 0.2rem;
                    .button {
                        width: 50%;
                        height: 0.26rem;
                        line-height: 0.26rem;
                        text-align: center;
                        border-radius: 0.04rem;
                        border: 1px solid #466294;
                        color: #ffffff;
                        font-size: 0.12rem;
                        cursor: pointer;
                        transition: all 0.3s;
                        &.button--primary {
                            background: #2886f2;
                            border-color: #2886f2;
                            &:hover {
                                background: #00a8fc;
                                border-color: #00a8fc;
                            }
                        }
                        &.button--default {
                            background: transparent;
                            &:hover {
                                color: #00a8fc;
                            }
                        }
                    }
                    .button + .button {
                        margin-left: 0.13rem;
                    }
                }
            }
        }
    }
</style>
