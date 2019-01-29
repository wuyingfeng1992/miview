## LoadingBar 加载进度条

### 概述

全局创建一个显示页面加载、异步请求、文件上传等的加载进度条

### 说明

`LoadingBar` 只会在全局创建一个，因此在任何位置调用的方法都会控制这同一个组件。主要使用场景是路由切换和Ajax，因为这两者都不能拿到精确的进度，LoadingBar 会模拟进度，当然也可以通过 `update()` 方法来传入一个精确的进度，比如在文件上传时会很有用，具体见API。

### 使用指南

```js
import { LoadingBar } from 'miview'
Vue.use(LoadingBar)
```

### 代码演示

<script>
export default {
  data () {
    return {
      percent: 10
    }
  },
  created () {
    this.$LoadingBar.config({
    // Vue.prototype.$LoadingBar.config({
      color: '#5cb85c',
      failedColor: '#f0ad4e',
      height: 5
  });
  },
  methods: {
    start () {
      this.$LoadingBar.start();
    },
    finish () {
      this.$LoadingBar.finish();
    },
    error () {
      this.$LoadingBar.error();
    },
    update () {
      this.$LoadingBar.update(this.percent);
      this.percent +=  5
    }
  }
}
</script>
<div class="demo-dialog demo-block">
  <el-button type="primary" @click="start" size="small">Start</el-button>
  <el-button type="primary" @click="finish" size="small">Finish</el-button>
  <el-button type="primary" @click="update" size="small">Update</el-button>
  <el-button type="primary" @click="error" size="small">Error</el-button>
</div>

:::demo
```html
<template>
  <el-button type="primary" @click="start" size="small">Start</el-button>
  <el-button type="primary" @click="finish" size="small">Finish</el-button>
  <el-button type="primary" @click="update" size="small">Update</el-button>
  <el-button type="primary" @click="error" size="small">Error</el-button>
</template>
<script>
export default {
  data () {
    return {
      percent: 10
    }
  },
  created () {
    this.$LoadingBar.config({
    // Vue.prototype.$LoadingBar.config({
      color: '#5cb85c',
      failedColor: '#f0ad4e',
      height: 5
    });
  },
  methods: {
    start () {
      this.$LoadingBar.start();
    },
    finish () {
      this.$LoadingBar.finish();
    },
    error () {
      this.$LoadingBar.error();
    },
    update () {
      this.$LoadingBar.update(this.percent);
      this.percent +=  5
    }
  }
}
</script>
```
:::

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
color | 进度条的颜色, 默认为 miview 主色 | String | - | primary
failedColor | 失败时的进度条颜色, 默认为 miview 主色 | String | - | error
height | 进度条高度, 单位 px | Number | - | 2

### Event

通过直接调用以下方法来使用组件：

- `this.$LoadingBar.start()`
- `this.$LoadingBar.finish()`
- `this.$LoadingBar.error()`
- `this.$LoadingBar.update(percent)`

另外提供了全局配置和全局销毁的方法：

- `this.$LoadingBar.config(options)`
- `this.$LoadingBar.destroy()`

```js
this.$LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 5
})
```

事件名称 | 说明 | 回调参数
---|--- | --- |
start | 开始从 0 开始显示进度条, 并自动加载进度 | -
finish | 结束进度条, 自动补全剩余进度 | -
error | 以错误的类型结束进度条, 自动补全剩余进度 | -
update | 精确加载到指定的进度 | percent，指定的进度百分比