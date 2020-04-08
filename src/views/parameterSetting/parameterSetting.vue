<template>
    <div class="parameterSetting" style="width:100%">
        <el-row type="flex" class="row-bg parameter_title" >
            <el-col :span="8" class="parameter_title_icon_f "  :class="index==1?'active':''" >
                <div class="parameter_title_icon  flex "  @click="showFrom(1)">
                    <img src="../../assets/image/parameter/1.png" alt="">
                </div>
                <p class="system">系统参数</p>
                <p>PARAMETER SETTING</p>
            </el-col>
            <el-col :span="8" class="parameter_title_icon_f" :class="index==2?'active':''" >
                <div class="parameter_title_icon  flex" @click="showFrom(2,1)">
                    <img src="../../assets/image/parameter/2.png" alt="">
                </div>
                <p class="protocol">1400协议</p>
                <P>GB1400 PROTOCOL</P>
            </el-col>
            <el-col :span="8" class="parameter_title_icon_f" :class="index==3?'active':''">
                <div class="parameter_title_icon  flex"  @click="showFrom(3,2)">
                    <img src="../../assets/image/parameter/3.png" alt="">
                </div>
                <p  class="sdk">SDK接入</p>
                <P>SOFTWARE DEVELOPMENT KIT</P>
            </el-col>
            <el-col :span="8" class="parameter_title_icon_f" :class="index==4?'active':''">
              <div class="parameter_title_icon  flex"  @click="showFrom(4,2)">
                  <img src="../../assets/image/parameter/4.png" alt="">
              </div>
              <p  class="sdk">RPC接入</p>
              <P>REMOTE PROCEDURE CALL</P>
          </el-col>
        </el-row>
        <el-row class="row-bg parameter_content">
          <div class="systemFromBox" v-if="index==1">
                <el-form :label-position="labelPosition" label-width="80px" :model="systemParam" class="systemFrom" ref="systemParam">
                    <el-form-item label="管理账号" prop="logonName">
                        <label  class="icon">●</label>
                        <el-input v-model="systemParam.logonName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  prop="password">
                         <label  class="icon">●</label>
                        <el-input v-model="systemParam.password"></el-input>
                    </el-form-item>
                    <el-form-item label="最大连接数" prop="maxConnectionNumber">
                         <label  class="icon">●</label>
                        <el-input v-model="systemParam.maxConnectionNumber"></el-input>
                    </el-form-item>
                    <div class="btnBox sysbtnBox" >
                      <img src="../../assets/sure.png" @click="systemParamSet()">
                         <!-- <el-button type="primary" plain class="closeBtn" size="mini"  @click="resetForm('systemParam')">取消</el-button> -->
                    </div>
                
                </el-form>
          </div>
          <div class="protocolFromBox" v-if="index==2">
              <div class="choose">
                  <span  class="Checkbox" :class="checked == showExpert1 ?'checked':''" @click="select(2,1)"></span><span>专家模式</span>
              </div>
              <!-- 1400普通 -->
             <el-form :label-position="labelPosition" label-width="80px" :model="saveNormal" class="protocolFrom" ref="saveNormal" v-if="showNormal1">
                   <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="账号" prop="account">
                                <label  class="icon">●</label>
                                <el-input v-model="saveNormal.account"></el-input>
                            </el-form-item>
                            <el-form-item label="对外服务端口" prop="sourcesPort">
                                <label  class="icon">●</label>
                                <el-input v-model="saveNormal.sourcesPort"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="密码" prop="password">
                                <label  class="icon">●</label>
                                <el-input v-model="saveNormal.password"></el-input>
                            </el-form-item>
                            <el-form-item label="提取的数据类型" prop="extractDataType">
                                <label  class="icon">●</label>
                                  <el-select v-model="saveNormal.extractDataType" placeholder="请选择活动区域">
                                    <el-option v-for="(item,index) in extractDataType" :key="index"
                                            :label="item.label"
                                            :value="item.id">
                                  </el-option>
                                  </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="kafka集群地址配置" prop="servers">
                         <label  class="icon">●</label>
                        <el-input v-model="saveNormal.servers"></el-input>
                    </el-form-item>
                    <p class="Topic">半结构化采集/全结构化采集主题名称</p>
                     <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="人脸接收主题" prop="faceTopic">
                                <label  class="icon">●</label>
                                <el-input v-model="saveNormal.faceTopic"></el-input>
                            </el-form-item>
                            <el-form-item label="车辆接收主题" prop="vehicleTopic">
                                <label  class="icon">●</label>
                                <el-input v-model="saveNormal.vehicleTopic"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="人形接收主题" prop="personTopic">
                                <label  class="icon">●</label>
                                <el-input v-model="saveNormal.personTopic"></el-input>
                            </el-form-item>
                            <el-form-item label="机非人接收主题" prop="nonMotorTopic">
                                <label  class="icon">●</label>
                                <el-input v-model="saveNormal.nonMotorTopic"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="btnBox">
                      <img src="../../assets/sure.png" @click="dialogVisible = true">
                         <!-- <el-button type="primary" class="sureBtn" size="mini" @click="dialogVisible = true">确认</el-button> -->
                         <!-- <el-button type="primary" plain class="closeBtn" size="mini" @click="resetForm('saveNormal')">取消</el-button> -->
                    </div>
                
            </el-form>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="25%"
              top="2.4rem"
             >
              <span>是否确定修改？</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary"  @click="saveNormalBtn(1)">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
            </el-dialog>
            <!-- 1400专家 -->
             <el-form :label-position="labelPosition" label-width="80px" :model="saveExpert" class="protocolFrom" ref="saveExpert" v-if="showExpert1">
                    <el-form-item label="发送地址" prop="content">
                          <label  class="icon">●</label>
                        <editor-bar v-model="saveExpert.content" :isClear="isClear" @change="change"></editor-bar>
                    </el-form-item>
                     
                    <div class="btnBox">
                      <img src="../../assets/sure.png" @click="dialogVisible1 = true">>
                         <!-- <el-button type="primary" class="sureBtn" size="mini" @click="dialogVisible1 = true">确认</el-button> -->
                         <!-- <el-button type="primary" plain class="closeBtn" size="mini" @click="resetForm('saveExpert')">取消</el-button> -->
                    </div>
            </el-form>
             <el-dialog
              title="提示"
              :visible.sync="dialogVisible1"
              width="25%"
              top="2.4rem"
            >
              <span>是否确定修改？</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary"   @click="saveExpertBtn(1)">确 定</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
              </span>
            </el-dialog>
          </div>
          <div class="sdkFromBox" v-if="index==3">
              <div class="choose">
                  <span  class="Checkbox" :class="checked == showExpert2 ?'checked':''" @click="select(3,2)"></span><span>专家模式</span>
              </div>
              <!-- sdk普通 -->
             <el-form :label-position="labelPosition" label-width="80px" :model="saveNormal" class="sdkFrom sdkFromNormal"  ref="saveNormal" v-if="showNormal2">
                            <el-form-item label="对外服务端口" prop="sourcesPort">
                                <label  class="icon">●</label>
                                <el-input v-model="saveNormal.sourcesPort"></el-input>
                            </el-form-item>
                             <el-form-item label="kafka集群地址配置" prop="servers">
                         <label  class="icon">●</label>
                        <el-input v-model="saveNormal.servers"></el-input>
                    </el-form-item>
                    <p class="Topic">接收主题配置</p>
                            <el-form-item label="人脸接收主题" prop="kafkaTopic">
                                <label  class="icon">●</label>
                                <el-input v-model="saveNormal.kafkaTopic"></el-input>
                            </el-form-item>
                    <div class="btnBox">
                      <img src="../../assets/sure.png" @click="dialogVisible = true">
                      
                         <!-- <el-button type="primary" class="sureBtn" size="mini" @click="dialogVisible = true">确认</el-button> -->
                         <!-- <el-button type="primary" plain class="closeBtn" size="mini" @click="resetForm('saveNormal')">取消</el-button> -->
                    </div>
            </el-form>
            <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="25%"
            top="2.4rem"
            >
                <span>是否确定修改？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary"  @click="saveNormalBtn(2)">确 定</el-button>
                  <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
            <!-- sdk专家 -->
             <el-form :label-position="labelPosition" label-width="80px" :model="saveExpert" class="sdkFrom" ref="saveExpert" v-if="showExpert2">
                    <el-form-item label="发送地址" prop="content">
                          <label  class="icon">●</label>
                        <editor-bar v-model="saveExpert.content" :isClear="isClear" @change="change"></editor-bar>
                    </el-form-item>
                    <div class="btnBox">
                      <img src="../../assets/sure.png" @click="dialogVisible1 = true">
                      
                         <!-- <el-button type="primary" class="sureBtn" size="mini" @click="dialogVisible1 = true">确认</el-button> -->
                         <!-- <el-button type="primary" plain class="closeBtn" size="mini"  @click="resetForm('saveExpert')">取消</el-button> -->
                    </div>
            </el-form>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible1"
              width="25%"
              top="2.4rem"
              >
              <span>是否确定修改？</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveExpertBtn(2)">确 定</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
              </span>
            </el-dialog>
          </div>
          <div class="rpcFromBox" v-if="index==4">
              <div class="choose">
                  <span  class="Checkbox" :class="checked == showExpert3 ?'checked':''" @click="select(4,2)"></span><span>专家模式</span>
              </div>
              <!-- rpc普通 -->
             <el-form :label-position="labelPosition" label-width="80px" :model="saveNormal" class="rpcFrom rpcFromNormal"  ref="saveNormal" v-if="showNormal3">
                    <el-form-item label="采集类型" prop="collectTypes">
                        <label  class="icon">●</label>
                         <el-select v-model="saveNormal.collectType">
                                    <el-option v-for="(item,index) in collectType" :key="index"
                                               :label="item.value"
                                               :value="item.code">
                                    </el-option>
                                
                                </el-select>
                    </el-form-item>
                    <el-form-item label="对外接口"  prop="sourcesPort">
                         <label  class="icon">●</label>
                        <el-input v-model="saveNormal.sourcesPort"></el-input>
                    </el-form-item>
                    <el-form-item label="kafka地址" prop="servers">
                         <label  class="icon">●</label>
                        <el-input v-model="saveNormal.servers"></el-input>
                    </el-form-item>
                     <el-form-item label="kafka接受地址" prop="kafkaTopic">
                         <label  class="icon">●</label>
                        <el-input v-model="saveNormal.kafkaTopic"></el-input>
                    </el-form-item>
                    <div class="btnBox">
                       <img src="../../assets/sure.png" @click="dialogVisible = true">
                         <!-- <el-button type="primary" class="sureBtn" size="mini" @click="dialogVisible = true">确认</el-button> -->
                         <!-- <el-button type="primary" plain class="closeBtn" size="mini"  @click="resetForm('saveNormal')">取消</el-button> -->
                    </div>
            </el-form>
             <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="25%"
              top="2.4rem"
              >
              <span>是否确定修改？</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveNormalBtn(3)">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
            </el-dialog>
            <!-- rpc专家 -->
             <el-form :label-position="labelPosition" label-width="80px" :model="saveExpert" class="rpcFrom" ref="saveExpert" v-if="showExpert3">
                    <el-form-item label="发送地址" prop="content">
                          <label  class="icon">●</label>
                        <editor-bar v-model="saveExpert.content" :isClear="isClear" @change="change"></editor-bar>
                    </el-form-item>
                    <div class="btnBox">
                       <img src="../../assets/sure.png" @click="dialogVisible1 = true">
                         <!-- <el-button type="primary" class="sureBtn" size="mini" @click="dialogVisible1 = true">确认</el-button> -->
                         <!-- <el-button type="primary" plain class="closeBtn" size="mini"  @click="resetForm('saveExpert')">取消</el-button> -->
                    </div>
                
            </el-form>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisible1"
                width="25%"
                top="2.4rem"
              >
                <span>是否确定修改？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="saveExpertBtn(3)">确 定</el-button>
                  <el-button @click="dialogVisible1 = false">取 消</el-button>
                </span>
            </el-dialog>
          </div>
        </el-row>
    </div>
