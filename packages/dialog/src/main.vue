<template>
  <el-dialog
    ref="elDialog"
    :visible.sync="isShow"
    v-if="!destroyedWhenClose || isShow"
    :width="setWidth"
    :class="['i-dialog', customClass, modeClass]"
    @close="handleDialogClose"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :center="center"
    :before-close="closeBefore"
    :title="title"
    :show-close="showClose"
    :modal="getModal"
    :append-to-body="appendToBody"
    v-drag
  >
    <div class="customBody">
      <slot></slot>
    </div>
    <div
      v-if="toolbar && toolbar.length"
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        v-for="(btn, idx) of toolbar"
        v-show="!btn.hide"
        :disabled="btn.disabled"
        :loading="btn.loading"
        :key="idx"
        :type="btn.type || 'primary'"
        @click="handleClick(btn)"
      >
        {{btn.text}}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Drag from '../../directives/drag.js'
export default {
  name: 'MDialog',
  directives: { Drag },
  props: {
    mode: {
      type: String,
      default: 'standard'
    },
    width: String,
    appendToBody: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false,
    },
    beforeClose: Function,
    destroyedWhenClose: Boolean,
    toolbar: {
      type: Array,
      default: () => ([])
    },
    modal: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    value: Boolean,
    title: String,
    size: { // 弹窗显示宽度 | String | mini/small/standard/large/huge | standard
      type: String,
      default: 'standard'
    },
    customClass: String
  },
  data () {
    return {
      isShow: this.value,
      sizeMap: {
        'huge': '1200px',
        'large': '900px',
        'standard': '700px',
        'small': '500px',
        'mini': '350px'
      }
    }
  },
  watch: {
    value (value) {
      this.isShow = value
    }
  },
  computed: {
    modeClass () {
      return this.mode === 'popup' && 'popup'
    },
    getModal () {
      return this.mode === 'popup' ? false : this.modal
    },
    setWidth () {
      let width = ''
      if (this.mode === 'popup') {
        width = '100%'
      } else {
        width = this.width || this.sizeMap[this.size]
      }
      return width
    }
  },
  methods: {
    closeBefore (done) {
      if (this.beforeClose) {
        this.beforeClose(() => {
          done()
          this.$emit('input', false)
        })
      } else {
        done()
        this.$emit('input', false)
      }
    },
    handleDialogClose () {
      this.$emit('input', false)
      this.$emit('close')
    },
    done () {
      this.handleDialogClose()
    },
    setDialogAttribute (vm) { },
    handleCancel () {
      this.handleDialogClose()
      this.$emit('cancel')
    },
    handleConfirm () {
      this.handleDialogClose()
      this.$emit('confirm')
    },
    handleClick (btn) {
      const { throttle, func } = btn

      if (throttle) {
        this.setLoadingBtn(btn, true)

        func && func(this.done).then(() => {
          this.setLoadingBtn(btn, false)
        }).catch(() => {
          this.setLoadingBtn(btn, false)
        })
      } else {
        func && func(this.done)
      }
    },
    /** 节流条件下设置按钮禁用属性 */
    setLoadingBtn (btn, isLoading) {
      this.$set(btn, 'loading', isLoading)
    }
  }
}
</script>

<style>
</style>
