## BackTop 回到顶部

### 使用指南

```js
import { BackToTop } from 'mview'
Vue.use(BackToTop)
```

### 代码演示
<script>
  export default {
    data () {
      return {
        height: document.documentElement.clientHeight
      }
    },
    methods: {
      scrollToBottom () {
        console.log('scrollToBottom: ', this.height)
        window.scrollTo(0, this.height + 80 + 96 + 60)
      }
    }
  }
  </script>
<style>
.container > .view {
  min-height: 200vh;
}
</style>
<div class="demo-back-to-top demo-block">
  <el-button @click="scrollToBottom">查看效果</el-button>
  <m-back-to-top />
</div>

:::demo

```html
<m-back-to-top />
```
:::