## Dialog 弹框

### 使用指南

```js
import { Dialog } from 'miview'
Vue.use(Dialog)
```

### 代码演示

#### 消息提示

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
      }],
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    openDialog () {
      this.isShow = true
    },
    openTableDialog () {
      this.dialogTableVisible = true
    },
    openFormDialog () {
      this.dialogFormVisible = true
    },
    closeFormDialog () {
      this.dialogFormVisible = false
    }
  }
}
</script>
<div class="demo-dialog demo-block">
  <el-button type="text" @click="openDialog">点击打开 Dialog</el-button>
  <mi-dialog
      v-model="isShow"
      title="打开"
      size="standard"
      :toolbar="toolbar"
    >
      <div>
        这是个standard弹窗
      </div>
    </mi-dialog>
  </div>
</div>

:::demo
```html
<template>
  <div>
    <el-button type="text" @click="openDialog">点击打开 Dialog</el-button>
    <mi-dialog
      v-model="isShow"
      title="打开"
      size="standard"
      :toolbar="toolbar"
    >
      <div>
        这是个standard弹窗
      </div>
    </mi-dialog>
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

### 自定义内容

Dialog 组件的内容是可以任意的，甚至是表格或表单

<div class="demo-dialog demo-block">
  <!-- Table -->
  <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
  <mi-dialog title="收货地址" v-model="dialogTableVisible">
    <el-table :data="gridData">
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </mi-dialog>

  <!-- Form -->
  <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

  <mi-dialog title="收货地址" v-model="dialogFormVisible" :toolbar="toolbar">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </mi-dialog>
</div>

:::demo

```html
<!-- Table -->
<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
<mi-dialog title="收货地址" v-model="dialogTableVisible">
  <el-table :data="gridData">
    <el-table-column prop="date" label="日期" width="150"></el-table-column>
    <el-table-column prop="name" label="姓名" width="200"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</mi-dialog>

<!-- Form -->
<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

<mi-dialog title="收货地址" v-model="dialogFormVisible" :toolbar="toolbar">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</mi-dialog>
<script>
export default {
  data () {
    return {
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
      }],
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  }
}
```
:::

### toolbar 使用说明

```
toolbar =
  throttle: false, // 如果为true，func必须为promise，dialog内部会在你点击按钮时将loading置为true且在关闭弹窗时重置loading；如果弹窗没关闭，需要在func执行返回的promise的then与catch中还原loading为false
  text: '取消',
  type: 'text',
  loading: false, // 是否显示loading
  disabled: true, // 控制是否不可操作
  hide: true,     // 控制是否隐藏
  func: (done) => { // 关闭弹窗，必须执行done()
  }
]
```


### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
v-model | 弹窗显示控制 | Boolean | - | false
title | 弹窗标题 | String | - | -
destroyedWhenClose | 是否关闭弹窗时销毁组件 | - | Boolean | false
toolbar | 控制按钮组 | Array{Object} | -  | -
modal | 是否显示遮罩层 | Boolean | - | true
component | 弹窗内部显示组件 | [Function, Object] | - | -
size | 弹窗显示宽度 | String | mini/small/standard/large/huge | standard
customClass | 自定义样式 | Class | - | -
beforeClose | 关闭前的回调，会暂停 Dialog 的关闭 | function(done)，done 用于关闭 Dialog | - | -
close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | Boolean | - | true
close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog | Boolean | - | true
center | 是否对头部和底部采用居中布局 | Boolean | - | false

### slot

事件名称 | 说明
---|---
- | Dialog 的内容
footer | Dialog 按钮操作区的内容

### Events

事件名称 | 说明 | 回调参数
---|--- | --- |
close | 关闭时触发 | —