<template>
  <div class="i-tree-select">
    <el-popover
      ref="popoverTree"
      placement="bottom-start"
      popper-class="i-tree-select-popover"
      trigger="click"
      @after-leave="handlePopoverTreeAfterLeave"
      @show="handleShowPopover"
      @hide="handleHidePopover"
      :visible-arrow="popoverVisibleArrow"
      :open-delay="20"
      :width="dialogWidth"
    >
      <el-tree
        ref="tree"
        class="select-tree"
        :style="`min-width: ${treeWidth}`"
        :data="data"
        :props="props"
        :check-on-click-node="checkOnClickNode"
        :expand-on-click-node="expandOnClickNode"
        :default-expand-all="defaultExpandAll"
        :highlight-current="highlightCurrentTree"
        :accordion="accordionTree"
        :show-checkbox="showCheckbox"
        :render-content="renderContent"
        :filter-node-method="filterNodeMethod"
        :icon-class="treeIconClass"
        @node-click="handleNodeClick"
        @node-collapse="handleNodeCollapse"
        @check-change="handleCheckChange"
        @check="handleCheck"
        :node-key="nodeKey"
      ></el-tree>
      <div
        class="el-select"
        ref="reference"
        slot="reference"
        :style="`width: ${width}px`"
        v-if="showCheckbox"
      >
        <div
          class="el-select__tags"
          ref="tags"
        >
          <span v-if="valueModel.length">
            <el-tag
              v-for="(item, index) in valueModel"
              :key="item"
              :size="collapseTagSize"
              closable
              type="info"
              :title="labelModel[index]"
              disable-transition
              @close="deleteTag($event, item)"
            >
              <span
                class="el-select__tags-text"
                :style="elSelectTagsTextStyle"
              >{{labelModel[index]}}</span>
            </el-tag>
          </span>
        </div>
        <el-input
          ref="selectInput"
          placeholder=""
          suffix-icon="el-icon-arrow-down"
          :class="{'rotate': showStatus}"
        ></el-input>
      </div>
      <el-input
        v-else
        slot="reference"
        ref="inputTree"
        v-model="labelModel"
        :class="{'rotate': showStatus}"
        :style="`width: ${width}px`"
        suffix-icon="el-icon-arrow-down"
        :placeholder="placeholder"
        :readonly="readonly"
      ></el-input>
    </el-popover>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
