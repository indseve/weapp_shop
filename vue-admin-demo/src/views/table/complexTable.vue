<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
      </el-input>
      <!-- <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select> -->
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button>
      <!-- <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox> -->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="商品编号" width="65">
        <template slot-scope="scope">
          <span @click="handleDetail(scope.row)">{{scope.row.pid}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="发布日期">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span> -->
          <span @click="handleDetail(scope.row)">{{scope.row.createtime | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="商品名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" label="商品信息">
        <template slot-scope="scope">
          <span class="link-type" @click="handleDetail(scope.row)">{{scope.row.description.slice(0,15)}}……</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="类别">
        <template slot-scope="scope">
          <span><el-tag>{{scope.row.type | typeFilter}}</el-tag></span>
        </template>
      </el-table-column>      
      <el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">
        <template slot-scope="scope">
          <span style='color:red;'>{{scope.row.reviewer}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="单价">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="库存" width="95">
        <template slot-scope="scope">
                   <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isuse | statusFilter">{{isuseType[scope.row.isuse]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.isuse!=1" size="mini" type="success" @click="handleModifyIsuse(scope.row,1)">发布
          </el-button>
          <el-button v-if="scope.row.isuse!=0" size="mini" @click="handleModifyIsuse(scope.row,0)">草稿
          </el-button>
          <el-button v-if="scope.row.isuse!=2" size="mini" type="danger" @click="handleModifyIsuse(scope.row,2)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="temp.pid + '-' + temp.name" :visible.sync="dialogFormVisible" width="30%">
        <el-tag style="float:right">{{temp.type | typeFilter}}</el-tag>
        <img :src="temp.image" class="image">
        <div style="padding: 14px;">                 
          <p style="">单价：￥{{temp.price}}<el-tag style="float:right">{{temp.type | typeFilter}}</el-tag> </p>          
          <div class="bottom clearfix">            
            <el-tabs type="border-card">
              <el-tab-pane label="商品详情">
                <p class="detail">{{temp.description}}</p>
              </el-tab-pane>
              <el-tab-pane label="售后服务">
                <p class="detail">{{temp.service}}</p>
              </el-tab-pane>
              <el-tab-pane label="其他信息">
                <p class="detail">{{temp.weight}}</p>
              </el-tab-pane>
              <el-tab-pane label="测试">
                <el-scrollbar>
                  <pre class="detail">{{text}}</pre>
                </el-scrollbar>                
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
       
      <div slot="footer" class="dialog-footer">
        <time class="time">{{ temp.createtime | timeFilter }}</time>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  .time {
    font-size: 13px;
    color: #999;
    float: right;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .detail{
    width: 100%;
    padding: 1%;
    margin: 1%;
    font: 1em Microsoft YaHei;
  }
</style>


<script>
/* eslint-disable */
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import * as products from '@/api/products'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, timeFormatter } from '@/utils'


const text = `“‘上海精神’产生的强大凝聚力是本组织发展的保证。我们要保持团结协作的良好传统，新老成员国密切融合，深化政治互信，加大相互支持，构建平等相待、守望相助、休戚与共、安危共担的命运共同体。”
　　          习近平主席的精辟阐述，深刻揭示了“上海精神”超越时代和地域的生命力和价值。“上海精神”为所有致力于睦邻友好和共同繁荣的国家提供了有益借鉴，也为国际社会构建以合作共赢为核心的新型国际关系实践注入了强大动力。
　　          上合组织青岛峰会，是中共十九大后上合组织首次峰会，中国再次成为轮值主席国。新时代中国外交方针政策得到广泛认同，改革再深化、开放再扩大的一系列举措得到各国欢迎。新时代，中国将为上合组织未来发展提供什么样的智慧与方案？
　　          <br>当前，国际和地区形势正在经历深刻复杂变化。本地区安全形势总体稳定，但 “三股势力”的危害依然严峻，毒品走私、跨国有组织犯罪、信息安全等问题依然突出。如何进一步加强协作，维护地区安全稳定？
　　          上合组织去年首次扩员，新机遇也意味着新挑战。如何将扩员后形成的巨大势能转化为促进合作的动能？`

const calendarTypeOptions = ['其他', '瓜果', '零食', '蔬菜']

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
      text,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      isuseType: ['草稿', '发布', '删除'],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['发布', '草稿', '删除'],
      showReviewer: false,
      temp: {
        pid: undefined,
        createtime: '',
        description: '',
        type: '',
        isuse: 'published'
      },
      dialogFormVisible: false,
      textMap: {
        update: '详情',
        create: 'Create'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = ['success', 'info', 'danger']
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeOptions[type]
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
      products.fetchList(this.listQuery).then(response => {
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
    handleModifyIsuse(row, isuse) {
      let data = {
        pid: row.pid,
        isuse: isuse
      }
      products.modifyIsuse(data).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.isuse = isuse
      })
    },
    resetTemp() {
      this.temp = {
        pid: undefined,
        remark: '',
        description: '',
        isuse: '发布',
        type: ''
      }
    },
    handleDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleUpdate(row) {
      let info = Object.assign({}, row) // copy obj
      this.$router.push({
        path: 'addProduct',
        name:'添加商品',
        params: {info}
      })
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleCreate() {
      this.$router.push('addProduct')
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
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
