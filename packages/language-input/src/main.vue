<template>
  <div class="language-input-box">
    <el-popover
      ref="popoverSelectBox"
      trigger="click"
      :title="params.label"
      :width="dialogWidth"
      v-model="dialogVisible"
      placement="bottom-end"
      popper-class="language-input-popover"
    >
      <el-form
        ref="formLanguage"
        @submit.native.prevent
      >
        <el-form-item
          v-for="(item, index) in languageContent"
          :key="index"
          :label="showLabel ? item.languageType : null"
        >
          <el-input
            v-model.trim="item[params.field]"
            :maxlength="maxlength"
            :placeholder="item.placeholder"
          ></el-input>
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
        >取 消</el-button>
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
      class="language-input-form"
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
        <el-input
          ref="referenceSelectBox"
          :size="selectSize"
          :class="{ subject: true }"
          :readonly="dialogVisible"
          v-model.trim="form[params.field]"
          @input="changeInput"
          :disabled="disabled"
          :maxlength="maxlength"
          :placeholder="inputPlaceholder"
        ></el-input>
        <i
          class="icon el-icon-edit-outline language-input-icon"
          :class="['language-input-icon--'+collapseTagSize]"
          @click="openDialog"
          v-popover:popoverSelectBox
        ></i>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import deepClone from '../../utils/deep-clone'
let lang = 'zh-CN'
export default {
  name: 'MiLanguageInput',
  props: {
    params: {
      type: Object,
      required: true,
      default: () => ({})
    },
    content: { // 语言列表数据
      type: Array,
      required: true
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
    labelWidth: {
      type: [String, Number],
      default: '0'
    },
    inputPlaceholder: {
      type: String,
    },
    size: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        languageType: lang,
        [this.params.field]: ''
      },
      dialogVisible: false, // 控制弹框是否展开
      isCancelSubContent: false, // 是否是点击了清空按钮
      inputWidth: this.width
    };
  },
  computed: {
    languageContent () { // 复制父级组件的主题列表
      return deepClone(this.content)
    },
    showLabel () { // 是否展示label
      return !!this.labelWidth && this.labelWidth !== '0'
    },
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
  methods: {
    changeInput () {
      // 给多选的弹出框赋值
      this.languageContent.forEach(item => {
        if (item.languageType === this.form.languageType) {
          item[this.params.field] = this.form[this.params.field]
        }
      })
      this.update(this.languageContent)
    },
    popoverHide () {
      this.handleClose();
    },
    handleClose () {
      this.dialogVisible = false;
    },
    handleCancel () {
      this.dialogVisible = false
    },

    resetInputWidth () {
      if (this.$refs.referenceSelectBox && this.$refs.referenceSelectBox.$el) {
        this.inputWidth = this.$refs.referenceSelectBox.$el.getBoundingClientRect().width;
      }
    },
    openDialog () { },
    dialogEnter () {
      // 给input主题框赋值
      this.languageContent.forEach(item => {
        if (item.languageType === this.form.languageType) {
          this.form[this.params.field] = item[this.params.field]
        }
      })
      this.update(this.languageContent)
      this.dialogVisible = false;
    },
    update (content) {
      this.$emit('change', content)
    },
    clear () { // 清空form表单
      this.form[this.params.field] = ''
      this.languageContent.forEach(item => {
        item[this.params.field] = this.form[this.params.field]
      })
      this.update(this.languageContent)
      this.dialogVisible = false
    },
    handleSubContentChange () {
    },
    clearEmptyArray (arr) {
    },
    // 搜索条件姓名/工号多行复制粘贴格式装换
    formatTransform (val) {
      return val.replace(/，/g, ',')
    }
  }
};
</script>
