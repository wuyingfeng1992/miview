## TreeSelect 选择器

### 使用指南

```js
import { TreeSelect } from 'miview'
Vue.use(TreeSelect)
```

### 代码演示

#### 基础用法

<div class="demo-back-top demo-block">
  <div class="tree-select-example">
    <mi-tree-select
      :data="data"
      v-model="selected"
      clearable
    />
  </div>
</div>
<script>
export default {
  data () {
    return {
      selected: '2_1_1', // 默认选中的值
      selected2: ['2_1_1', '3', '2_2_1'], // 默认选中的值
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
          id: '2_2',
          children: [{
            label: '三级 2-2-1',
            id: '2_2_1'
          }]
        }]
      }, {
        label: '一级 3',
        id: '3',
        children: [{
          label: '二级 3-1',
          id: '3_1',
          children: [{
            label: '三级 3-1-1',
            id: '3_1_1'
          }]
        }, {
          label: '二级 3-2',
          id: '3_2',
          children: [{
            label: '三级 3-2-1',
            id: '3_2_1'
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
      multiple
      is-single-line
      :check-on-click-node="true"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '2_1_1', // 默认选中的值
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
          id: '2_2',
          children: [{
            label: '三级 2-2-1',
            id: '2_2_1'
          }]
        }]
      }, {
        label: '一级 3',
        id: '3',
        children: [{
          label: '二级 3-1',
          id: '3_1',
          children: [{
            label: '三级 3-1-1',
            id: '3_1_1'
          }]
        }, {
          label: '二级 3-2',
          id: '3_2',
          children: [{
            label: '三级 3-2-1',
            id: '3_2_1'
          }]
        }]
      }]
    }
  }
}
</script>
```
:::

#### 多选

<div class="demo-back-top demo-block">
  <div class="tree-select-example">
    <mi-tree-select
      :data="data"
      v-model="selected2"
      multiple
      filterable
      is-single-line
      :check-on-click-node="false"
    />
  </div>
</div>
<script>
export default {
  data () {
    return {
      selected2: ['2_1_1', '3', '2_2_1'], // 默认选中的值
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
          id: '2_2',
          children: [{
            label: '三级 2-2-1',
            id: '2_2_1'
          }]
        }]
      }, {
        label: '一级 3',
        id: '3',
        children: [{
          label: '二级 3-1',
          id: '3_1',
          children: [{
            label: '三级 3-1-1',
            id: '3_1_1'
          }]
        }, {
          label: '二级 3-2',
          id: '3_2',
          children: [{
            label: '三级 3-2-1',
            id: '3_2_1'
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
      multiple
      filterable
      is-single-line
      :check-on-click-node="false"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected2: ['2_1_1', '3', '2_2_1'], // 默认选中的值
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
          id: '2_2',
          children: [{
            label: '三级 2-2-1',
            id: '2_2_1'
          }]
        }]
      }, {
        label: '一级 3',
        id: '3',
        children: [{
          label: '二级 3-1',
          id: '3_1',
          children: [{
            label: '三级 3-1-1',
            id: '3_1_1'
          }]
        }, {
          label: '二级 3-2',
          id: '3_2',
          children: [{
            label: '三级 3-2-1',
            id: '3_2_1'
          }]
        }]
      }]
    }
  }
}
</script>
```
:::

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
data | 树形组件数据 | Array | - | []
props | 树节点配置选项 | Object | - | {}
multiple | 是否多选 | Boolean | - | false
disabled | 是否禁用 | Boolean | - | false
node-key | 	每个树节点用来作为唯一标识的属性 | String | - | id
popover-visible-arrow | 是否显示 Tooltip 箭头 | Boolean | - | false
check-on-click-node | 是否在点击节点的时候选中节点 | Boolean | - | false
empty-text | 内容为空的时候展示的文本 | String | - | -
tree-icon-class | 自定义树节点的图标 | String | - | -
placeholder | 占位符 | String | - | 请选择
filterable | 可搜索 | Boolean | - | false
width | select框的宽度 | String | - | 220

[更多参数请查看](http://element-cn.eleme.io/#/zh-CN/component/tree)

### Events

事件名称 | 说明 | 回调参数
---|--- | --- |
change | 选中值发生变化时触发 | -
clear | 清空输入框的值 | -