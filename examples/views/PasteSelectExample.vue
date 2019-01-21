<template>
  <div class="paste-select-example">
    <m-paste-select
      ref="legalNamesStr"
      :params="{field: 'legalNamesStr', label: '姓名'}"
      :value="ruleForm.legalNamesStr"
      inputPlaceholder="请输入员工姓名"
      textAreaPlaceholder="请在此黏贴多个姓名"
      @change="(value) => pasteSelectChange(value, 'legalNamesStr')"
      width='293'
      labelWidth='0'
    />
  </div>
</template>

<script>
// import PasteSelect from '../../packages/paste-select/index'
export default {
  // components: {
  //   PasteSelect
  // },
  data () {
    return {
      ruleForm: {
        legalNamesStr: ''
      }
    }
  },
  methods: {
    // 多选框组件
    pasteSelectChange (data, type) {
      this.ruleForm[type] = data;
      console.log('pasteSelectChange:', data);
    },
    resetBtn () { // 点击重置按钮，清空工号值
      this.$refs.legalNamesStr && this.$refs.legalNamesStr.clear()
    }
  }

}
</script>
