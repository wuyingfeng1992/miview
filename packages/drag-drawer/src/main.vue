<template>
  <div class="mi-drag-drawer-box">
    <transition name="fade">
      <div class="mi-drag-drawer-mask"></div>
    </transition>
    <div :class="outerClasses">
      <div class="mi-drawer mi-drawer-left mi-drawer-inner">

      </div>
    </div>
  </div>
</template>

<script>
// https://admin.iviewui.com/components/drag_drawer_page
// https://github.com/iview/iview-admin/blob/master/src/components/drag-drawer/drag-drawer.vue
import DragDrawerTrigger from './drag-drawer-trigger.vue'
import Mixin from '../mixin'
export default {
  name: 'MiDragDrawer',
  components: {
    DragDrawerTrigger
  },
  mixins: [Mixin],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 256
    },
    // 是否可拖动修改宽度
    draggable: {
      type: Boolean,
      default: false
    },
    // 最小拖动宽度
    minWidth: {
      type: [String, Number],
      default: 256
    }
  },
  data () {
    return {
      canMove: false,
      wrapperWidth: 0,
      wrapperLeft: 0
    }
  },
  computed: {
    outerClasses () {
      const classesArray = [
        `${this.prefix}-wrap`,
        `${this.prefix}-wrapper`,
        this.canMove ? 'no-select pointer-events-none' : ''
      ]
      return classesArray.join(' ')
    },
    placement () {
      return this.$attrs.placement
    },
    innerWidth () {
      const width = this.width
      return width <= 100 ? (this.wrapperWidth * width) / 100 : width
    },
    triggerStyle () {
      return {
        [this.placement]: `${this.innerWidth}px`,
        position: this.$attrs.inner ? 'absolute' : 'fixed'
      }
    }
  }
}
</script>

