<template>
  <div class="paste-select-box">
    <el-popover
      ref="popoverSelectBox"
      trigger="click"
      :width="dialogWidth"
      v-model="dialogVisible"
      placement="bottom-end"
      popper-class="paste-select-popover"
    >
      <el-form
        ref="form-language"
        @submit.native.prevent
      >
        <el-form-item>
          <el-input
            type="textarea"
            :size="selectSize"
            v-model="tmpSubContent"
            :rows="8"
            :disabled="disabled"
            :placeholder="textareaPlaceholder"
            @change="handleSubContentChange"
          />
        </el-form-item>
      </el-form>
      <div
        class="dialog-footer"
        style="text-align: right;"
      >
        <el-button
          @click="handleCancel"
          :size="selectSize"
          :disabled="disabled"
        >清 除</el-button>
        <el-button
          type="primary"
          @click="dialogEnter"
          :size="selectSize"
          :disabled="disabled"
        >确 定</el-button>
      </div>
    </el-popover>

    <el-form
      ref="form"
      slot="referenceSelectBox"
      class="paste-select-form"
      :style="[{'width': width + 'px'}]"
      :model="form"
      :label-width="innerLabelWidth"
      @submit.native.prevent
    >
      <el-form-item
        :label="params.label"
        :prop="form[params.field]"
        :rules="[
        { required: required, message: params.label + '字段必填', trigger: 'blur' }
        ]"
      >
        <!-- <label slot="label" :style="{display: showLabel ? 'inline-block': 'none'}"></label> -->
        <div
          class="el-select__tags"
          :style="elSelectTagsStyle"
        >
          <template v-if="!dialogVisible && subContentArr.length > 0">
            <!-- <el-tag :closable="true" :hit="true" :size="collapseTagSize" type="info" @close="deleteTag($event, {})" :class="['el-tag--'+collapseTagSize]" disable-transitions>
              <span class="el-select__tags-text">{{ subContentArr[0] }}</span>
            </el-tag>
            <el-tag v-if="subContentArr.length > 1" :closable="false" :size="collapseTagSize" type="info" :class="['el-tag--'+collapseTagSize]" disable-transitions>
              <span class="el-select__tags-text">+ {{ subContentArr.length - 1 }}</span>
            </el-tag> -->

            <!-- 更改el-tag的显示方式 -->
            <el-tag
              :closable="true"
              :hit="true"
              :size="collapseTagSize"
              type="info"
              @close="deleteTag($event, {})"
              :class="['el-tag--'+collapseTagSize]"
              disable-transitions
            >
              <el-tooltip
                v-if="innerShowOverflowTooltip"
                popper-class="paste-select-box-select-select__tags-text-popper-dialog"
                effect="light"
                :content="elSelectTagsTextContent"
                placement="top-start"
              >
                <span
                  class="el-select__tags-text"
                  ref="elSelectTagsText"
                  :style="elSelectTagsTextStyle"
                >{{elSelectTagsTextContent}}</span>
              </el-tooltip>
              <span
                v-else
                class="el-select__tags-text"
                ref="elSelectTagsText"
                :style="elSelectTagsTextStyle"
              >{{elSelectTagsTextContent}}</span>
            </el-tag>
          </template>
        </div>
        <el-input
          ref="referenceSelectBox"
          :size="selectSize"
          :class="{subject: true, 'hidden':  !dialogVisible && subContentArr.length > 0 }"
          :readonly="dialogVisible || (!dialogVisible && subContentArr.length > 0)"
          v-model.trim="form[params.field]"
          @change="changeInput"
          @blur="handleBlur"
          :disabled="disabled"
          :maxlength="maxlength"
          :placeholder="inputPlaceholder"
        ></el-input>
        <i
          class="icon el-icon-edit-outline paste-select-icon"
          :class="['paste-select-icon--'+collapseTagSize]"
          @click="openDialog"
          v-popover:popoverSelectBox
        ></i>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
