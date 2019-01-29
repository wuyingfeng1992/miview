<template>
  <div :class="`${prefix}-move-trigger`">
    <div :class="`${prefix}-move-trigger-point`">
      <i></i><i></i><i></i><i></i><i></i>
    </div>
  </div>
</template>

<script>
import Mixin from '../mixin'
export default {
  name: 'MiDragDrawerTrigger',
  mixins: [Mixin]
}
</script>
<style lang="scss" src="../index.scss">
</style>
