<template>
    <div class="list "  ref="content">
      <div class=" list_header ">
          <el-input
            placeholder="请输入设备名"
            prefix-icon="el-icon-search"
            v-model="filter.name"
            size="small"
            clearable
            style="color:#fff"
            >
        </el-input>
        <el-button type="primary" size="small" class="btn" @click="getDeviceList()" >查询</el-button>
      </div>
      <div class=" list_content">
        <div class="" >
            <div class="tableBox" >
              <el-table
               :data="tableData" 
               style="width: 100%;background-color: transparent;" 
               :cell-style="changeCellStyle"
                :height='tabHeight' 
                :max-height="tabHeight" >
                <el-table-column prop="organName"  label="编号" align='center' type="index"></el-table-column>
                <el-table-column prop="name" label="名称" align='center'></el-table-column>
                <el-table-column prop="status" label="状态" align='center' >
                      <template slot-scope="scope" >
                   {{scope.row.status|deviceState}}
                  </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="最后一次上报时间" align='center'>
                      <template slot-scope="scope" >
                   {{scope.row.updateTime | daterful('YYYY-MM-DD HH:mm:ss')}}
                  </template>
                </el-table-column>
                <el-table-column prop="deviceTypeName" label="设备类型" align='center'>
                </el-table-column>
                <el-table-column  label="操作" align='center' width="250">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini"  @click="realtimeView(scope.row)" v-if="scope.row.status == 1">实时查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pageBox">
                <span class="demonstration">15页/条</span>
                <el-pagination  @current-change="pageChange" background layout="prev, pager, next, total,jumper" :total='total' :page-size='filter.pageSize' :current-page='filter.pageNumber'></el-pagination>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import Api from "@/common/api.js";
export default {
  data() {
    return {
      tabHeight: "0",
      tableData: [],
      total: 0,
      filter: {
        pageNumber: 1,
        pageSize: 15,
        name:"",
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tabHeight = this.$refs.content.offsetHeight - 124;

      window.onresize = () => {
        this.tabHeight = this.$refs.content.offsetHeight - 124;
      };
    });
    this.getDeviceList()
  },
  methods: {
    getDeviceList(){
       Api.getDeviceList
        .post(this.filter, {})
        .then(res => {
          this.tableData = res.data.result.records
          this.total = res.data.result.totalElements
        })
    },
    realtimeView(row){
      this.$router.push({ path: '/video', query: { deviceInfo: row }});
    },
    //分页
    pageChange(val) {
      this.filter.pageNumber = val;
        this.getDeviceList();
    },
    // 修改table的样式
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === "状态") {
          if(row.row.status == '1'){
             return "color: #1fc8c2"
          }else if(row.row.status == '0'){
             return "color: red"; 
          }
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="less" >
.list {
  height: 100%;
     &:after {
      content: "";
      display: block;
      height: 0;
      clear: both;
    }
  .list_header {
    width: 2.2rem;
    float: right;
    display: flex;
    align-content: space-around;
    margin-bottom: 0.14rem;
   
    .btn {
      margin-left: 0.2rem;
      background-color: transparent !important;
      border-color: #fff;
    }
  }
  .list_content {
    height: 100%;
    background: rgba(#08182d, 0.4);
    .tableBox {
      .pageBox {
        padding: 0.3rem 0;
        display: flex;
        justify-content: center;
        .demonstration {
          color: #606266;
          line-height: 0.32rem;
        }
      }
    }
  }
}

.el-input__inner {
  background-color: transparent !important;
  border-color: #fff;
  color: #fff
}
.el-table {
  border-bottom: transparent !important;
  color: #fff;
}
.el-table__body tr:hover > td {
  background-color: #092851 !important;
}
.el-table thead {
  background-image: linear-gradient(to right, #025dcd, #544ecd);
  color: #fff;
}
.el-table td,
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #0d2c46;
}
.el-table th,
.el-table tr {
  background-color: transparent;
}
.el-table::before {
  background-color: transparent !important;
}
</style>