export default {
  name: 'MPasteSelect',
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    required: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '240'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: { // input框最大的输入字符数
      type: Number,
      default: 5000
    },
    inputPlaceholder: {
      type: String,
      default: ''
    },
    textareaPlaceholder: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '0'
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    limitFieldNum: { // 限制每个字段可以输入的条数
      type: Number,
      default: 100
    },
    size: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        [this.params.field]: ''
      },
      fromContentInput: 'input',
      subContent: '', // textarea框的值（点击确定按钮后保存的值）
      subContentArr: [],
      tmpSubContent: '', // 还没确定时的textarea的值（即还没按确定健）
      tmpSubContentArr: '',
      dialogVisible: false, // 控制弹框是否展开
      isCancelSubContent: false, // 是否是点击了清空按钮
      inputWidth: this.width,
      innerShowOverflowTooltip: false // 是否显示tooltip
    };
  },
  computed: {
    selectSize () {
      return ['small', 'mini'].indexOf(this.size) > -1
        ? 'mini'
        : 'small'
    },
    collapseTagSize () {
      return ['small', 'mini'].indexOf(this.size) > -1
        ? 'mini'
        : 'small'
    },
    dialogWidth () {
      return this.width
      // return this.inputWidth + Number(this.labelWidth) + 'px'
    },
    elSelectTagsStyle () {
      return { 'max-width': this.collapseTagSize === 'small' ? (this.inputWidth - 26) + 'px' : (this.inputWidth - 30) + 'px' }
    },
    elSelectTagsTextStyle () {
      return { 'max-width': this.collapseTagSize === 'small' ? (this.inputWidth - 26 - 40) + 'px' : (this.inputWidth - 30 - 30) + 'px' }
    },
    innerLabelWidth () {
      return this.labelWidth + 'px'
    },
    elSelectTagsTextContent () {
      return `${this.subContentArr.length}个${this.params.label}`
    }
  },
  watch: {
    width: {
      immediate: true,
      handler (val) {
        this.handleInputWidth()
      }
    },
    value: {
      immediate: true,
      handler (val) {
        if (val) {
          this.form[this.params.field] = val
        }
      }
    },
    dialogVisible: {
      immediate: true,
      handler (val) {
        if (!val && this.subContentArr.length > 0) {
          this.$nextTick(() => {
            let elSelectTagsTextWidth = 0 // 宽度
            if (this.$refs.elSelectTagsText) {
              elSelectTagsTextWidth = this.$refs.elSelectTagsText.offsetWidth || 0
            }
            let elSelectTagsTextMaxWidth = this.elSelectTagsTextStyle['max-width'] // 最大宽度
            if (elSelectTagsTextMaxWidth) {
              elSelectTagsTextMaxWidth = elSelectTagsTextMaxWidth.replace('px', '')
            }
            elSelectTagsTextMaxWidth = Number(elSelectTagsTextMaxWidth) || 0
            if (elSelectTagsTextMaxWidth && elSelectTagsTextWidth && (elSelectTagsTextWidth >= elSelectTagsTextMaxWidth)) {
              this.innerShowOverflowTooltip = true
            }
            // console.log('elSelectTagsText: ', this.$refs.elSelectTagsText.offsetWidth);
            // console.log('elSelectTagsTextStyle: ', this.elSelectTagsTextStyle['max-width']);
          })
        }
      }
    }
  },
  mounted () {
    addResizeListener(this.$el, this.handleResize);
    // this.$nextTick(() => {
    this.handleInputWidth()

    this.$watch(
      function () {
        return this.form[this.params.field]
      },
      function (val) {
        this.$emit('change', this.form[this.params.field])
      }
    )
    // });
  },
  methods: {
    handleInputWidth () {
      // console.log('width: ', this.width)
      // console.log('inputWidth: ', this.inputWidth)
      // console.log('dialogWidth: ', this.dialogWidth)

      // this.$nextTick(() => {
      //   if (this.$refs.referenceSelectBox && this.$refs.referenceSelectBox.$el) {
      //     console.log('inputWidth: ', this.$refs.referenceSelectBox.$el.getBoundingClientRect().width)
      //     this.inputWidth = this.$refs.referenceSelectBox.$el.getBoundingClientRect().width;
      //   }
      // })
    },
    changeInput () {
      // this.$emit('change', this.form[this.params.field])
      this.handleBlur()
    },
    handleBlur () {
      if (this.form[this.params.field]) {
        this.form[this.params.field] = this.formatTransform(this.form[this.params.field])
        const value = this.form[this.params.field]
        let tmpValueArr = []
        if (this.limitFieldNum && value) {
          tmpValueArr = this.form[this.params.field].split(',')
          if (tmpValueArr.length > this.limitFieldNum) {
            this.$message({
              message: `最多允许搜索${this.limitFieldNum}条数据`,
              type: 'warning'
            })
            this.form[this.params.field] = tmpValueArr.slice(0, this.limitFieldNum).join(',') // 截取前100个值
          }
        }
      }
    },
    popoverHide () {
      this.handleClose();
    },
    handleClose () {
      this.dialogVisible = false;
    },
    handleCancel () {
      this.tmpSubContent = ''
      this.tmpSubContentArr = []
      this.isCancelSubContent = true
    },

    resetInputWidth () {
      if (this.$refs.referenceSelectBox && this.$refs.referenceSelectBox.$el) {
        this.inputWidth = this.$refs.referenceSelectBox.$el.getBoundingClientRect().width;
      }
    },
    handleResize () {
      this.resetInputWidth();
    },
    openDialog () {
      // this.dialogVisible = true;
      this.isCancelSubContent = false
      if (this.form[this.params.field] && (this.fromContentInput === 'input' || !this.subContent)) {
        this.subContentArr = this.tmpSubContentArr = this.form[this.params.field].split(',')
        this.subContent = this.tmpSubContent = this.tmpSubContentArr.join('\r\n')
      }
    },
    dialogEnter () {
      this.fromContentInput = 'textarea'
      if (this.isCancelSubContent) {
        this.form[this.params.field] = '';
        this.subContent = ''
        this.subContentArr = []
      }
      let tmpSubContentArr = [];
      if (this.tmpSubContent) {
        tmpSubContentArr = this.tmpSubContent.split(/[(\r\n)(\s\n)\r\n]+/);
        tmpSubContentArr = tmpSubContentArr.filter(item => item && item.trim());

        if (this.limitFieldNum) {
          if (tmpSubContentArr.length > this.limitFieldNum) {
            this.$message({
              message: `最多允许搜索${this.limitFieldNum}条数据`,
              type: 'warning'
            })
          }
          tmpSubContentArr = tmpSubContentArr.slice(0, this.limitFieldNum) // 截取前100个值
        }
      }
      this.subContent = this.tmpSubContent = tmpSubContentArr.join('\r\n')
      this.subContentArr = this.tmpSubContentArr = tmpSubContentArr;
      this.form[this.params.field] = tmpSubContentArr.join(',');
      this.dialogVisible = false;
    },
    deleteTag (event, tag) {
      this.fromContentInput = 'input'
      this.form[this.params.field] = '';
      this.subContent = '';
      this.subContentArr = [];
      this.tmpSubContent = '';
      this.tmpSubContentArr = '';
      event.stopPropagation();
    },
    clear () {
      this.fromContentInput = 'input'
      this.form[this.params.field] = '';
      this.subContent = '';
      this.subContentArr = [];
      this.tmpSubContent = '';
      this.tmpSubContentArr = '';
      this.dialogVisible = false;
      this.isCancelSubContent = false;
    },
    handleSubContentChange () {
      let tmpSubContentArr = [];
      if (this.tmpSubContent) {
        tmpSubContentArr = this.tmpSubContent.split(/[(\r\n)(\s\n)\r\n]+/);
        tmpSubContentArr = tmpSubContentArr.filter(item => item && item.trim());

        if (this.limitFieldNum) {
          if (tmpSubContentArr.length > this.limitFieldNum) {
            this.$message({
              message: `最多允许搜索${this.limitFieldNum}条数据`,
              type: 'warning'
            })
          }
        }
      }
    },
    clearEmptyArray (arr) {
      return arr.filter(item => item && item.trim());
    },
    // 搜索条件姓名/工号多行复制粘贴格式装换
    formatTransform (val) {
      return val.replace(/，/g, ',')
    },
    beforeDestroy () {
      if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
    }
  }
};
</script>

