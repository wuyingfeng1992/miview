<template>
  <div class="dialog-demo">
    <el-button type="primary" @click="centerDialogVisible = true">点击打开 Dialog</el-button>

    <p>{{key}}</p>

    <i-dialog :key="key" title="提示" v-model="centerDialogVisible" size="standard">
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
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
      centerDialogVisible: false,
      key: 0
    }
  }
}
</script>

<style>

</style>
