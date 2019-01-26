## LanguageInput 多语言

### 使用指南

```js
import { LanguageInput } from 'miview'
Vue.use(LanguageInput)
```

### 代码演示

<script>
export default {
  data () {
    return {
      content: [
        {languageType: 'zh-CN', subject: '', placeholder: '中文'},
        {languageType: 'en-US', subject: '', placeholder: '英文'},
        {languageType: 'ja-JP', subject: '', placeholder: '日文'},
      ]
    }
  },
  methods: {
    // 多选框组件
    subjectChange (data, type) {
      console.log('subjectChange: ', data)
    },
    updateBtn () { // 更新主题
      const today = new Date()
      const subject = today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds()
      const content = JSON.parse(JSON.stringify(this.content))
      content.forEach(item => {
        item.subject = subject
      })
      this.$refs.subject && this.$refs.subject.update(content)
    },
    resetBtn () { // 点击重置按钮，清空多语言
      this.$refs.subject && this.$refs.subject.clear()
    }
  }
}
</script>
<div class="demo-dialog demo-block">
  <el-button type="primary" @click="resetBtn" size="small">重置</el-button>
  <el-button type="primary" @click="updateBtn" size="small">更新数据</el-button>
  <mi-language-input
    ref="subject"
    :params="{field: 'subject', label: '多语言'}"
    :content="content"
    input-placeholder="请输入主题"
    width='293'
    label-width='0'
    @change="(value) => subjectChange(value, 'subject')"
  />
</div>

:::demo
```html
<script>
export default {
  data () {
    return {
      content: [
        {languageType: 'zh-CN', subject: '', placeholder: '中文'},
        {languageType: 'en-US', subject: '', placeholder: '英文'},
        {languageType: 'ja-JP', subject: '', placeholder: '日文'},
      ]
    }
  },
  methods: {
    // 多选框组件
    subjectChange (data, type) {
      console.log('subjectChange: ', data)
    },
    resetBtn () { // 点击重置按钮，清空多语言
      this.$refs.subject && this.$refs.subject.clear()
    }
  }
}
</script>
<div class="demo-dialog demo-block">
  <el-button type="primary" @click="resetBtn" size="small">重置</el-button>
  <mi-language-input
    ref="subject"
    :params="{field: 'subject', label: '多语言'}"
    :content="content"
    input-placeholder="请输入主题"
    width='293'
    label-width='0'
    @change="(value) => subjectChange(value, 'subject')"
  />
</div>
```
:::

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
params | 自定义提交字段 | Object | - | -
content | 语言列表数据 | Array | - | -
maxlength | 主题框允许输入的字符长度 | Number | - | 100
disabled | 是否禁用 | Boolean | - | false
placeholder | 主题框的占位符 | String | - | -
width | 主题框的宽度 | String/Number | - | 240
label-width | label的宽度, 为0时隐藏label | String/Number | - | 0

### params API参数

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
field | 自定义提交字段 | String | - | -
label | label 国际化 | String | - | -
