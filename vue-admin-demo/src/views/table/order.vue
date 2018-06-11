<template>
    <div class="app-container">
        <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
        </el-input>
        <!-- <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
            </el-option>
        </el-select>
        <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">
            <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
            </el-option>
        </el-select>  -->
        <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
            <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
        </el-select>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <!-- <el-button class="filter-item" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">添加</el-button> -->
        <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button>
        <!-- <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox> -->
        </div>

        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
        style="width: 100%">
        <el-table-column align="center" label="订单号" width="130">
            <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{scope.row.billno}}</span>
            </template>
        </el-table-column>
        <el-table-column width="160px" align="center" label="下单日期">
            <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{scope.row.createtime | timeFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="收货地">
            <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{scope.row.province + '-' + scope.row.city}}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column min-width="110px" label="订单信息">
            <template slot-scope="scope">
            <span class="link-type" >{{scope.row.description}}</span>
            </template>
        </el-table-column> -->
        <el-table-column width="80px" label="交易额">
            <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">￥{{scope.row.fee}}</span>
            </template>
        </el-table-column>      
        <!-- <el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">
            <template slot-scope="scope">
            <span style='color:red;'>{{scope.row.reviewer}}</span>
            </template>
        </el-table-column> -->
        <el-table-column width="80px" label="付款状态">
            <template slot-scope="scope">
            <el-tag :type="scope.row.fkstatus | statusFilter">{{fkstatusType[scope.row.fkstatus]}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="发货状态" width="95">
            <template slot-scope="scope">
                <el-button  size="mini"  :type="scope.row.ifsend | statusFilter"  @click="handleModifyIfsend(scope.row)">{{ifsendType[scope.row.ifsend]}}</el-button>
            </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" width="80">
            <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{statusType[scope.row.status]}}</el-tag>
            </template>
        </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>



        <el-dialog :title="temp.billno + '' " :visible.sync="dialogVisible">
            <span>姓名：{{temp.name}} TEL:{{temp.tel}}</span>
            <span>{{temp.createtime}}</span>
            <span>{{temp.province}}-{{temp.city}}-{{temp.district}}</span>
            <span>{{temp.detail}}</span>
            <el-table :data="billData" border fit highlight-current-row style="width: 100%">
                <el-table-column prop="pid" label="编号"> </el-table-column>
                <el-table-column prop="productname" label="商品名称"> </el-table-column>
                <el-table-column prop="price" label="单价"> </el-table-column>
                <el-table-column prop="number" label="数量"> </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确认</el-button>
            </span>
        </el-dialog>


    </div>


    
</template>

<script>
/* eslint-disable */
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import * as order from '@/api/order'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, timeFormatter } from '@/utils'


export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      ifsendType: ['已发货','已收货','未发货'],
      fkstatusType: ['未付款','已付款'],
      statusType: ['退单','正常','退单中'],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      dialogVisible: false,
      billData: [],
      downloadLoading: false,
      temp:''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = ['info','success','danger']
      return statusMap[status]
    },
    timeFilter(time) {
      if (time) {
        time = timeFormatter(time);
      }
      return time
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      order.fetchList(this.listQuery).then(response => {
        this.list = response.items
        this.total = response.total
        this.listLoading = false
        console.log(this.list)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetTemp() {
      this.temp = {
        pid: undefined,
        remark: '',
        timestamp: new Date(),
        description: '',
        isuse: '发布',
        type: ''
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    async handleDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.createtime = timeFormatter(this.temp.createtime)
      let data = {
          billno: this.temp.billno
      }
      let res = await order.productList(data);
      this.billData = res;
      this.dialogVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    },
    async handleModifyIfsend(row) {
      if(row.ifsend == 2)
      {
        let sendDialgo = await this.$prompt('请输入快递单号', '提示', {
                                          confirmButtonText: '确认发货',
                                          cancelButtonText: '取消',
                                        });
        try {
          console.log(sendDialgo)
           row.ifsend = 1
           this.$message({
            type: 'success',
            message: '发单成功: ' + sendDialgo.value
          });

        } catch (error) {
          this.$message({
            type: 'info',
            message: '取消发单'
          });    
        }

      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>