<template>
  <transition name="dialog-fade">
    <div
      class="el-dialog__wrapper img-dialog-wrapper"
      v-show="visible"
    >
      <!-- <div class="el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick"> -->
      <div
        class="el-dialog"
        :class="[sizeClass, customClass]"
        ref="dialog"
        :style="style"
      >
        <button
          type="button"
          class="el-dialog__headerbtn img-dialog-button"
          aria-label="Close"
          v-if="showClose"
          @click="handleClose"
        >
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
        <div
          class="img-container"
          v-if="rendered && visible"
          ref="imgContainer"
          @click="handleImgContainerClick"
          :style="{'bottom': isMenu ? '60px': 0}"
        >
          <div
            class="img-wrapper"
            ref="imgWrapper"
            v-imgDialogDrag
            :style="{'transition': `${imgTransition}s`, 'transform': `translate(-50%,-50%) rotate(${rotateVal}deg) scale(${scaleVal})`}"
            @mousedown="touchStart"
            @mousemove="touchMove"
            @mouseup="touchEnd"
          >
            <!-- <slot></slot> -->
            <img
              ref="imgRef"
              :src="previewUrl"
              alt=""
            >
          </div>
        </div>
        <div
          class="menu-wrapper"
          v-if="isMenu"
        >
          <div class="menu-list clearfix">
            <div
              class="item left-rotate"
              @click="rotateImg(-1)"
              v-if="isRotate"
            ></div>
            <div
              class="item right-rotate"
              @click="rotateImg(1)"
              v-if="isRotate"
            ></div>
            <div
              class="item big"
              @click="scaleImg(1)"
              v-if="isScale"
            ></div>
            <div
              class="item small"
              @click="scaleImg(-1)"
              v-if="isScale"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'element-ui/src/utils/popup';
import emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'MSimpleImgPreview',

  mixins: [Popup, emitter],
  directives: {
    imgDialogDrag: {
      bind: function (el) {
        el.style.cursor = 'move';
        el.onmousedown = function (e) {
          e.stopPropagation();
          e.preventDefault();
          let l = e.clientX - el.offsetLeft;
          let t = e.clientY - el.offsetTop;
          document.onmousemove = function (e) {
            e.stopPropagation();
            e.preventDefault();
            el.style.left = e.clientX - l + 'px';
            el.style.top = e.clientY - t + 'px';
          };
          el.onmouseup = function () {
            document.onmousemove = null;
            el.onmouseup = null;
          }
        }
      },
      unbind: function (el) {
        document.onmousemove = null;
        el.onmouseup = null;
      }
    }
  },

  props: {
    previewUrl: {
      type: String,
      default: ''
    },
    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: false
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    size: {
      type: String,
      default: 'small'
    },

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15%'
    },
    width: {
      type: String,
      default: '1200px'
    },
    height: {
      type: String,
      default: '300px'
    },
    beforeClose: Function,
    isMenu: {
      type: Boolean,
      default: true
    },
    // 是否旋转
    isRotate: {
      type: Boolean,
      default: true
    },
    // 是否缩放
    isScale: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      rotateVal: 0,
      scaleVal: 1,
      removeClose: true,
      startMove: false,
      imgLeft: 0,
      imgTop: 0,
      startX: 0,
      startY: 0,
      disX: 0,
      disY: 0,
      lastDisX: 0,
      lastDisY: 0,
      imgTransition: 0.3
    }
  },
  watch: {
    visible (val) {
      this.$emit('update:visible', val);
      if (val) {
        this.rotateVal = 0;
        this.scaleVal = 1;
        this.$emit('open');
        this.$el.addEventListener('scroll', this.updatePopper);
        this.$nextTick(() => {
          this.handleImageLoad()

          // if (this.$refs.imgRef && this.$refs.imgWrapper) {
          //   let { width, height } = this.$refs.imgRef
          //   console.log('imgDialogDrag style =====> ', width, height)
          //   if (width >= 1920) {
          //     width = 1920
          //   }
          //   if (width && height) {
          //     this.$refs.imgWrapper.style.width = width + 'px'
          //     this.$refs.imgWrapper.style.height = height + 'px'
          //   }
          // }
          // this.$refs.dialog.scrollTop = 0;
        });
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper);
        this.$emit('close');
      }
    }
  },

  computed: {
    sizeClass () {
      return `el-dialog--${this.size}`;
    },
    style () {
      return this.size === 'full' ? {} : { 'top': this.top, 'width': this.width, 'height': this.height };
    }
  },

  methods: {
    handleWrapperClick (e) {
      if (!this.closeOnClickModal) return;
      this.handleClose(e);
    },
    handleImgContainerClick (e) {
      if (e.target !== e.currentTarget) {
        return
      }
      this.handleClose()
    },
    handleClose (e) {
      document.onmousemove = null;

      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('visible-change', false);
      }
    },
    updatePopper () {
      this.broadcast('ElSelectDropdown', 'updatePopper');
      this.broadcast('ElDropdownMenu', 'updatePopper');
    },
    rotateImg (way) {
      way === -1 ? this.rotateVal -= 90 : this.rotateVal += 90;
    },
    scaleImg (way, scale) {
      const oldVal = this.scaleVal;
      scale = scale || 0.1;
      if (way === -1) {
        if (this.scaleVal <= 0.5) {
          this.scaleVal = oldVal;
        } else {
          this.scaleVal -= scale;
        }
      } else {
        if (this.scaleVal >= 2) {
          this.scaleVal = oldVal;
        } else {
          this.scaleVal += scale;
        }
      }
    },
    // 触摸开始
    touchStart (e) {
      e.stopPropagation();
      e.preventDefault();
      e = e || event;
      this.imgTransition = 0;
      this.removeClose = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startMove = true;
    },
    // 滑动过程
    touchMove (e) {
      e = e || event;
      if (this.startMove) {
        this.disX = e.clientX - this.startX;
        this.disY = e.clientY - this.startY;
        this.imgLeft = this.left - this.lastDisX + this.disX;
        this.imgTop = this.top - this.lastDisY + this.disY;
        this.lastDisX = this.disX;
        this.lastDisY = this.disY;
        this.removeClose = false;
      }
    },
    // 滑动结束
    touchEnd (e) {
      this.imgTransition = 0.3;
      this.startMove = false;
      this.lastDisX = 0;
      this.lastDisY = 0;
    },
    handleImageLoad () {
      this.$refs.imgRef.addEventListener('load', this.listenImageLoad, false)
    },
    listenImageLoad () {
      console.log('加载完成');
      if (this.$refs.imgRef && this.$refs.imgWrapper) {
        let { width, height } = this.$refs.imgRef
        console.log('imgDialogDrag style =====> ', width, height)
        if (width >= 1920) {
          width = 1920
        }
        // this.handleImageLoad()
        if (width && height) {
          this.$refs.imgWrapper.style.width = width + 'px'
          this.$refs.imgWrapper.style.height = height + 'px'
        }
      }
      this.$refs.dialog.scrollTop = 0;
    }
  },

  mounted () {
    if (this.visible) {
      this.rendered = true;
      this.open();
    }
  }
};
</script>
<style lang="scss" scoped>
$menuWrapperHeight: 60px;
.el-dialog__wrapper {
  &.img-dialog-wrapper {
    background-color: rgba(0, 0, 0, 0.2); // 遮罩
  }
  .el-dialog {
    position: relative;
    transform: none;
    margin: 0;
    border-radius: 0;
    top: 0 !important;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    background: transparent;
    box-shadow: none;
  }
  .img-dialog-button {
    padding: 20px 10px;
    position: fixed;
    right: 0px;
    z-index: 999;
  }
  .img-container {
    width: 100%;
    height: 100%;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: $menuWrapperHeight;
    .img-wrapper {
      position: absolute;
      width: 80%;
      height: auto;
      left: 50%;
      top: 50%;
      overflow: auto;
    }
    img {
      // position: fixed;
      // top: 0;
      // left: 0;
      // right: 0;
      // bottom: 0;
      max-width: 100%;
      // max-height: 100%;
      display: block;
    }
  }
  .menu-wrapper {
    position: fixed;
    height: $menuWrapperHeight;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f2f2f2;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    text-align: center;
    margin: 0 auto;

    .menu-list {
      display: inline-block;
      width: 240px;
      text-align: center;
      font-size: 0;
    }
    .item {
      float: left;
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      height: 40px;
      margin: 10px 10px;
      &.left-rotate {
        background: url("./assets/img/left-rotate.png") no-repeat center center;
      }
      &.right-rotate {
        background: url("./assets/img/right-rotate.png") no-repeat center center;
      }
      &.big {
        background: url("./assets/img/zoom-in.png") no-repeat center center;
      }
      &.small {
        background: url("./assets/img/zoom-out.png") no-repeat center center;
      }
      &.disabled {
        opacity: 0.2;
      }
    }
  }
}
</style>

<style lang="scss">
.el-dialog__wrapper {
  .el-dialog {
    .img-container {
      .img-wrapper {
        img {
          max-width: 100%;
          // max-height: 100%;
          display: block;
        }
      }
    }
  }
}
</style>
