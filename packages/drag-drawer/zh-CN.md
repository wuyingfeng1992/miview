## DragDrawer 抽屉

### 使用指南

```js
import { DragDrawer } from 'miview'
Vue.use(DragDrawer)
```

### 代码演示

#### 基础抽屉

<script>
  export default {
    data () {
      return {
        showContainerDrawer: false,
        width: 200,
        minWidth: 0,
        drawerOpts: {
          width: '200',
          minWidth: '30',
          inner: false,
          transfer: true,
          placement: 'left',
          draggable: true,
          scrollable: true
        }
      }
    },
    watch: {
      width(val) {
        // console.log('width: ', val)
        let show = true
        if (val < 3) {
          show = false
        }

        const dragDrawerInnerBoxRef = this.$refs.dragDrawerInnerBoxRef
        if (dragDrawerInnerBoxRef) {
          // TODO:
          const drawerWrapperRef = dragDrawerInnerBoxRef.$refs.drawerWrapper
          if (drawerWrapperRef) {
            const headerRef = drawerWrapperRef.$refs.headerRef
            if (headerRef) {
              headerRef.style.display = show ? 'block' : 'none'
            }
          }
          if (dragDrawerInnerBoxRef.$refs.bodyWrapperRef && dragDrawerInnerBoxRef.$refs.bodyWrapperRef[0]) {
            dragDrawerInnerBoxRef.$refs.bodyWrapperRef[0].style.display = show ? 'block' : 'none'
          }
        }
      }
    },
    methods: {
      handleResize (event) {
        const { atMin } = event
        console.log(atMin);
      }
    }
  }
</script>
<div class="demo-drawer demo-block">
  <div>
    <el-button @click="showContainerDrawer = !showContainerDrawer" type="primary" style="margin-left: 10px">
      {{ showContainerDrawer ? '关闭' : '打开' }}容器内抽屉
    </el-button>
  </div>
  <div class="drag-drawer-inner-box">
    <mi-drag-drawer v-model="showContainerDrawer" ref="dragDrawerInnerBoxRef"
      :width.sync="width"
      :min-width="minWidth"
      :inner="drawerOpts.inner"
      :transfer="drawerOpts.transfer"
      :placement="drawerOpts.placement"
      :draggable="drawerOpts.draggable"
      @on-resize="handleResize"
      :scrollable="drawerOpts.scrollable"
      :closable="false"
      >
      <!-- <div slot="header">
        <b>这是标题</b>
      </div> -->
      <p v-for="n in 200" :key="n">{{ n }}</p>
      <div slot="footer">
        <p>123123</p>
        <p>21312</p>
      </div>
    </mi-drag-drawer>
  </div>
</div>

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
value | 抽屉是否显示，可使用 v-model 双向绑定数据 | Boolean | — | false
title | 抽屉标题, 可以使用 slot 自定义了页头, 则 title 无效 | String | — | —
width | 抽屉宽度。当其值不大于 100 时以百分比显示, 大于 100 时为像素 | Number/String | — | 256
min-width | 最小拖动宽度 | — | 256
draggable | 是否可拖动修改宽度 | Boolean | — | false
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
trigger | 自定义拖拽图标

### Events

事件名称 | 说明 | 回调参数
---|--- | --- |
on-resize-start | 拖拽时触发 | —
on-resize | 宽度改变 | event
on-resize-end | 拖拽结束 | -