##  多行文本复制粘贴输入组件
多行文本复制粘贴输入组件，主要方便可以复制多行excel文本在搜索框精确查询

### 使用指南

```js
import { PasteSelect } from 'mview'
Vue.use(PasteSelect)
```

### 代码演示

<script>
export default {
  data () {
    return {
      ruleForm: {
        legalNamesStr: ''
      }
    }
  },
  methods: {
    // 多选框组件
    pasteSelectChange (data, type) {
      this.ruleForm[type] = data;
      // console.log('pasteSelectChange:', data);
    },
    resetBtn () { // 点击重置按钮，清空姓名
      this.$refs.legalNamesStr && this.$refs.legalNamesStr.clear()
    }
  }
}
</script>
<div class="demo-dialog demo-block">
  <m-paste-select
    ref="legalNamesStr"
    :params="{field: 'legalNamesStr', label: '姓名'}"
    :value="ruleForm.legalNamesStr"
    input-placeholder="请输入员工姓名"
    text-area-placeholder="请在此黏贴多个姓名"
    @change="(value) => pasteSelectChange(value, 'legalNamesStr')"
    width='293'
    label-width='0'
  />
</div>

:::demo
```html
<template>
  <div class="paste-select-example">
    <m-paste-select
      ref="legalNamesStr"
      :params="{field: 'legalNamesStr', label: '姓名'}"
      :value="ruleForm.legalNamesStr"
      input-placeholder="请输入员工姓名"
      text-area-placeholder="请在此黏贴多个姓名"
      @change="(value) => pasteSelectChange(value, 'legalNamesStr')"
      width='293'
      label-width='0'
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        legalNamesStr: ''
      }
    }
  },
  methods: {
    // 多选框组件
    pasteSelectChange (data, type) {
      this.ruleForm[type] = data;
      // console.log('pasteSelectChange:', data);
    },
    resetBtn () { // 点击重置按钮，清空姓名
      this.$refs.legalNamesStr && this.$refs.legalNamesStr.clear()
    }
  }
}
</script>
```
:::

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
params | 输入框字段名以及label中文名 | Object | - | {}
width | 输入框的宽度 | String | - | '240'
disabled | 禁止输入或复制 | Boolean | - | false
maxlength | input输入框最大的输入字符数 | number | - | 5000
input-placeholder | input输入框的提示信息 | String | - | ''
textarea-placeholder | 下拉的textarea框的提示信息 | String | - | ''
label-width | label的长度 | String | - | 0
value | 输入框的默认值 | String| - | ''
limit-field-num | 限制每个字段(输入框)可以输入的条数 | Number | - | 100
size | 输入框的大小 | String | mini/small | small

### Events

事件名称 | 说明 | 回调参数
---|--- | --- |
change | 输入或者粘时触发 | -
clear | 清空输入框的值 | -