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