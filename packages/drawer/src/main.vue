<template>
  <div
    v-transfer-dom
    :data-transfer="transfer"
  >
    <transition name="fade">
      <div
        :class="maskClasses"
        :style="maskStyle"
        v-show="visible"
        v-if="mask"
        @click="handleMask"
      ></div>
    </transition>
    <div
      :class="wrapClasses"
      @click="handleWrapClick"
    >
      <transition :name="'move-'+ placement">
        <div
          :class="classes"
          :style="mainStyles"
          v-show="visible"
        >
          <div
            :class="contentClasses"
            ref="content"
          >
            <a
              class="mi-drawer-close"
              v-if="closable"
              @click="close"
            >
              <slot name="close">
                <i class="el-icon-close"></i>
              </slot>
            </a>
            <div
              :class="[prefixCls + '-header']"
              v-if="showHead"
            >
              <slot name="header">
                <div :class="[prefixCls + '-header-inner']">
                  {{title}}
                </div>
              </slot>
            </div>
            <div
              :class="[prefixCls + '-body']"
              :style="styles"
            >
              <slot></slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter'
import { oneOf, findBrothersComponents, findComponentsUpward } from '../../utils/assist'
import TransferDom from '../../directives/transfer-dom'
import ScrollbarMixins from '../../mixins/scrollbar'

const prefixCls = 'mi-drawer'

export default {
  name: 'MiDrawer',
  mixins: [emitter, ScrollbarMixins],
  directives: { TransferDom },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 256
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskStyle: {
      type: Object
    },
    styles: {
      type: Object
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    placement: {
      validator (value) {
        return oneOf(value, ['left', 'right'])
      },
      default: 'right'
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    transfer: {
      Boolean,
      default: false
    },
    className: {
      type: String
    },
    inner: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      visible: this.value,
      wrapShow: false,
      showHead: true,
      timer: null
    }
  },
  computed: {
    wrapClasses () {
      return [
        `${prefixCls}-wrap`,
        {
          [`${prefixCls}-hidden`]: !this.wrapShow,
          [`${this.className}`]: !!this.className,
          [`${prefixCls}-no-mask`]: !this.mask,
          [`${prefixCls}-wrap-inner`]: this.inner
        }
      ]
    },
    mainStyles () {
      let style = {}
      const width = parseInt(this.width, 10)
      const styleWidth = {
        width: width <= 100 ? `${width}%` : `${width}px`
      }
      Object.assign(style, styleWidth)
      return style
    },
    contentClasses () {
      return [
        `${prefixCls}-content`,
        {
          [`${prefixCls}-content-no-mask`]: !this.mask
        }
      ]
    },
    classes () {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.placement}`,
        {
          [`${prefixCls}-no-header`]: !this.showHead,
          [`${prefixCls}-inner`]: this.inner
        }
      ]
    },
    maskClasses () {
      return [
        `${prefixCls}-mask`,
        {
          [`${prefixCls}-mask-inner`]: this.inner
        }
      ]
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      if (val) {
        if (this.timer) clearTimeout(this.timer)
        this.wrapShow = true
        if (!this.scrollable) {
          this.addScrollEffect()
        }
        this.$emit('on-visible-change', val)
      } else {
        this.timer = setTimeout(() => {
          this.wrapShow = false
          // Check if there are any drawers left at the parent level
          const brotherDrawers = findBrothersComponents(this, 'MiDrawer') || []
          const parentDrawers = findComponentsUpward(this, 'MiDrawer') || []

          const otherDrawers = [].concat(brotherDrawers).concat(parentDrawers)

          const isScrollDrawer = otherDrawers.some(item => item.visible && !item.scrollable)

          if (!isScrollDrawer) {
            this.removeScrollEffect();
          }
        }, 300)
      }
    },
    scrollable (val) {
      if (!val) {
        this.addScrollEffect()
      } else {
        this.removeScrollEffect()
      }
    },
    title (val) {
      if (this.$slots.header === undefined) {
        this.showHead = !!val
      }
    }
  },
  mounted () {
    if (this.visible) {
      this.wrapShow = true
    }

    let showHead = true
    if (this.$slots.header === undefined && !this.title) {
      showHead = false
    }
    this.showHead = showHead
  },
  beforeDestroy () {
    this.removeScrollEffect()
  },
  methods: {
    close () {
      this.visible = false
      this.$emit('input', false)
      this.$emit('on-close')
    },
    handleMask () {
      if (this.maskClosable && this.mask) {
        this.close()
      }
    },
    handleWrapClick (event) {
      const className = event.target.getAttribute('class')
      if (className && className.indexOf(`${prefixCls}-wrap`) > -1) this.handleMask()
    }
  }
}
</script>
