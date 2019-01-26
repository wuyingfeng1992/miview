## Drawer 抽屉

### 使用指南

```js
import { Drawer } from 'miview'
Vue.use(Drawer)
```

### 代码演示

#### 基础抽屉

基础抽屉, 点击触发按钮抽屉从右划出，点击遮罩区关闭。

<script>
export default {
  data () {
    return {
      value1: false, // 基础抽屉
      value2: false, // 左侧滑出
      value3: false, // 对象编辑
      styles: {
        height: 'calc(100% -  55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        name: '',
        url: '',
        owner: '',
        type: '',
        approver: '',
        date: '',
        desc: ''
      },
      value5: false,
      value6: false
    }
  }
}
</script>

<div class="demo-drawer demo-block">
  <el-button @click="value1 = true" type="primary">打开</el-button>
  <mi-drawer title="基础抽屉" :closable="false" v-model="value1">
    <p>一些内容</p>
    <p>一些内容</p>
    <p>一些内容</p>
  </mi-drawer>
</div>

:::demo
```html
<template>
  <el-button @click="value1 = true" type="primary">打开</el-button>
  <mi-drawer title="基础抽屉" :closable="false" v-model="value1">
    <p>一些内容</p>
    <p>一些内容</p>
    <p>一些内容</p>
  </mi-drawer>
</template>
<script>
export default {
  data () {
    return {
      value1: false
    }
  }
}
</script>
```
:::

#### 左侧滑出

基础抽屉，点击触发按钮抽屉从左滑出，点击遮罩区关闭。

<div class="demo-drawer demo-block">
  <el-button @click="value2 = true" type="primary">打开</el-button>
  <mi-drawer title="基础抽屉-左侧滑出" placement="left" :closable="false" v-model="value2">
    <p>一些内容</p>
    <p>一些内容</p>
    <p>一些内容</p>
  </mi-drawer>
</div>

:::demo
```html
<template>
  <div class="demo-drawer demo-block">
  <el-button @click="value2 = true" type="primary">打开</el-button>
  <mi-drawer title="基础抽屉-左侧滑出" placement="left" :closable="false" v-model="value2">
    <p>一些内容</p>
    <p>一些内容</p>
    <p>一些内容</p>
  </mi-drawer>
</div>
</template>
<script>
export default {
  data () {
    return {
      value2: false
    }
  }
}
</script>
```
:::

#### 对象编辑

用于承载编辑相关操作，需要点击关闭按钮关闭。

<style>
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
<div class="demo-drawer demo-block">
  <el-button @click="value3 = true" type="primary">打开</el-button>
  <mi-drawer title="表单编辑" width="720" :mask-closable="false" :styles="styles" v-model="value3">
    <el-form ref="form" :model="formData" label-width="80px">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="标题">
            <el-input v-model="formData.name" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="域名">
            <el-input v-model="formData.url" placeholder="请输入域名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拥有者">
            <el-input v-model="formData.owner" placeholder="请输入拥有者"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型">
            <el-input v-model="formData.type" placeholder="请输入类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审批人">
            <el-input v-model="formData.approver" placeholder="请输入审批人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请时间">
            <el-date-picker v-model="formData.date" type="date" placeholder="请选择审批时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述">
            <el-input v-model="formData.desc" type="textarea" :rows="4" placeholder="请输入描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <div class="demo-drawer-footer">
      <el-button style="margin-right: 8px" @click="value3 = false">取消</el-button>
      <el-button type="primary" @click="value3 = false">保存</el-button>
    </div>
  </mi-drawer>
</div>

:::demo
```html
<template>
  <el-button @click="value3 = true" type="primary">打开</el-button>
  <mi-drawer title="表单编辑" width="720" :mask-closable="false" :styles="styles" v-model="value3">
    <el-form ref="form" :model="formData" label-width="80px">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="标题">
            <el-input v-model="formData.name" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="域名">
            <el-input v-model="formData.url" placeholder="请输入域名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拥有者">
            <el-input v-model="formData.owner" placeholder="请输入拥有者"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型">
            <el-input v-model="formData.type" placeholder="请输入类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审批人">
            <el-input v-model="formData.approver" placeholder="请输入审批人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请时间">
            <el-date-picker v-model="formData.date" type="date" placeholder="请选择审批时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述">
            <el-input v-model="formData.desc" type="textarea" :rows="4" placeholder="请输入描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <div class="demo-drawer-footer">
      <el-button style="margin-right: 8px" @click="value3 = false">取消</el-button>
      <el-button type="primary" @click="value3 = false">保存</el-button>
    </div>
  </mi-drawer>
</template>
<script>
export default {
  data () {
    return {
      value3: false,
      styles: {
        height: 'calc(100% -  55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        name: '',
        url: '',
        owner: '',
        type: '',
        approver: '',
        date: '',
        desc: ''
      }
    }
  }
}
</script>
<style>
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
```
:::

#### 多层抽屉

在抽屉内打开新的抽屉。

<div class="demo-drawer demo-block">
  <el-button @click="value5 = true" type="primary">打开</el-button>
  <mi-drawer title="多层抽屉" width="512" :closable="false" v-model="value5">
    <el-button @click="value6 = true" type="primary">打开二级抽屉</el-button>
      <mi-drawer title="二级抽屉" :closable="false" v-model="value6">
        <p>二级抽屉试验田</p>
      </mi-drawer>
  </mi-drawer>
</div>
<script>
export default {
  data () {
    return {
      value5: false,
      value6: false
    }
  }
}
</script>

:::demo
```html
<template>
  <el-button @click="value5 = true" type="primary">打开</el-button>
  <mi-drawer title="多层抽屉" width="512" :closable="false" v-model="value5">
    <el-button @click="value6 = true" type="primary">打开二级抽屉</el-button>
      <mi-drawer title="二级抽屉" :closable="false" v-model="value6">
        <p>二级抽屉试验田</p>
      </mi-drawer>
  </mi-drawer>
</template>
<script>
export default {
  data () {
    return {
      value5: false,
      value6: false
    }
  }
}
</script>
```
:::

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
value | 抽屉是否显示，可使用 v-model 双向绑定数据 | Boolean | — | false
title | 抽屉标题, 可以使用 slot 自定义了页头, 则 title 无效 | String | — | —
width | 抽屉宽度。当其值不大于 100 时以百分比显示, 大于 100 时为像素 | Number/String | — | 256
closable | 是否显示右上角的关闭按钮 | Boolean | — | true
mask-closable | 是否允许点击遮罩层关闭 | Boolean | — | true
mask-style | 遮罩层样式 | Object | — | —
styles | 抽屉中间层的样式 | Object | — | —
scrollable | 页面是否可以滚动 | Boolean | — | false
placement | 抽屉的方向 | String | left/right | right
transfer | 是否将抽屉放置于 body 内 | Boolean | — | false
class-name | 设置抽屉容器 .mi-drawer-wrap 的类名 | String | — | —
inner | 是否设置抽屉在某个元素内打开，开启此属性时，应当关闭 transfer 属性 | Boolean | — | false

### slot

事件名称 | 说明
---|---
— | 抽屉主体内容
header | 自定义标题栏
close | 自定义右上角关闭内容

### Events

事件名称 | 说明 | 回调参数
---|--- | --- |
on-close | 关闭抽屉时触发 | —
on-visible-change | 显示状态发生变化时触发 | true/false