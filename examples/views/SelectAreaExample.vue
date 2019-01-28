<template>
  <div class="select-area-example">
    <mi-select-area
      v-model="selected"
      :data="pcaa"
      :level="2"
      type="all"
    />
  </div>
</template>

<script>
import { pcaa } from 'area-data'
export default {
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
