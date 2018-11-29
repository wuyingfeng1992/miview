<template>
  <div class="select-area-example">
    <select-area v-model="selected" :data="pcaa" :level="2" type="all" />
  </div>
</template>

<script>
import { pcaa } from 'area-data'
import SelectArea from '../../packages/select-area/index'
export default {
  components: {
    SelectArea
  },
  data () {
    return {
      selected: ['440000', '440100', '440103'],
      pcaa
    }
  },
  watch: {
    'selected': {
      handler (val) {
        console.log('选择的地区 ', val);
      }
    }
  }
}
</script>

<style>

</style>
