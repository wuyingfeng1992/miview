<template>
  <div class="tree-select-example">
    <m-tree-select
      :data="data"
      :show-checkbox="true"
      :check-on-click-node="true"
    />
  </div>
</template>

<script>
// import ITreeSelect from '../../packages/tree-select/index'
export default {
  // components: {
  //   ITreeSelect
  // },
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1 look up look up look up look up look up look up look up look up look up'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }]
    }
  }
}
</script>

<style>
</style>
