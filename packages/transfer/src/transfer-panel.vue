<template>
  <div class="el-transfer-panel" :style="{width}">
    <p class="el-transfer-panel__header">
      <el-checkbox v-model="allChecked" @change="handleAllCheckedChange" :indeterminate="isIndeterminate">
        {{ title }}
        <span v-if="isDraggable" :style="{position:'absolute',color:'#909399',fontSize:'13px',fontWeight:'400',left:'50%',marginLeft:draggableTextMarginLeft}">{{draggableText}}</span>
        <span>{{ checkedSummary }}</span>
      </el-checkbox>
    </p>

    <div :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
      <el-input class="el-transfer-panel__filter" v-model="query" size="small" :placeholder="placeholder" @mouseenter.native="inputHover = true" @mouseleave.native="inputHover = false" v-if="filterable">
        <!-- <i slot="prefix" :class="['el-input__icon', 'el-icon-' + inputIcon]" @click="clearQuery"></i> -->
      </el-input>
      <draggable v-if="isDraggable" element="el-checkbox-group" :list="filteredData" :component-data="getComponentData()" @end="dragEnd" v-show="!hasNoMatch && data.length > 0" :class="{ 'is-filterable': filterable }" class="el-transfer-panel__list">
        <el-checkbox class="el-transfer-panel__item" :label="item[keyProp]" :disabled="item[disabledProp]" :key="item[keyProp]" v-for="item in filteredData">
          <option-content :option="item"></option-content>
        </el-checkbox>
      </draggable>
      <el-checkbox-group v-else v-model="checked" v-show="!hasNoMatch && data.length > 0" :class="{ 'is-filterable': filterable }" class="el-transfer-panel__list">
        <el-checkbox class="el-transfer-panel__item" :label="item[keyProp]" :disabled="item[disabledProp]" :key="item[keyProp]" v-for="item in filteredData">
          <option-content :option="item"></option-content>
        </el-checkbox>
      </el-checkbox-group>
      <p class="el-transfer-panel__empty" v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      <p class="el-transfer-panel__empty" v-show="data.length === 0 && !hasNoMatch">{{ t('el.transfer.noData') }}</p>
    </div>
    <p class="el-transfer-panel__footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script>
import ElCheckboxGroup from 'element-ui/packages/checkbox-group';
import ElCheckbox from 'element-ui/packages/checkbox';
import ElInput from 'element-ui/packages/input';
import Locale from 'element-ui/src/mixins/locale';

// 引入拖拽组件
import draggable from 'vuedraggable';

