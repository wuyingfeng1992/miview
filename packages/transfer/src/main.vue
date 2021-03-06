<template>
  <div class="transfer">
    <div class="el-transfer">
      <transfer-panel
        v-bind="$props"
        ref="leftPanel"
        :data="sourceData"
        :title="titles[0] || t('el.transfer.titles.0')"
        :default-checked="leftDefaultChecked"
        :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
        @checked-change="onSourceCheckedChange"
        :is-draggable="isLeftDraggable"
        :draggableText='leftDraggableText'
      >
        <slot name="left-footer"></slot>
      </transfer-panel>
      <div class="el-transfer__buttons">
        <el-button
          type="primary"
          :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
          @click.native="addToLeft"
          :disabled="rightChecked.length === 0"
        >
          <i class="el-icon-arrow-left"></i>
          <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
        </el-button>
        <el-button
          type="primary"
          :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
          @click.native="addToRight"
          :disabled="leftChecked.length === 0"
        >
          <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>
      <transfer-panel
        v-bind="$props"
        ref="rightPanel"
        :data="targetData"
        :title="titles[1] || t('el.transfer.titles.1')"
        :default-checked="rightDefaultChecked"
        :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
        @checked-change="onTargetCheckedChange"
        :is-draggable="isRightDraggable"
        :draggableText='rightDraggableText'
        @dragSort="dragSort"
        :width='width'
      >
        <slot name="right-footer"></slot>
      </transfer-panel>
    </div>
  </div>
</template>

<script>
import ElButton from 'element-ui/packages/button';
import Emitter from 'element-ui/src/mixins/emitter';
import Locale from 'element-ui/src/mixins/locale';
import TransferPanel from './transfer-panel';
import Migrating from 'element-ui/src/mixins/migrating';

export default {
  name: 'MiTransfer',

  mixins: [Emitter, Locale, Migrating],

  components: {
    TransferPanel,
    ElButton
  },

  props: {
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    titles: {
      type: Array,
      default () {
        return [];
      }
    },
    buttonTexts: {
      type: Array,
      default () {
        return [];
      }
    },
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default () {
        return [];
      }
    },
    rightDefaultChecked: {
      type: Array,
      default () {
        return [];
      }
    },
    renderContent: Function,
    value: {
      type: Array,
      default () {
        return [];
      }
    },
    format: {
      type: Object,
      default () {
        return {};
      }
    },
    filterable: Boolean,
    props: {
      type: Object,
      default () {
        return {
          label: 'label',
          key: 'key',
          disabled: 'disabled'
        };
      }
    },
    targetOrder: {
      type: String,
      default: 'original'
    },
    width: { // 穿梭框的宽度
      type: String,
      default: '200px'
    },
    isLeftDraggable: { // 穿梭框头部提示语是否显示
      type: Boolean,
      default: false
    },
    isRightDraggable: { // 穿梭框头部提示语是否显示
      type: Boolean,
      default: false
    },
    leftDraggableText: { // 穿梭框头部提示语
      type: String,
      default: '拖拽未选科目进行排序'
    },
    rightDraggableText: { // 穿梭框头部提示语
      type: String,
      default: '拖拽已选科目进行排序'
    }
  },

  data () {
    return {
      leftChecked: [],
      rightChecked: []
    };
  },

  computed: {
    dataObj () {
      const key = this.props.key;
      return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {});
    },

    sourceData () {
      return this.data.filter(item => this.value.indexOf(item[this.props.key]) === -1);
    },

    targetData () {
      if (this.targetOrder === 'original') {
        return this.data.filter(item => this.value.indexOf(item[this.props.key]) > -1);
      } else {
        return this.value.reduce((arr, cur) => {
          const val = this.dataObj[cur];
          if (val) {
            arr.push(val);
          }
          return arr;
        }, []);
      }
    },

    hasButtonTexts () {
      return this.buttonTexts.length === 2;
    }
  },

  watch: {
    value (val) {
      this.dispatch('ElFormItem', 'el.form.change', val);
    }
  },

  methods: {
    getMigratingConfig () {
      return {
        props: {
          'footer-format': 'footer-format is renamed to format.'
        }
      };
    },

    onSourceCheckedChange (val, movedKeys) {
      this.leftChecked = val;
      if (movedKeys === undefined) return;
      this.$emit('left-check-change', val, movedKeys);
    },

    onTargetCheckedChange (val, movedKeys) {
      this.rightChecked = val;
      if (movedKeys === undefined) return;
      this.$emit('right-check-change', val, movedKeys);
    },

    addToLeft () {
      let currentValue = this.value.slice();
      this.rightChecked.forEach(item => {
        const index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'left', this.rightChecked);
    },

    addToRight () {
      let currentValue = this.value.slice();
      const itemsToBeMoved = [];
      const key = this.props.key;
      this.data.forEach(item => {
        const itemKey = item[key];
        if (
          this.leftChecked.indexOf(itemKey) > -1 &&
          this.value.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey);
        }
      });
      currentValue = this.targetOrder === 'unshift'
        ? itemsToBeMoved.concat(currentValue)
        : currentValue.concat(itemsToBeMoved);
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'right', this.leftChecked);
    },

    clearQuery (which) {
      if (which === 'left') {
        this.$refs.leftPanel.query = '';
      } else if (which === 'right') {
        this.$refs.rightPanel.query = '';
      }
    },

    // 新增拖拽回调方法
    dragSort (data) {
      // this.$emit('input', data)
      console.log('dragSort: ', data)
      // this.$emit('change', data, 'dragSort')
    }
  }
};
</script>

