# 多行文本复制粘贴输入组件
使用方法：
```html
<el-form-item label="工号">
  <paste-select ref="employeeCodeList" :params="{fieid: 'employeeCodeList', label: '工号'}" :value="ruleForm.employeeCodeList" inputPlaceholder="请输入员工工号" textAreaPlaceholder="请在此黏贴多个工号" @change="(value) => handleAction(value, 'employeeCodeList')" width='160' labelWidth='0' size="mini" />
</el-form-item>

methods: {
  resetBtn () { // 点击重置按钮，清空工号值
    this.$refs.employeeCodeList.clear()
  }
}
```
