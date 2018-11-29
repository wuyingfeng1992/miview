# 城市联动组件

## 参数

```js
@param:
  value: {Array} 默认值
  type: code=返回行政区域代码，text-返回文本, all-返回code和text
  placeholders: {Array} 提示信息
  level: {Number} 显示联动的数量，0 - 一级联动, 1 - 二级联动, 2 - 三级联动
  data: {Object}所有城市的数据

```

## 展示示例

```html
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

```