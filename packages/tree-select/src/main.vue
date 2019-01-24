<template>
  <div class="i-tree-select">
    <el-popover
      ref="popoverTree"
      placement="bottom-start"
      popper-class="i-tree-select-popover"
      trigger="click"
      v-model="selectorDisplay"
      @show="handleShowPopover"
      @hide="handleHidePopover"
      :visible-arrow="popoverVisibleArrow"
    >
      <el-tree
        ref="tree"
        class="select-tree"
        :data="data"
        :props="props"
        :node-key="nodeKey"
        :current-node-key="props.value"
        :check-on-click-node="checkOnClickNode"
        :expand-on-click-node="expandOnClickNode"
        :default-expand-all="defaultExpandAll"
        :highlight-current="highlightCurrentTree"
        :accordion="accordionTree"
        :show-checkbox="multiple"
        :empty-text="emptyText"
        :render-content="renderContent"
        :icon-class="treeIconClass"
        :check-strictly="!treeIndependent"
        :default-expanded-keys="expandPath"
        @node-click="onChange"
        @check="onMultiChange"
      ></el-tree>
    </el-popover>
    <el-select
      class="org-selector--selector"
      :class="{'selector__single-line': isSingleLine}"
      :value="value"
      v-popover:popoverTree
      :placeholder="placeholder"
      :disabled="disabled"
      value-key="value"
      :multiple="multiple"
      clearable
      @remove-tag="onRemove"
      @clear="onChange"
      popper-class="i-tree-select-selector-popper"
    >
      <el-option
        v-for="item in selectedOptions"
        :key="item[props.value]"
        :label="item[props.label]"
        :value="item[props.value]"
      />
    </el-select>
  </div>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter';
export default {
  name: 'MiTreeSelect',
  mixins: [emitter],
  model: { // 双向绑定数据
    prop: 'value', // 选中的值
    event: 'change'
  },
  props: {
    data: { // 树形组件数据
      type: Array,
      default: () => []
    },
    value: { // 双向绑定数据
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
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
    multiple: { // 节点是否是多选
      type: Boolean,
      default: false
    },
    emptyText: { // 内容为空的时候展示的文本
      type: String,
      default: ''
    },
    nodeKey: { // 设置了multiple为true时，必须设置这个值，否则getCheckedKeys读取的子项值为undefined
      type: String,
      default: 'id'
    },
    treeIconClass: { // 自定义树节点的图标
      type: String,
      default: ''
    },
    props: { //  树节点配置选项
      type: Object,
      default: () => ({
        // parent: 'parentId',
        value: 'id',
        children: 'children',
        label: 'label', // 标签显示(展示的属性名称)
        // isLeaf: (data, node) => {
        //   return !data.parent
        // }
      })
    },
    treeIndependent: {  // 树形子选项之间互相独立
      type: Boolean,
      default: true
    },
    isSingleLine: { // 是否一行展示选中的选项
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectorDisplay: false, // 是否显示popover
      tmpVal: '', // 临时选中的值
      selectedOptions: [],
      expandPath: [] // 默认展开的节点的 key 的数组
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val, oldVal) {
        if (val && val !== this.tempVal) {
          // TODO: 自动展开相应节点
          // this.expandPath = [...val.reduce((ps, v) => ps.add(v.slice(0, -1)), new Set())]
          // console.log('watch - value: ', val);
          this.expandPath = val
          if (this.multiple) this.checkNodes(val)
          else this.onChange(val)
        }
      }
    }
  },
  methods: {
    renderContent (h, { node, data, store }) {
      return (
        <span class={{ 'tree-node': true, 'i-tree-select-node': true, 'is-parent': !data.parent }}>
          <span class="label">{node[this.props.label]}</span>
          <span class="extra" />
        </span>
      )
    },
    handleShowPopover () {
      this.disabled && (this.selectorDisplay = false)
    },
    handleHidePopover () { },
    /**
     * @description 改变组织选择器的选择时
     * @param e 当前组织的信息（为空则是清空当前组织）
     */
    onChange (e) {
      if (!this.multiple) {
        this.selectorDisplay = false;
        this.selectedOptions = e ? [e] : [];
        this.update(e ? e : '');
      } else {

      }
    },
    /**
     * @description 当多选删除某选项时
     * @param e 节点组件实例
     */
    onRemove (e) {
      const keys = this.value.filter(v => v !== e)
      console.log('keys: ', keys);

      this.$refs.tree && this.$refs.tree.setCheckedKeys(keys, true)
      this.update(keys)
    },
    /**
     * @description 当多选勾选时
     */
    onMultiChange (nodeData, newVal, oldVal) {
      if (!this.$refs.tree) return
      console.log('222');

      const nodes = this.$refs.tree.getCheckedNodes().filter(v => !v[this.props.children]); // 只选取叶子节点的数据
      // const nodes = this.$refs.tree.getCheckedNodes();
      this.selectedOptions = nodes;

      this.update(nodes.map(v => v[this.props.value]));
    },
    /**
     * @description 触发值的变化
     * @param data 更新后的值
     */
    update (data) {
      this.tempVal = data;
      this.$emit('change', this.tempVal);
      console.log('update: ', data);

      this.dispatch('ElFormItem', 'el.form.change', this.tempVal);
    },
    /**
     * @description 勾选传入的节点列表
     * @param ids 节点列表(id)
     */
    checkNodes (ids) {
      this.$nextTick(() => {
        console.log(this.$refs.tree);
        this.$refs.tree && this.$refs.tree.setCheckedKeys(ids, this.treeIndependent);
        const selectedOptions = []
        ids.forEach(key => {
          const labelKey = this.$refs.tree.getNode(key) ? this.$refs.tree.getNode(key)[this.props.label] : null
          selectedOptions.push({
            [this.props.label]: labelKey,
            [this.props.value]: key
          })
        })
        this.selectedOptions = selectedOptions

      })

    }
  }
}
</script>

<style>
</style>
