## Select选择器

封装element-ui el-select组件，优化多选时的展示效果

### 使用指南

```js
import { Select } from 'mview'
Vue.use(Select)
```

### 代码演示

<script>
export default {
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
      }],
      selectedValue: ['选项2', '选项3'],
      loading: false,
      list: [],
      states: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming']
    }
  },
  mounted () {
    this.list = this.states.map(item => {
      return { value: item, label: item }
    })
  },
  methods: {
    handleChangeSelect (val) {
      console.log('changeSelect: ', val)
    },
    handleVisibleChange (visible) { // 更改select下拉框的状态(展开/收起)
      console.log('handleVisibleChange: ', visible)
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>
<div class="demo-dialog demo-block">
  <m-select
    :options="options"
    custom
    multiple
    filterable
    remote
    :reserve-keyword="true"
    :loading="loading"
    :defaultSelectedValue="selectedValue"
    @visible-change="handleVisibleChange"
    @change="handleChangeSelect"
    @remote-method="remoteMethod"
  />
</div>

:::demo
```html
<template>
  <div class="i-select-demo">
    <m-select
      :options="options"
      custom
      multiple
      filterable
      remote
      :reserve-keyword="true"
      :loading="loading"
      :defaultSelectedValue="selectedValue"
      @visible-change="handleVisibleChange"
      @change="handleChangeSelect"
      @remote-method="remoteMethod"
    />
  </div>
</template>

<script>
export default {
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
      }],
      selectedValue: ['选项2', '选项3'],
      loading: false,
      list: [],
      states: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming']
    }
  },
  mounted () {
    this.list = this.states.map(item => {
      return { value: item, label: item }
    })
  },
  methods: {
    handleChangeSelect (val) {
      console.log('changeSelect: ', val)
    },
    handleVisibleChange (visible) { // 更改select下拉框的状态(展开/收起)
      console.log('handleVisibleChange: ', visible)
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>
```
:::

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
options | 下拉框的选项 | Array | - | []
selectLabelKey | 下拉选择框子选项label字段 | String | - | label
selectValueKey | 下拉选择框子选项的值字段 | String | - | value
inputLabel | 选中为空提示语 | String | - | 请点击选择
inputLabel | 选中为空提示语 | String | - | 请点击选择
width | select框的宽度 | String | - | 220
defaultSelectedValue | 默认下拉框选中的值 | String/Array | - | -

[更多参数请查看](http://element-cn.eleme.io/#/zh-CN/component/select)

### Events

事件名称 | 说明 | 回调参数
---|--- | --- |
change | 选中值发生变化时触发 | -
clear | 清空输入框的值 | -