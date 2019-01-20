### 使用示例
```html
<template>
  <div>
    <el-button type="primary" @click="openDialog">打开弹窗</el-button>
    <i-dialog
      v-model="isShow"
      title="打开"
      size="standard"
      :toolbar="toolbar"
    >
      <div>
        这是个standard弹窗
      </div>
    </i-dialog>
  </div>
</template>
<script>
  import IDialog from '../../packages/dialog/index'

  export default {
    components: {
      IDialog
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