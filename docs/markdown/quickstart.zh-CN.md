
# 快速上手

----

## 使用前准备

> 在使用之前，推荐学习 `Vue` 和 `ES2015` ，并正确配置 `Node.js` v6.x 或以上版本

`VV-UI` 基于 `Vue.js` 2.x+ 版本开发，所以有必要了解以下基础知识：
- [Vue 组件](https://cn.vuejs.org/v2/guide/components.html)
- [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)

## 基于模板工程开发

> `Vue.js` 提供一个官方命令行工具 `vue-cli`，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。

```bash
> npm i -g vue-cli
> mkdir my-project && cd my-project
> vue init webpack
> npm i && npm i element-ui
```

## 标准开发

实际项目中，往往会使用 `webpack`，`rollup` 或者 `gulp` 的工作流，大多可以做到按需加载页面用到的组件，所以不推荐直接使用 `<script>` 标签全局引入的方式使用。

### 全局组件使用

可以在项目的入口文件中引入所有组件或所需组件

```js
import mview from 'mview' // 引入组件库

Vue.use(mview)
```

### 单个组件按需使用

可以局部注册所需的组件，适用于与其他框架组合使用的场景

```js
import { MTable } from 'mview'

export default {
  components: {
    MTable
  }
}
```

在模板中，用 `<m-table></m-table>` 自定义标签的方式使用组件

```html
<template>
  <div>
    <m-table
      :tableData="tableData"
      :tableKey="tableKey"
      :is-expand="true"
      :is-expand-one="true"
      :is-index="true"
      :is-select="true"
    >
      <template
        slot="date"
        slot-scope="scope"
      >
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px;">{{scope.row.date | formatDate}}</span>
      </template>
      <template
        slot="name"
        slot-scope="scope"
      >
        <el-popover
          placement="top"
          trigger="hover"
        >
          <p>姓名：{{scope.row.name}}</p>
          <p>住址：{{scope.row.address}}</p>
          <div
            slot="reference"
            class="name-wrapper"
          >
            <el-tag size="medium">{{scope.row.name}}</el-tag>
          </div>
        </el-popover>
      </template>
    </m-table>
  </div>
</template>
```

## 自定义主题(TODO)
