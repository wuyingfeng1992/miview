<template>
  <div class="i-select-demo">
    <i-select
      :options="options"
      custom
      multiple
    />
  </div>
</template>

<script>
import ISelect from '../../packages/select/index'
export default {
  components: {
    ISelect
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  }
}
</script>

<style>
</style>
