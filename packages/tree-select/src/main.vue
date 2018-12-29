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
      :visible-arrow="false"
      :width="popoverWidth"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        :expand-on-click-node="false"
        :default-expand-all="false"
        @node-click="handleNodeClick"
      ></el-tree>
      <el-input
        slot="reference"
        ref="inputTree"
        v-model="selectedNodeLabel"
        placeholder=""
      ></el-input>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'i-tree-select',
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    width: { // 整个组件的宽度
      type: String,
      default: '240px'
    }
  },
  data () {
    return {
      selectedNodeLabel: null, // 选中的tree值
      popoverWidth: 0, // popover宽度
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
    this.popoverWidth = this.$refs.inputTree.$el.offsetWidth
  },
  methods: {
    handleNodeClick (data) {
      this.selectedNodeLabel = data.label
      this.$refs.popoverTree.handleBlur()
    },
    handlePopoverTreeAfterLeave () {
      // this.$refs.popoverTree.handleBlur()
    }
  }
}
</script>

<style lang="scss">
.i-tree-select-popover {
  &.el-popper[x-placement^="bottom"] {
    margin-top: 0;
  }
  &.el-popper[x-placement^="top"] {
    margin-bottom: 0;
  }
}
</style>