export default {
  mixins: [Locale],

  name: 'ElTransferPanel',

  componentName: 'ElTransferPanel',

  components: {
    draggable,
    ElCheckboxGroup,
    ElCheckbox,
    ElInput,
    OptionContent: {
      props: {
        option: Object
      },
      render (h) {
        const getParent = vm => {
          if (vm.$options.componentName === 'ElTransferPanel') {
            return vm;
          } else if (vm.$parent) {
            return getParent(vm.$parent);
          } else {
            return vm;
          }
        };
        const panel = getParent(this);
        const transfer = panel.$parent || panel;
        return panel.renderContent
          ? panel.renderContent(h, this.option)
          : transfer.$scopedSlots.default
            ? transfer.$scopedSlots.default({ option: this.option })
            : <span>{this.option[panel.labelProp] || this.option[panel.keyProp]}</span>;
      }
    }
  },

  props: {
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    renderContent: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    defaultChecked: Array,
    props: Object,

    // 新增拖拽prop参数
    draggableText: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '' // 对象或数组默认值必须从一个工厂函数获取
    },
    isDraggable: Boolean
  },

  data () {
    return {
      checked: [],
      allChecked: false,
      query: '',
      inputHover: false,
      checkChangeByUser: true
    };
  },

  watch: {
    checked (val, oldVal) {
      this.updateAllChecked();
      if (this.checkChangeByUser) {
        const movedKeys = val.concat(oldVal)
          .filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
        this.$emit('checked-change', val, movedKeys);
      } else {
        this.$emit('checked-change', val);
        this.checkChangeByUser = true;
      }
    },

    data () {
      const checked = [];
      const filteredDataKeys = this.filteredData.map(item => item[this.keyProp]);
      this.checked.forEach(item => {
        if (filteredDataKeys.indexOf(item) > -1) {
          checked.push(item);
        }
      });
      this.checkChangeByUser = false;
      this.checked = checked;
    },

    checkableData () {
      this.updateAllChecked();
    },

    defaultChecked: {
      immediate: true,
      handler (val, oldVal) {
        if (oldVal && val.length === oldVal.length &&
          val.every(item => oldVal.indexOf(item) > -1)) return;
        const checked = [];
        const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
        val.forEach(item => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checkChangeByUser = false;
        this.checked = checked;
      }
    }
  },

  computed: {
    filteredData () {
      return this.data.filter(item => {
        if (typeof this.filterMethod === 'function') {
          return this.filterMethod(this.query, item);
        } else {
          const label = item[this.labelProp] || item[this.keyProp].toString();
          return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }
      });
    },

    checkableData () {
      return this.filteredData.filter(item => !item[this.disabledProp]);
    },

    checkedSummary () {
      const checkedLength = this.checked.length;
      const dataLength = this.data.length;
      const { noChecked, hasChecked } = this.format;
      if (noChecked && hasChecked) {
        return checkedLength > 0
          ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
          : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return `${checkedLength}/${dataLength}`;
      }
    },

    isIndeterminate () {
      const checkedLength = this.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    },

    hasNoMatch () {
      return this.query.length > 0 && this.filteredData.length === 0;
    },

    inputIcon () {
      return this.query.length > 0 && this.inputHover
        ? 'circle-close'
        : 'search';
    },

    labelProp () {
      return this.props.label || 'label';
    },

    keyProp () {
      return this.props.key || 'key';
    },

    disabledProp () {
      return this.props.disabled || 'disabled';
    },

    hasFooter () {
      return !!this.$slots.default;
    },

    // 新增拖拽样式
    draggableTextMarginLeft () {
      let ret = '0px'
      if (this.graggableText) {
        ret = `-${this.graggableText.length * 13 / 2}px`
      }
      return ret
    }
  },

  methods: {
    updateAllChecked () {
      const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
      this.allChecked = checkableDataKeys.length > 0 &&
        checkableDataKeys.every(item => this.checked.indexOf(item) > -1);
    },

    handleAllCheckedChange (value) {
      // element ui 2.49与1.4的check兼容问题
      // value = this.allChecked

      this.checked = value
        ? this.checkableData.map(item => item[this.keyProp])
        : [];
    },

    clearQuery () {
      if (this.inputIcon === 'circle-close') {
        this.query = '';
      }
    },

    // 新增拖拽函数方法
    getComponentData () {
      return {
        on: {
          change: this.handleChange,
          input: this.handleChange
        },
        props: {
          value: this.checked
        }
      }
    },

    handleChange (value) {
      this.checked = value
    },

    dragEnd (event) {
      let oldIndex = event.oldIndex
      let newIndex = event.newIndex
      this.query.length ? this._sortDragFilter(this.data, oldIndex, newIndex) : this._sortDrag(this.data, oldIndex, newIndex)
      this.$forceUpdate()
      // let data = this.data.map(item => {
      //   return item.key
      // })
      // this.$emit('dragSort', data) // 这句代码影响到，选中checkbox
    },

    // 拖动后元素排序
    _sortDrag (arr, oldIndex, newIndex) {
      let item = arr[oldIndex]
      arr.splice(oldIndex, 1)
      arr.splice(newIndex, 0, item)
      // console.log('_sortDrag: ', arr);
    },

    // 搜索后拖拽排序
    _sortDragFilter (arr, oldIndex, newIndex) {
      // debugger
      let key = this.filteredData[newIndex].key
      let nextKey = this.filteredData[newIndex + 1] ? this.filteredData[newIndex + 1].key : this.filteredData[newIndex - 1].key
      let keyIndex = arr.findIndex(item => {
        return item.key === key
      })
      let nextKeyIndex = arr.findIndex(item => {
        return item.key === nextKey
      })
      // eslint-disable-next-line
      keyIndex < nextKeyIndex ? nextKeyIndex-- : nextKeyIndex
      this._sortDrag(arr, keyIndex, nextKeyIndex)
    }
  }
};
</script>