<style lang="scss">
/* .paste-select-box {
  display: inline-block;
}
.paste-select-box .el-dialog__wrapper {
  position: absolute;
  top: 48px;
  right: 0;
  left: 0;
  overflow: visible;
  margin: 0;
}
.paste-select-box .el-form--inline .el-form-item {
  margin-right: 0;
}
.paste-select-box .paste-select-icon {
  position: absolute;
  // width: 35px;
  width: 26px;
  height: 100%;
  right: 0;
  top: 0;
  text-align: center;
  color: #bfcbd9;
  transition: all 0.3s;
  &.paste-select-icon--mini {
    width: 24px;
    font-size: 14px;
  }
}
.paste-select-box .paste-select-icon:before {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.paste-select-box .paste-select-form {
  display: inline-block;
}
.paste-select-box .paste-select-dialog {
  position: relative;
  width: 100%;
}
.paste-select-dialog .el-form-item {
  margin-bottom: 0;
}
.paste-select-box .el-dialog__header {
  padding: 0;
}
.paste-select-box .el-dialog__body {
  padding: 0;
}
.paste-select-box .el-select__tags {
  position: absolute;
  line-height: normal;
  white-space: normal;
  z-index: 1;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.paste-select-box .el-tag {
  margin: 2px 0 2px 6px;
  .el-icon-close {
    top: -6px;
    // right: 2px;
  }
  &.el-tag--small {
    height: 24px;
    padding: 0 5px;
    line-height: 22px;
    box-sizing: border-box;
    border-color: transparent;
    margin: 2px 0 2px 6px;
    // max-width: 75px;
    display: inline-block;
  }
  &.el-tag--mini {
    height: 20px;
    padding: 0 2px;
    line-height: 19px;
    // .el-select__tags-text {
    //   max-width: 40px;
    // }
    .el-icon-close {
      top: -5px;
      // margin-left: -3px;
      -ms-transform: scale(0.7);
      transform: scale(0.7);
    }
  }
}

.paste-select-box .el-select__tags-text {
  // max-width: 50px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.paste-select-box .el-input--small {
  font-size: 14px;
}
.paste-select-box .el-input--mini,
.paste-select-popover .el-input--mini {
  .el-input__inner {
    padding-right: 24px;
    height: 30px;
  }
  .el-textarea__inner {
    font-size: 12px;
  }
}

.paste-select-box .hidden .el-input__inner {
  color: #fff;
  // font-size: 0;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // overflow: hidden;
}
.paste-select-box .el-input__inner {
  // padding-right: 35px;
  padding-right: 26px;
}
.paste-select-box .el-form-item__label {
  display: none;
}
.paste-select-popover .dialog-footer {
  .el-button {
    min-width: 10px;
  }
}
.paste-select-popover {
  &.el-popover {
    padding: 10px;
  }
}
.paste-select-box-select-select__tags-text-popper-dialog {
  &.el-tooltip__popper {
    max-width: 400px;
    word-break: break-all;
  }
} */
</style>