</template>

<script>
import Api from "@/common/api.js";
import EditorBar from "@/components/tinymce.vue";
export default {
  components: { EditorBar },
  data() {
    return {
      labelPosition: "top",
      isClear: false,
      index: 1,
      showNormal1: true,
      showExpert1: false,
      showNormal2: true,
      showExpert2: false,
      showNormal3: true,
      showExpert3: false,
      expertFlag: false,
      expertFlagSdk: true,
      systemParam: {},
      saveNormal: {
        type: 1,
        account: "",
        sourcesPort: "",
        password: "",
        servers: "",
        faceTopic: "",
        vehicleTopic: "",
        personTopic: "",
        nonMotorTopic: "",
        extractDataType: 1,
        collectType: 0
      }, //普通
      saveExpert: {
        type: 1,
        content: ""
      }, //专家
      extractDataType: [
        { id: 1, label: "全结构化数据" },
        { id: 0, label: "半结构化数据" }
      ],
      collectType: [],
      checked: true,
      dialogVisible: false,
      dialogVisible1: false
    };
  },
  mounted() {
    this.getSystemParam();
  },
  methods: {
    showFrom(index, type) {
      var params = {};
      this.index = index;
      if (index == 1) {
        this.getSystemParam();
      } else if (index == 2) {
        this.showNormal1 = true;
        this.showExpert1 = false;
        this.getNormal(1);
      } else if (index == 3) {
        this.showNormal2 = true;
        this.showExpert2 = false;
        this.getNormal(2);
      } else if (index == 4) {
        this.showNormal3 = true;
        this.showExpert3 = false;
        this.getNormal(3);
      }
    },
    select(index, type) {
      if (index == 2) {
        //1400
        this.showNormal1 = !this.showNormal1;
        this.showExpert1 = !this.showExpert1;
        this.getExpert(1);
      } else if (index == 3) {
        //sdk
        this.showNormal2 = !this.showNormal2;
        this.showExpert2 = !this.showExpert2;
        this.getExpert(2);
      } else if (index == 4) {
        //RPC
        this.showNormal3 = !this.showNormal3;
        this.showExpert3 = !this.showExpert3;
        this.getExpert(3);
      }
    },
    change(val) {},
    getSystemParam() {
      Api.getSystemParam.get().then(res => {
        this.systemParam = res.data.result;
      });
    },
    systemParamSet() {
      Api.systemParamSet.post(this.systemParam).then(res => {
        this.$message({ message: "修改成功", type: "success" });
      });
    },
    //普通
    saveNormalBtn(type) {
      this.saveNormal.type = type;
      //新增
      Api.saveNormal
        .post(
          {},
          {
            params: {
              type: this.saveNormal.type,
              account: this.saveNormal.account,
              password: this.saveNormal.password,
              sourcesPort: this.saveNormal.sourcesPort,
              extractDataType: this.saveNormal.extractDataType,
              collectType: this.saveNormal.collectType,
              servers: this.saveNormal.servers,
              faceTopic: this.saveNormal.faceTopic,
              personTopic: this.saveNormal.personTopic,
              vehicleTopic: this.saveNormal.vehicleTopic,
              nonMotorTopic: this.saveNormal.nonMotorTopic,
              kafkaTopic: this.saveNormal.kafkaTopic
            }
          }
        )
        .then(res => {
          this.dialogVisible = false;
          this.$message({ message: "修改成功", type: "success" });
        });
    },
    //专家
    saveExpertBtn(type) {
      // debugger
      this.saveExpert.type = type;
      //新增
      Api.saveExpert
        .post(
          {},
          {
            params: {
              type: this.saveExpert.type,
              content: this.saveExpert.content
            }
          }
        )
        .then(res => {
          this.dialogVisible1 = false;
          this.$message({ message: "修改成功", type: "success" });
        });
    },
    //取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询普通
    getNormal(type) {
      Api.getNormal.get({ type: type }, {}).then(res => {
        this.saveNormal = res.data.result;
        this.collectType = this.saveNormal.collectTypes;
      });
    },
    //查询专家
    getExpert(type) {
      Api.getExpert.get({ type: type }, {}).then(res => {
        this.saveExpert.content = res.data.result.content;
      });
    }
  }
};
</script>

