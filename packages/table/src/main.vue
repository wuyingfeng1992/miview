<template>
  <div class="i-table">
    <el-table :data="tableData" ref="table" :stripe="true" :height="fixedHeight">
      <!-- expand -->
      <el-table-column v-if="isExpand" type="expand">
        <template slot-scope="scope">
          <slot name="expand" :$index="scope.$index" :row="scope.row"></slot>
        </template>
      </el-table-column>

      <!-- selection -->
      <el-table-column v-if="isSelect" type="selection" width="60" align="center"></el-table-column>

      <!-- index -->
      <el-table-column label="isIndex" type="index" width="50" align="center"></el-table-column>

      <!-- 简单的列(table-head) -->
      <el-table-column v-for="(item, key) in tableKey" v-if="!item.operate" :key="key" align="center" :prop="item.value" :label="item.name" :width="item.width" :min-width="item.minWidth" :fixed="item.isFixed" :sortable="item.sortable" show-overflow-tooltip></el-table-column>
      <!-- 自定义的列 (operate)-->
      <el-table-column v-else align="center" :prop="item.value" :label="item.name" :width="item.width" :min-width="item.minWidth" :fixed="item.isFixed" :sortable="item.sortable">
        <template slot-scope="scope">
          <!-- 对应slot name -->
          <slot :name="item.value" :$index="scope.$index" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style scoped>
.i-table .cell > span{
  word-break:normal;
}
</style>
