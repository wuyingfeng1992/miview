## Dialog 弹框

---

### 使用示例
<script>
export default {
  data () {
    return {
      isShow: false,
      toolbar: [{
        text: '确定',
        type: 'primary',
        func: (done) => {
          console.log('confirm')
          done()
        }
      }, {
        text: '取消',
        type: 'text',
        func: (done) => {
          console.log('cancel')
          done()
        }
      }]
    }
  },
  methods: {
    openDialog () {
      this.isShow = true
    }
  }
}
</script>
<div class="demo-dialog demo-block">
  <button @click="openDialog">打开弹窗</button>
  <m-dialog
      v-model="isShow"
      title="打开"
      size="standard"
      :toolbar="toolbar"
    >
      <div>
        这是个standard弹窗
      </div>
    </m-dialog>
  </div>
</div>

:::demo
```html
<template>
  <div>
    <el-button type="primary" @click="openDialog">打开弹窗</el-button>
    <m-dialog
      v-model="isShow"
      title="打开"
      size="standard"
      :toolbar="toolbar"
    >
      <div>
        这是个standard弹窗
      </div>
    </m-dialog>
  </div>
</template>
<script>
  import MDialog from '../../packages/dialog/index'

  export default {
    components: {
      MDialog
    },
    data () {
      return {
        isShow: false,
        toolbar: [{
          text: '确定',
          type: 'primary',
          func: (done) => {
            console.log('confirm')
            done()
          }
        }, {
          text: '取消',
          type: 'text',
          func: (done) => {
            console.log('cancel')
            done()
          }
        }]
      }
    },
    methods: {
      openDialog () {
        this.isShow = true
      }
    }
  }
</script>
```
:::