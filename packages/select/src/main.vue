<template>
  <div class="select-wrap">
    <div class="select-box">
      <!-- 没有点击展示时的状态 -->
      <div
        class="input-box"
        v-show="custom && multiple && !isShowSelect"
        @click="inputChangeShowSelectState"
        ref="inputBoxRef"
        :style="inputBoxStyle"
      >
        <template v-if="custom && multiple && !isShowSelect">
          <el-tooltip
            placement="top"
            :disabled="!selectedLabelVisible"
          >
            <div slot="content">{{selectedLabel}}</div>
            <label
              v-if="selectedFullValue.length > 1"
              class="inputLabel"
            >
              {{selectedFullValue[0][selectLabelKey]}} ( +{{selectedFullValue.length - 1}}个)
            </label>
            <label
              v-else-if="selectedFullValue.length === 1"
              class="inputLabel"
            >
              {{selectedFullValue[0][selectLabelKey]}}
            </label>
            <label
              v-else
              class="inputLabel"
            >{{inputLabel}}</label>
          </el-tooltip>
        </template>
      </div>
      <!-- 点击展示时的状态/没有定制多选时的情况 -->
      <div
        class="select-box__inner"
        v-show="isShowSelect"
      >
        <el-select
          v-model="selectedValue"
          :multiple="multiple"
          :placeholder="placeholder"
          v-bind="$attrs"
          @change="handleChangeSelectBox"
          @visible-change="handleVisibleChange"
          :remote-method="remoteMethod"
          popper-class="select-box-popover"
          ref="selectBoxRef"
        >
          <el-option
            v-for="item in options"
            :key="item[selectValueKey]"
            :label="item[selectLabelKey]"
            :value="item[selectValueKey]"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
export default {
  name: 'MSelect',
  directives: { Clickoutside },
  props: {
    custom: { // 是否是定制的下拉选择框
      type: Boolean,
      default: false
    },
    multiple: { // 是否启用多选
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    options: { // 下拉框的选项
      type: Array,
      default: () => ([])
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    selectLabelKey: { // 下拉选择框子选项label字段
      type: String,
      default: 'label'
    },
    selectValueKey: { // 下拉选择框子选项的值字段
      type: String,
      default: 'value'
    },
    inputLabel: { // 选中为空提示语
      type: String,
      default: '请点击选择'
    },
    width: { // select框的宽度
      type: String,
      default: '220'
    },
    defaultSelectedValue: { // 默认下拉框选中的值
      type: [String, Array],
      default: () => {
        // TODO: 这里有坑，读取this.X会报错
        // console.log('this: ', this);
        // return this.multiple ? [] : ''
        return ''
      }
    }
  },
  computed: {
    inputBoxStyle () {
      return {
        width: this.inputWidth && (this.inputWidth.includes('px') || this.inputWidth.includes('%')) ? this.inputWidth : this.inputWidth + 'px'
      }
    },
    selectedLabel () {
      if (this.custom) {
        return this.selectedFullValue.map(item => item[this.selectLabelKey]).join(',')
      }
      return ''
    },
    selectedLabelVisible () { // 是否展示tooltip
      // console.log('selectedLabelVisible: ', !!this.selectedLabel);
      return !!this.selectedLabel
    }
  },
  watch: {
    'selectedValue': {
      deep: true,
      immediate: true,
      handler (val) {
        if (this.multiple) {
          let selectedFullValue = []
          this.options.forEach(item => {
            if (val.includes(item.value)) {
              selectedFullValue.push(item)
            }
          })
          this.selectedFullValue = [...selectedFullValue]
        }
      }
    },
    width: {
      immediate: true,
      handler (val) {
        this.updateInputWidth()
      }
    }
  },
  data () {
    return {
      selectedValue: this.defaultSelectedValue ? this.defaultSelectedValue : this.multiple ? [] : '', // 选中的select值
      selectedFullValue: this.multiple ? [] : '', // 选中值的select集合(包括value和key)
      isShowSelect: !this.custom, // 是否展示select下拉框
      inputWidth: this.width
    }
  },
  mounted () {
    this.updateInputWidth()
    if (this.custom) {
      document.addEventListener('click', this.handleSelectClose, false)
    }
  },
  destroyed () {
    if (this.custom) {
      document.removeEventListener('click', this.handleSelectClose, false)
    }
  },
  methods: {
    updateInputWidth () {
      if (this.$refs.selectBoxRef) {
        this.inputWidth = this.$refs.selectBoxRef.offsetWidth
      }
    },
    inputChangeShowSelectState () {
      this.isShowSelect = true
    },
    handleSelectClose (e) {
      e.preventDefault()
      const target = e.target
      // console.log('e: ', e.target, target.classList);
      if (target && !target.classList.contains('inputLabel')) {
        this.isShowSelect = false
      }
    },
    handleVisibleChange (visible) { // 更改select下拉框的状态(展开/收起)
      // console.log('handleVisibleChange: ', visible);
      this.$emit('visible-change', visible)
      if (this.custom && !visible) {
        this.isShowSelect = false
      }
    },
    handleChangeSelectBox (val) {
      this.$emit('change', val)
      // console.log('selectedValue: ', this.selectedValue);
    },
    remoteMethod (query) {
      this.$emit('remote-method', query)
    }
  }
}
</script>
