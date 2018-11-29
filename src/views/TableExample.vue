<template>
  <div class="about">
    <i-table :tableData="tableData" :tableKey="tableKey">
      <template slot="date" slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px;">{{scope.row.date | formatDate}}</span>
      </template>
      <template slot="name" slot-scope="scope">
        <el-popover placement="top" trigger="hover">
          <p>姓名：{{scope.row.name}}</p>
          <p>住址：{{scope.row.address}}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{scope.row.name}}</el-tag>
          </div>
        </el-popover>
      </template>
    </i-table>
  </div>
</template>
<script>
import moment from 'moment'
import Table from '../../packages/table/index'

export default {
  name: 'TableExample',
  components: {
    ITable: Table
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableKey: [
        { name: '日期', value: 'date', operate: true },
        { name: '姓名', value: 'name', operate: true },
        { name: '地址', value: 'address', operate: false }
      ]
    }
  },
  filters: {
    // 格式化时间
    formatDate (value, format = 'YYYY/MM/DD') {
      if (value) {
        return moment(value).format(format)
      }
      return value
    }
  }
}
</script>