<style lang="less" >
.parameterSetting {
  .parameter_title {
    .parameter_title_icon_f {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        color: #5e9ce2;
      }
      .system,
      .protocol,
      .sdk {
        font-size: 0.2rem;
        font-family: PangMenZhengDao;
        margin: 0.08rem 0;
      }
      .parameter_title_icon {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 0.1rem;
        background-color: #5e9ce2;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .parameter_content {
    .systemFromBox,
    .protocolFromBox,
    .sdkFromBox,
    .rpcFromBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 0.44rem;
      .systemFrom,
      .protocolFrom,
      .sdkFrom,
      .rpcFrom {
        width: 4rem;
        .icon {
          color: #2786f2;
          position: absolute;
          top: 0;
          left: 0.1rem;
        }
        .btnBox {
          display: flex;
          justify-content: space-between;
          .sureBtn,
          .closeBtn {
            width: 1.82rem;
          }
          .closeBtn {
            background: transparent;
            color: #fff;
          }
        }
        .sysbtnBox{
           display: flex;
          justify-content: center;
          img{
            cursor: pointer;
          }
        }
      }
    }
    .protocolFromBox,
    .sdkFromBox,
    .rpcFromBox {
      margin-top: 0.32rem;
      .el-form-item {
        margin-bottom: 0.16rem;
      }
      .choose {
        align-self: flex-end;
        margin-right: 3rem;
        color: #fff;
        .Checkbox {
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          border: 0.01rem solid #fff;
          border-radius: 50%;
          background: #dedede;
          margin-right: 0.1rem;
          cursor: pointer;
        }
        .el-radio,
        .el-radio__input.is-checked + .el-radio__label {
          color: #fff;
        }
      }
      .protocolFrom,
      .sdkFrom,
      .rpcFrom {
        width: 8rem;
        .el-form-item__label {
          line-height: 0.2rem;
        }
        p {
          color: #fff;
          font-size: 0.14rem;
        }
        .Topic {
          color: #2786f2;
          font-size: 0.18rem;
          margin-bottom: 0.1rem;
        }
        .btnBox {
          display: flex;
          justify-content: center;
          img{
            cursor: pointer;
          }
          // margin-top: 0.32rem;
        }
      }
    }
    .protocolFromBox {
      margin-top: 0.02rem;
    }

    .el-input__inner,
    .el-textarea__inner {
      background-color: transparent;
      border-color: #2786f2;
      padding: 0 0.3rem;
      color: #fff;
    }

    .el-input__inner:hover,
    .el-textarea__inner:hover {
      border-color: #2786f2;
    }
    .el-select .el-input__inner:hover {
      border-color: #2786f2;
    }
    .el-form--label-top .el-form-item__label {
      padding: 0 0 0.1rem 0;
      color: #2786f2;
    }
    .el-select > .el-input {
      width: 3.84rem !important;
    }
    .el-textarea__inner {
      min-height: 2.5rem !important;
      padding-top: 0.1rem;
    }
    .w-e-text {
      padding: 0 0 0 0.26rem !important;
      overflow: auto;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        height: 5px;
        width: 6px;
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
    }
  }
  .rpcFrom {
    margin: 0 auto;
    // width:100px ;
  }
}
.active {
  .parameter_title_icon {
    background: #2786f2 !important;
  }
  .protocol,
  .system,
  .sdk {
    font-family: none !important;
    font-weight: bold;
  }
  p {
    color: #2786f2 !important;
  }
}
.checked {
  background: #2786f2 !important;
}

.parameterSetting .parameter_content .protocolFromBox .protocolFrom p {
  color: #fff;
  font-size: 0.14rem;
}
.rpcFromNormal,
.sdkFromNormal {
  width: 4rem !important;
}
.el-dialog {
  background: rgba(#092851);
}
.el-dialog__title,
.el-dialog__body {
  color: #fff;
}
</style>