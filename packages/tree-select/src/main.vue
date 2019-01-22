<template>
  <div
    class="i-tree-select"
    :style="{width: width}"
  >
    <el-popover
      ref="popoverTree"
      placement="bottom"
      popper-class="i-tree-select-popover"
      trigger="click"
      @after-leave="handlePopoverTreeAfterLeave"
      :visible-arrow="popoverVisibleArrow"
      :width="popoverWidth"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        :check-on-click-node="checkOnClickNode"
        :expand-on-click-node="expandOnClickNode"
        :default-expand-all="defaultExpandAll"
        :highlight-current="highlightCurrentTree"
        :accordion="accordionTree"
        :show-checkbox="showCheckbox"
        :render-content="renderContent"
        :icon-class="treeIconClass"
        @node-click="handleNodeClick"
        @node-collapse="handleNodeCollapse"
      ></el-tree>
      <el-input
        slot="reference"
        ref="inputTree"
        v-model="selectedNodeLabel"
        :placeholder="placeholder"
      ></el-input>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'MTreeSelect',
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    width: { // 整个组件的宽度
      type: String,
      default: '240px'
    },
    popoverVisibleArrow: { // 是否显示 Tooltip 箭头
      type: Boolean,
      default: false
    },
    expandOnClickNode: { // 是否在点击节点的时候展开或者收缩节点
      type: Boolean,
      default: true
    },
    checkOnClickNode: { // 是否在点击节点的时候选中节点
      type: Boolean,
      default: false
    },
    defaultExpandAll: { // 是否默认展开所有节点
      type: Boolean,
      default: false
    },
    highlightCurrentTree: { // 是否高亮当前选中节点
      type: Boolean,
      default: true
    },
    accordionTree: { // 是否每次只打开一个同级树节点展开
      type: Boolean,
      default: false
    },
    showCheckbox: { // 节点是否可被选择
      type: Boolean,
      default: false
    },
    treeIconClass: { // 自定义树节点的图标
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedNodeLabel: null, // 选中的tree值
      popoverWidth: 0, // popover宽度
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: (data, node) => {
          return !data.parent
        }
      },
      defaultExpandedKeys: []
    }
  },
  mounted () {
    this.popoverWidth = this.$refs.inputTree.$el.offsetWidth
  },
  methods: {
    handleNodeClick (data) {
      this.selectedNodeLabel = data.label
      // this.$refs.popoverTree.handleBlur()
    },
    // 节点收缩的时候触发
    handleNodeCollapse (data, node) {
      if (node.level !== 1) { // 若节点不是第一层级，则不重置tree位置
        return false
      }
      // this.resetTreePos()
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class={{ 'tree-node': true, 'i-tree-select-node': true, 'is-parent': !data.parent }}>
          <span class="label">{node.label}</span>
          <span class="extra" />
        </span>
      )
    },
    handlePopoverTreeAfterLeave () {
      // this.$refs.popoverTree.handleBlur()
    }
  }
}
</script>