export default {
  name: 'MiTreeSelect',
  props: {
    data: { // 树形组件数据
      type: Array,
      default: () => ([])
    },
    value: String, // 接受双向绑定的值
    width: { // 输入框宽度
      type: String,
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
    },
    nodeKey: { // 设置了showCheckbox为true时，必须设置这个值，否则getCheckedKeys读取的子项值为undefined
      type: String,
      default: 'id'
    },
    props: { //  树节点配置选项
      type: Object,
      default: () => ({
        // parent: 'parentId',
        value: 'id',
        children: 'children',
        label: 'label', // 标签显示
        // isLeaf: (data, node) => {
        //   return !data.parent
        // }
      })
    },
    readonly: { // input框是否只读
      type: Boolean,
      default: true
    },
    size: String,
    disabled: Boolean
  },
  data () {
    return {
      labelModel: this.showCheckbox ? [] : '', // 输入框显示值
      valueModel: this.showCheckbox ? [] : '', // 实际请求传值
      popoverWidth: 0, // popover宽度
      treeWidth: 'auto', // 菜单宽度
      showStatus: false, // 树状菜单显示状态
      defaultExpandedKeys: [],
      initialInputHeight: 0,
      inputWidth: 0
    }
  },
  // 设置绑定参数(双向绑定)
  // model: {
  //   prop: 'value',
  //   event: 'selected'
  // },
  computed: {

    selectDisabled () {
      return this.disabled || (this.elForm || {}).disabled;
    },
    selectSize () {
      return this.size || (this.$ELEMENT || {}).size
    },
    collapseTagSize () {
      return ['small', 'mini'].indexOf(this.selectSize) > -1
        ? 'mini'
        : 'small';
    },
    elSelectTagsTextStyle () {
      return { 'max-width': this.collapseTagSize === 'small' ? (this.inputWidth - 30 - 40) + 'px' : (this.inputWidth - 30 - 30) + 'px' }
    },
    dialogWidth () {
      return Math.max(this.inputWidth - 12 * 2, 0)
    },
  },
  watch: {
    selectDisabled () {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    labelModel: {
      handler (val) {
        if (!val) { }
        // this.$refs.popoverTree && (this.$refs.popoverTree.showPopper = true)
        if (this.showCheckbox) {
          this.resetInputWidth()
          this.resetInputHeight()
        }
        if (this.readonly) return
        this.$refs.tree && this.$refs.tree.filter(val)
      }
    }
  },
  mounted () {
    // 检测输入框原有值并显示对应 label
    if (this.value) {
      // this.labelModel = this.queryTree(this.data, this.value)
    }
    if (this.$refs.inputTree) {
      this.treeWidth = `${(this.width || this.$refs.inputTree.$refs.input.clientWidth) - 24}px`
      this.popoverWidth = this.$refs.inputTree.$el.offsetWidth
    }
    addResizeListener(this.$el, this.handleResize)
    const selectInput = this.$refs.selectInput
    if (selectInput && selectInput.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      }
      this.resetInputWidth()
      this.initialInputHeight = selectInput.$el.getBoundingClientRect().height
    }
  },
  beforeDestroy () {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize)
  },
  methods: {
    // 单击节点
    handleNodeClick (data) {
      if (this.showCheckbox) {
        // this.labelModel = data[this.props.label]
        // this.valueModel = data[this.props.value]
      } else {
        this.labelModel = data[this.props.label]
        this.valueModel = data[this.props.value]
      }
      // this.handleCloseTree()
      // this.$refs.popoverTree.handleBlur()
    },
    // 节点收缩的时候触发
    handleNodeCollapse (data, node) {
      if (node.level !== 1) { // 若节点不是第一层级，则不重置tree位置
        return false
      }
      // this.resetTreePos()
    },
    handleCheckChange (data, checked, indeterminate) {
      // console.log(data, checked, indeterminate)
      // this.$nextTick(() => {
      //   // console.log(this.$refs.tree.getHalfCheckedKeys());
      // })
    },
    handleCheck (data, checked, selectedNode) {
      const { checkedKeys, checkedNodes } = checked
      this.valueModel = checkedKeys
      const labelModel = []
      checkedKeys.forEach(key => {
        const labelKey = this.$refs.tree.getNode(key) ? this.$refs.tree.getNode(key).label : null
        labelModel.push(labelKey)
        // console.log(this.$refs.tree.getNode(key));

      })
      this.labelModel = labelModel
      console.log('labelModel:  ', labelModel);
      console.log('valueModel: ', checkedKeys);


      // this.labelModel = checkedNodes.filter
      // console.log(checked)
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class={{ 'tree-node': true, 'i-tree-select-node': true, 'is-parent': !data.parent }}>
          <span class="label">{node.label}</span>
          <span class="extra" />
        </span>
      )
    },
    // 搜索
    filterNodeMethod (value, data) {
      if (this.readonly) return true
      if (this.showCheckbox) { return true }
      // console.log('value: ', value)
      if (!value) return true
      return data[this.props.label].indexOf(value) !== -1
    },
    // 搜索树状数据中的 value
    queryTree (tree, value) {
      let stark = [];
      stark = stark.concat(tree);
      while (stark.length) {
        const temp = stark.shift();
        if (temp[this.props.children]) {
          stark = stark.concat(temp[this.props.children]);
        }
        if (temp[this.props.value] === value) {
          return temp[this.props.label];
        }
      }
      return '';
    },
    handlePopoverTreeAfterLeave () {
      // this.$refs.popoverTree.handleBlur()
    },
    // 隐藏树状菜单
    handleCloseTree () {
      this.$refs.popoverTree && (this.$refs.popoverTree.showPopper = false)
    },
    // 显示时触发
    handleShowPopover () {
      this.showStatus = true
      this.$refs.tree && (this.$refs.tree.filter(false))
    },
    // 隐藏时触发
    handleHidePopover () {
      this.showStatus = false
      // this.$emit('selected', this.valueModel)
    },
    deleteTag (event, tag) {
      let index = this.valueModel.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        this.valueModel.splice(index, 1)
        this.labelModel.splice(index, 1)
        this.setCheckedKeys(this.valueModel)
        this.$emit('remove-tag', tag)
      }
      event.stopPropagation()
    },
    // 更改树组件数据
    setCheckedKeys (keys = []) {
      this.$refs.tree && this.$refs.tree.setCheckedKeys(keys);
    },
    handleResize () {
      if (this.showCheckbox) {
        this.resetInputWidth()
        this.resetInputHeight()
      }
    },
    resetInputWidth () {
      if (this.$refs.selectInput && this.$refs.selectInput.$el) {
        this.inputWidth = this.$refs.selectInput.$el.getBoundingClientRect().width;
      }
    },
    resetInputHeight () {
      if (!this.showCheckbox) return
      this.$nextTick(() => {
        if (!this.$refs.selectInput) return
        let inputChildNodes = this.$refs.selectInput.$el.childNodes
        let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
        const tags = this.$refs.tags
        const sizeInMap = this.initialInputHeight || 40
        input.style.height = this.labelModel.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px'

      })
    }
  }
}
</script>

