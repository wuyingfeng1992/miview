## TreeSelect 选择器

### 使用指南

```js
import { TreeSelect } from 'miview'
Vue.use(TreeSelect)
```

### 代码演示

<div class="demo-back-top demo-block">
  <div class="tree-select-example">
    <mi-tree-select
      :data="data"
      v-model="selected"
      :show-checkbox="true"
      :check-on-click-node="true"
    />
  </div>
</div>
<script>
export default {
  data () {
    return {
      selected: '1-1', // 默认选中的值
      data: [{
        label: '一级 1',
        id: '1',
        children: [{
          label: '二级 1-1',
          id: '1_1',
          children: [{
            label: '三级 1-1-1 look up look up look up look up look up look up look up look up look up',
            id: '1_1_1'
          }]
        }]
      }, {
        label: '一级 2',
        id: '2',
        children: [{
          label: '二级 2-1',
          id: '2_1',
          children: [{
            label: '三级 2-1-1',
            id: '2_1_1'
          }]
        }, {
          label: '二级 2-2',
          id: '2-2',
          children: [{
            label: '三级 2-2-1',
            id: '2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        id: '3',
        children: [{
          label: '二级 3-1',
          id: '3-1',
          children: [{
            label: '三级 3-1-1',
            id: '3-1-1'
          }]
        }, {
          label: '二级 3-2',
          id: '3-2',
          children: [{
            label: '三级 3-2-1',
            id: '3-2-1'
          }]
        }]
      }]
    }
  }
}
</script>

:::demo
```html
<template>
  <div class="tree-select-example">
    <mi-tree-select
      :data="data"
      v-model="selected"
      :show-checkbox="true"
      :check-on-click-node="true"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '1-1', // 默认选中的值
      data: [{
        label: '一级 1',
        value: '1',
        children: [{
          label: '二级 1-1',
          value: '1-1',
          children: [{
            label: '三级 1-1-1 look up look up look up look up look up look up look up look up look up',
            value: '1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        value: '2',
        children: [{
          label: '二级 2-1',
          value: '2-1',
          children: [{
            label: '三级 2-1-1',
            value: '2-1-1'
          }]
        }, {
          label: '二级 2-2',
          value: '2-2',
          children: [{
            label: '三级 2-2-1',
            value: '2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        value: '3',
        children: [{
          label: '二级 3-1',
          value: '3-1',
          children: [{
            label: '三级 3-1-1',
            value: '3-1-1'
          }]
        }, {
          label: '二级 3-2',
          value: '3-2',
          children: [{
            label: '三级 3-2-1',
            value: '3-2-1'
          }]
        }]
      }]
    }
  }
}
</script>
```
:::