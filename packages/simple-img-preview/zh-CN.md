## SimpleImgPreview 图片预览器

### 使用指南

```js
import { SimpleImgPreview } from 'miview'
Vue.use(SimpleImgPreview)
```

### 代码演示

<div class="demo-dialog demo-block">
  <div class="img-preview">
    <el-button
      type="primary"
      @click="handlePreview"
    >预览图片</el-button>
    <mi-simple-img-preview
      :visible.sync="previewVisible"
      :previewUrl="previewUrl"
    />
  </div>
</div>

<script>
export default {
  data () {
    return {
      previewVisible: false,
      previewUrl: 'https://img03.sogoucdn.com/app/a/200841/ea4458111b71267d6583e5fa612fc391'
    }
  },
  methods: {
    handlePreview () {
      this.previewVisible = true
      // this.previewUrl = 'https://img03.sogoucdn.com/app/a/200841/ea4458111b71267d6583e5fa612fc391'
    }
  }
}
</script>

:::demo
```html
<template>
  <div class="img-preview">
    <el-button
      type="primary"
      @click="handlePreview"
    >预览图片</el-button>
    <simple-img-preview
      :visible.sync="previewVisible"
      :previewUrl="previewUrl"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      previewVisible: false,
      previewUrl: 'https://img03.sogoucdn.com/app/a/200841/ea4458111b71267d6583e5fa612fc391'
    }
  },
  methods: {
    handlePreview () {
      this.previewVisible = true
      // this.previewUrl = 'https://img03.sogoucdn.com/app/a/200841/ea4458111b71267d6583e5fa612fc391'
    }
  }
}
</script>
```
:::