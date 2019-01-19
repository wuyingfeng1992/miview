<template>
  <div class="i-table">
    <el-table
      class="table-box"
      :data="tableData"
      ref="table"
      :stripe="true"
      :height="fixedHeight"
      @cell-click="cellClick"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandRow"
    >
      <!-- expand -->
      <el-table-column
        v-if="isExpand"
        type="expand"
      >
        <template slot-scope="scope">
          <slot
            name="expand"
            :$index="scope.$index"
            :row="scope.row"
          ></slot>
        </template>
      </el-table-column>

      <!-- selection -->
      <el-table-column
        v-if="isSelect"
        type="selection"
        width="60"
        align="center"
      ></el-table-column>

      <!-- index -->
      <el-table-column
        label="序号"
        v-if="isIndex"
        type="index"
        width="50"
        align="center"
      ></el-table-column>

      <!-- 简单的列(table-head) -->
      <el-table-column
        v-for="(item, key) in tableKey"
        v-if="!item.operate"
        :key="key"
        align="center"
        :prop="item.value"
        :label="item.name"
        :width="item.width"
        :min-width="item.minWidth"
        :fixed="item.isFixed"
        :sortable="item.sortable"
        :render-header="item.renderHeader"
        show-overflow-tooltip
      ></el-table-column>
      <!-- 自定义的列 (operate)-->
      <el-table-column
        v-else
        align="center"
        :prop="item.value"
        :label="item.name"
        :width="item.width"
        :min-width="item.minWidth"
        :fixed="item.isFixed"
        :sortable="item.sortable"
        :render-header="item.renderHeader"
      >
        <template slot-scope="scope">
          <!-- 对应slot name -->
          <slot
            :name="item.value"
            :$index="scope.$index"
            :row="scope.row"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="pagination-box"
      v-if="pagination.show"
    >
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagination.currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="pagination.pageSize"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MTable',
  props: {
    tableData: { // 表格列表数据
      type: Array,
      default: () => [],
      required: true
    },
    tableKey: { // 表格对应名称和关键字
      type: Array,
      default: () => [],
      required: true
    },
    isSelect: { // 是否显示勾选框
      type: Boolean,
      default: false
    },
    isExpand: { // 是否显示展开行
      type: Boolean,
      default: false
    },
    isExpandOne: { // 展示行是的只显示一行
      type: Boolean,
      default: false
    },
    isIndex: { // 是否显示索引列
      type: Boolean,
      default: false
    },
    fixedHeight: { // 固定高度
      type: [Number, String]
    },
    pagination: { // 分页信息
      type: Object,
      default: () => ({
        show: true, // 是否展示分页组件
        currentPage: 1,
        pageSize: 10,
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper'
      })
    }
  },
  methods: {
    sortChange (args) {
      this.$emit('sortChange', args)
    },
    cellClick (row, col, cell) {
      this.$emit('cellClick', { row, col, cell })
    },
    handleSelectionChange (list) {
      this.$emit('selectionChange', list)
    },
    handleExpandRow (row, expandRows) {
      if (this.isExpandOne) {
        this.$refs.table.store.states.expandRows = expandRows.length !== 0 ? [row] : [];
      }
      this.$emit('handleExpandRow')
    },
    sizeChange (e) {
      this.$emit('size-change', e);
    },
    currentChange (e) {
      this.$emit('current-change', e);
    }
  }
}
</script>

<style lang="scss" scoped>
.i-table {
  /deep/ {
    .cell > span {
      word-break: normal;
    }
    .pagination-box {
      margin-top: 12px;
      text-align: right;
      margin-right: 36px;
    }
  }
}
</style>
