## BackTop 回到顶部

### 使用指南

```js
import { BackTop } from 'miview'
Vue.use(BackTop)
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
        // console.log('scrollToBottom: ', this.height)
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
<div class="demo-back-top demo-block">
  <el-button @click="scrollToBottom">查看效果</el-button>
  <mi-back-top />
</div>

:::demo

```html
<mi-back-top />
```
:::